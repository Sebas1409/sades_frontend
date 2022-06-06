export interface Historico {
	idhistorico?: number; // int(11)
	idmatricula?: number; // int(11)
	idtipoficha?: number; // int(11)
	idtiporeg?: number; // int(11)
	fecha?: string; // date
	datos?: string; // json
	vigencia?: number; // tinyint(1)
}