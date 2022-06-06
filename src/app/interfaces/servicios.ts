export interface Servicios {
	idservicio?: number; // int(11)
	idsector?: number; // int(11)
	nombre?: string; // varchar(255)
	dias_vigencia?: number; // int(11)
	cant_sesiones?: number; // int(11)
	precio_venta?: number; // double(20,6)
	observaciones?: string; // text
	vigencia?: number; // tinyint(1)
	creacion?: string; // datetime
	modificacion?: string; // datetime

	idarea?: number;
}