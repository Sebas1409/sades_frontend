export interface MotivoMovimiento {
	idmotmovi?: number; // int(11)
	nombre?: string; // varchar(255)
	bloqueado?: number; // tinyint(1)
	esingreso?: number; // tinyint(1)
	vigencia?: number; // tinyint(1)
}