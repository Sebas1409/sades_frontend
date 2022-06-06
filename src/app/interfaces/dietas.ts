export interface Dietas {
	iddieta?: number;
	nombre?: string;
	contenido?: string;
	vigencia?: number;
	creacion?: string;
	modificacion?: string;
}

export interface DietasAsignadas {
	iddietasignada?: number;
	idmatricula?: number;
	iddieta?: number;
	fecha?: string;
	observaciones?: string;
	vigencia?: number;
	creacion?: string;
	modificacion?: string;
}