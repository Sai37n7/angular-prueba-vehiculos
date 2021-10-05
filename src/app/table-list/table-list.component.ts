import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { VehiculosService } from 'app/services/vehiculos.service';
import { Vehiculo } from 'app/vehiculo';
declare var $: any;
@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  //Propiedades
  vehiculos: Vehiculo[];
  dtOptions: any = {};

  constructor(private vehiculosService: VehiculosService, private httpClient: HttpClient) {
    // Se obtienen los vehiculos almacenados.
    vehiculosService.get().subscribe((data)=>{
      this.vehiculos = data['vehiculos'];
    });
   }

  ngOnInit() {
  }

  // En esta función se elimina un vehiculo
  eliminarVehiculo(id: number){
    this.vehiculosService.delete(id).subscribe((data)=>{
      if(data['status']=='ok'){
        // Se notifica al usuario que el vehiculo fue eliminado.
        $.notify({
          icon: "notifications",
          message: "Vehículo eliminado exitosamente."
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
        // Se actualiza la variable de vehiculos
        this.vehiculosService.get().subscribe((data)=>{
          this.vehiculos = data['vehiculos'];
        });
      }else{
        // Se notifica en caso de ocurrir un error
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
