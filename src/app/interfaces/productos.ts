export interface Productos {
	idproducto?: number; // int(11)
	idtipoprod?: number; // int(11)
	idunidad?: number; // int(11)
	idmarca?: number; // int(11)
	nombre?: string; // varchar(255)
	precio_compra?: number; // double(20,6)
	precio_venta?: number; // double(20,6)
	imagen?: string; // text
	observaciones?: string; // text
	vigencia?: number; // tinyint(1)
	creacion?: string; // datetime
	modificacion?: string; // datetime

	unidad?: string;
	stock_actual?: number;
}