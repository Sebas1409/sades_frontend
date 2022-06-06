export interface KardexProductos {
	idkardexprod?: number; // int(11)
	idproducto?: number; // int(11)
	idempleado?: number; // int(11)
	idsector?: number; // int(11)
	idmotmovi?: number; // int(11)
	fecha_mov?: string; // date
	esingreso?: number; // tinyint(1)
	cant_anterior?: number; // double(20,6)
	cant_mov?: number; // double(20,6)
	vigencia?: number; // tinyint(1)
	creacion?: string; // datetime

	idarea?: number;
}