import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VehiculosService } from 'app/services/vehiculos.service';
import { Vehiculo } from 'app/vehiculo';
declare var $: any;
declare var H: any;
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  // Propiedades
  platform: any;
  ui: any;
  map: any;
  bubble: any;


  openBubble(position, text){
    if(!this.bubble){
       this.bubble =  new H.ui.InfoBubble(
         position,
         {content: text});
       this.ui.addBubble(this.bubble);
     } else {
       this.bubble.setPosition(position);
       this.bubble.setContent(text);
       this.bubble.open();
     }
  }

  // Esta función permite añadir un marcador al mapa
  addLocationsToMap(locations){
    let group = new  H.map.Group(),
        position,
        i;
  
    // Add a marker for each location found
    for (i = 0;  i < locations.length; i += 1) {
      let location = locations[i];
      let marker = new H.map.Marker(location.position);
      marker.label = location.address.label;
      group.addObject(marker);
    }
  
    group.addEventListener('tap', function (evt) {
      this.map.setCenter(evt.target.getGeometry());
      this.openBubble(
         evt.target.getGeometry(), evt.target.label);
    }, false);
  
    // Add the locations group to the map
    this.map.addObject(group);
    this.map.setCenter(group.getBoundingBox().getCenter());
  }

  @ViewChild("map")
  public mapElement: ElementRef;
  vehiculo: Vehiculo = {
    id: 0,
    clave: null,
    tipo: null,
    velmax: null,
    velmin: null,
    conductor: null,
    inicio_uso: null,
    fin_uso: null,
    ubicacion: null
  };
  id: any;

  // Esta función realiza las consultas con la ubicacion proporcionada
  geocode() {
    let geocoder = this.platform.getSearchService(),
        geocodingParameters = {
          q: this.vehiculo.ubicacion
        };
  
    geocoder.geocode(
      geocodingParameters,
      (result)=> {
        let locations = result.items;
        /*
          * The styling of the geocoding response on the map is entirely under the developer's control.
          * A representitive styling can be found the full JS + HTML code of this example
          * in the functions below:
          */
        this.addLocationsToMap(locations);
      },
      (error)=> {
        alert('Can\'t reach the remote server');
      }
    );
  } 
  constructor(private vehiculoService: VehiculosService, private activatedRoute: ActivatedRoute) {
    this.platform = new H.service.Platform({
      "apikey": "zbsqxu6hpmFq5EIrq6q2HPutvT_1VuvCT14gh-YMFrs"
    });
    // Se obtiene el ID de la URL proveida
    this.id = this.activatedRoute.snapshot.params['id'];
    // En caso de que exista un ID se carga la información
    if(this.id){
      vehiculoService.get().subscribe((data)=>{
        const vehiculos = data['vehiculos'];
        this.vehiculo = vehiculos.find((v)=>{return v.id==this.id});
      })
    }
   }

  ngOnInit() {
  }

  public ngAfterViewInit() {
    let defaultLayers = this.platform.createDefaultLayers();
    this.map = new H.Map(
        this.mapElement.nativeElement,
        defaultLayers.vector.normal.map,
        {
            zoom: 15,
            center: { lat:37.376, lng:-122.034 }
        }
    );
    // Reajusta el mapa cuando cambia el tamaño del la ventana
    window.addEventListener('resize', () => this.map.getViewPort().resize());
    let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
    this.ui = H.ui.UI.createDefault(this.map, defaultLayers);
  }
  /*
    Esta función permite añadir/editar un vehiculo en otras palabras permite
    guardar un vehiculo.
   */
  saveVehiculo(){
    console.log(this.vehiculo);
    this.vehiculoService.save(this.vehiculo).subscribe((data)=>{
      if(data['status']=='ok'){
        // Se notifica al usuario que el vehiculo fue guardado exitosamente.
        $.notify({
          icon: "notifications",
          message: "Vehículo guardado exitosamente."
        },{
            type: 'success',
            timer: 1500,
            placement: {
                from: 'top',
                align: 'center'
            },
            template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
              '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
              '<i class="material-icons" data-notify="icon">notifications</i> ' +
              '<span data-notify="title">{1}</span> ' +
              '<span data-notify="message">{2}</span>' +
              '<div class="progress" data-notify="progressbar">' +
                '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
              '</div>' +
              '<a href="{3}" target="{4}" data-notify="url"></a>' +
            '</div>'
        });
      }else{
        // Se notifica al usuario si ocurrio un error.
        $.notify({
          icon: "notifications",
          message: "Ocurrio un error, intente más tarde."
        },{
            type: 'error',
            timer: 1500,
            placement: {
                from: 'top',
                align: 'center'
            },
            template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
              '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
              '<i class="material-icons" data-notify="icon">notifications</i> ' +
              '<span data-notify="title">{1}</span> ' +
              '<span data-notify="message">{2}</span>' +
              '<div class="progress" data-notify="progressbar">' +
                '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
              '</div>' +
              '<a href="{3}" target="{4}" data-notify="url"></a>' +
            '</div>'
        });
      }
    });
  }
}

