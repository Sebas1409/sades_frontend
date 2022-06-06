export interface Pagos {
	idpago?: number; // int(11)
	idcaja?: number; // int(11)
	idventa?: number; // int(11)
	fecha_pago?: string; // date
	metodo_pago?: number; // int(5)
	monto_pago?: number; // double(20,6)
	encaja?: number; // double(20,6)
	congelado?: number; // double(20,6)
	vigencia?: number; // tinyint(1)
	creacion?: string; // datetime
	modificacion?: string; // datetime
}