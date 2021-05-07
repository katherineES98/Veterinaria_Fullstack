
//no importa ponerle retorno porque la flecha que apunta al nombre significa retorno asi que no es necesario ponerle retorno en este caso
//funciones flechas(arrow function)
const obtenerNombre = ()=> "Katherine";

const obtenerApellido= ()=> "Santos";


function obtnerNombreCompleto(){
   const nombre= obtenerNombre();
   const apellido = obtenerApellido();
   return `${nombre} ${apellido}`;  
}

const nombreCompleto = obtnerNombreCompleto();

console.log('nombre completo',nombreCompleto );