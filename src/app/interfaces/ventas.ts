export interface Ventas {
	idventa?: number; // int(11)
	idcaja: number; // int(11)
	idcliente?: number; // int(11)
	idempleado?: number; // int(11)
	idsector?: number; // int(11)
	idmatricula?: number; // int(11)
	tipo_doc?: number; // int(5)
	serie_doc?: string; // varchar(5)
	nro_doc?: number; // int(11)
	fecha_doc?: string; // date
	vigencia?: number; // tinyint(1)
	creacion?: string; // datetime
	modificacion?: string; // datetime

	total_venta?: number;
}