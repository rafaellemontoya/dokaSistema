interface Usuario {
    seccion: string;
    modo: string;
    nombre: string;
    puesto: string;
    usuario: string;
    password: string;
    permisos: {usuarios:Boolean;
                clientes:Boolean;
                proyectos: Boolean;
                materiales: Boolean;
                damage: Boolean
                clasificacionEquipo: Boolean;
                reportesObraWeb: Boolean;
                reporteEquipoDamageWeb:Boolean;
                reporteEnvioWeb:Boolean;
                reporteDevolucionesWeb:Boolean;
                reportesObraApp: Boolean;
                reporteEquipoDamageApp:Boolean;
                reporteEnvioApp:Boolean;
                reporteDevolucionesApp:Boolean;
                };
    email: string;
    passwordEmail: string;
    nombreBusqueda: string;
    key: string;
    foto: string;
    pais:string;
    usuarioAlta:string;
    fechaAlta:number;
    estado:number;
}