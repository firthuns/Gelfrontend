export interface Equiposgel {
  id?:           string;
  equipo:       string;
  modelo:       string;
  fechacompra:  string;
  ticketcompra?: string; // http:// ... direccion .. .com/img.png
}

export interface Usuario {
  id:      number;
  usuario: string;
  email:   string;

}


export interface Bd {
  usuarios: Usuario[];
  equipos:   Equiposgel[];
}
