export interface DetalleVenta {
	iddetventa?: number; // int(11)
	idventa?: number; // int(11)
	idproducto?: number; // int(11)
	descripcion?: string; // text
	unidad?: string; // text
	cantidad?: number; // double(20,6)
	precio_compra?: number; // double(20,6)
	precio_venta?: number; // double(20,6)
	monto_gravado?: number; // double(20,6)
	monto_igv?: number; // double(20,6)
	monto_total?: number; // double(20,6)
	vigencia?: number; // datetime
	creacion?: string; // datetime
}