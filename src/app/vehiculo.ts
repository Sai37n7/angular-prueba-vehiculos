export interface Vehiculo {
    id?: number;
    clave: string;
    tipo: string;
    velmax: number;
    velmin: number;
    conductor: string;
    inicio_uso: string;
    fin_uso: string;
    ubicacion: string;
    created_at?: string;
    updated_at?: string;
    method?: string;
}
