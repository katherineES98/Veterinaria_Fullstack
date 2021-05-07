


//varaible que me contendra todos los usuarios
const listaUsuario = document.getElementById("lista-usuario");
//variable que me contiene el boton
const boton = document.getElementById("boton")
/*
peticion ajax pero con un objeto xmlhttprequest
*/

//este es un callbackya que se ejecuta abajo en la peticion
function reqListener () {

    //la informacion que yo pase por esta funcion se imprimira como texto ya sea unarray loimprimira como texto no podra desplegarse para ver sus propiedadesd porque lo obtengo texto nadamas 
    //convertir ese textoa un objeto con JSON.parse( dentro lo que quiere convertir a objeto)
   
   // console.log(JSON.parse(this.responseText));
   const usuarios= JSON.parse(this.responseText);
   console.log(usuarios);
   
    /*
    un foreach donde solo memuestre los usuarios o mejor haremos con el map y asi redenrizar para mostar los usuarios, y con esa funcion de los array que es map
  vamos a mostrar los usuarios del array ese metodo o esafuncion crea un nuevo array con esos elementos y le paso una funcion para saber lo que quiero que me pase en 
  el nuevo array en el mismo orden del array anterior o original.. 

  esto ya me renderiza la lista de usuario
  el join me desaparece las comas que tenia en lalista osea usuario 1, usaruio2 y es para que no 
  los separe por coma si no que solo este la lista si las comas asi por eso puse join  y las "" que como separador
  no ponga nada


  */
 const usuarioRender =  usuarios.map(usuario => ` <li>${usuario.nombre}</li>` ).join("");
console.log('estos son los usuarios', usuarioRender)
//ya lo veo con la propiedad innerHTML lo veo ya en el html los usuarios que los obtendo con usuario reder al espacio de deonde me los lista en este caso en listarusuario donde me hara la lista de los usuarios que obtenga en usuarioRender
listaUsuario.innerHTML = usuarioRender;
}



   //creamos el nuevo documento , nuevo objeto cmlhttprequest
  var peticion = new XMLHttpRequest();
  peticion.addEventListener("load", reqListener);
 

  function enviarDatos(){
    peticion.open("POST", "https://bootcamp-dia-3.camilomontoyau.now.sh/usuarios", true);
    peticion.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    peticion.send("nombre= LUNES24");
  setTimeout(refrescar,3000)

  }

  //para que vuelva hacer esa peticion que lo haga no en el reload de js sino
  //y haremos una funcion refrescar y esa funcion vinene hacer lo que le pasamos dela funcion de abajo
//me lo agrega en el html y me lo renderiza y me cerea los usuarios

  function refrescar(){
  peticion.open("GET", "https://bootcamp-dia-3.camilomontoyau.now.sh/usuarios");
  peticion.send();
}

  //cada vez vaa ejecutar esa funcion cuando le doy clickal boton
  boton.onclick= enviarDatos;