const listaUsuario = document.getElementById("body-usuario");
const boton = document.getElementById("boton");
const limpiar = document.getElementById("limpiar");
const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const pais = document.getElementById("pais");
const indice = document.getElementById("indice");
let usuarios = [];
let botonesEliminar = null;
let botonesEditar = null;

function render() {
  const usuarioRender = usuarios
    .map((usuario, indice) => `<tr><td>${usuario.nombre ? usuario.nombre:'vacio' }</td>
                        <td>${usuario.apellido ? usuario.apellido:'vacio' }</td>
                        <td>${usuario.pais ? usuario.pais:'vacio' }</td>
                      
                        <td> <a class ='ver' href="/ajax/index2.html?usuario=${indice}" >ver</a></td>
                        <td> <button class ='editar' data-indice = ${indice} >Editar</button></td>
                        <td> <button class ='eliminar' data-indice = ${indice} >Eliminar</button></td>
                        </tr>`)
    .join("");
    //ese indice que e concatenamos en ver es el indice que llrga .map usuario y indice a ese indice hacemos refrencia a un indice en especido de cualquier usuario
 // y ver nos tiene que llevar a index2 con el indice en la url
    //console.log("estos son los usuarios", usuarioRender);
  listaUsuario.innerHTML = usuarioRender;
   //cuando termine de renderizar todos los botones deelimar todo los botones eliminar que porfavor los meta en esa esta variable

  botonesEliminar = document.getElementsByClassName('eliminar');
  botonesEditar = document.getElementsByClassName('editar')
 Array.from(botonesEliminar).forEach(botonEliminar => {
    //no nos permite hacer directamente para el foreach debemos de conververtirlo en un array 
    //en botoneseliminar 
    botonEliminar.onclick= eliminarUnUsuario;
    
  });
  Array.from(botonesEditar).forEach(botonEditar => {
    //no nos permite hacer directamente para el foreach debemos de conververtirlo en un array 
    //en botoneseditar 
    botonEditar.onclick= editarUnUsuario;
    
  });
}

//var peticion = new XMLHttpRequest();
//peticion.addEventListener("load", reqListener);

function enviarDatos(e) {
  e.preventDefault()
  //cada vez que salga accion  encrea deberoa de crear el usuario y si es accion editar deberia de editarlo con esta accion vamos hacer una cosa o la otra
   const accion = e.target.innerText;
   console.log('esta es la accion' ,accion)
  //le paso nombre.value capturar el valor del input
  const datos = {
    nombre: nombre.value,
    apellido: apellido.value,
    pais: pais.value
  };

//aquivamos ha poner codiciones de acuerdo donde trabajara la accion si es en editar o crear
//aqui habra una variable de la url
let url = null;
let method= null;
if (accion === 'Crear') {
  url = 'https://bootcamp-dia-3.camilomontoyau.now.sh/usuarios' 
method = 'POST';
} else if(accion ==='Editar') {
  if (indice.value) {
    url= `https://bootcamp-dia-3.camilomontoyau.now.sh/usuarios/${indice.value}`
    method = 'PUT';
  } else {
    return;
  }

} else{
  return;

}

  // const data = { username: 'example' };

  //esta url sveremos la siguientes  informacion de los usuarios
  /*
  este fetch retorna una promesa,esa promesa si a resolve 
   es decir tenobtendra  una respuesta y esa respuesta nosera una respuesta leida por nosotros  
  
   */
  fetch(url, {
    //le decimos a fetch que utilizra el metodo post si no se lo ponemos seria un get y get no quiero porque es para obtener si no un post mandar los datos
    // hara un post a esa url que le mando arriba donde dice fetch
    method: method, // or 'PUT'
    //ya no es url enconded si no apllication json porque ,porqueestoy mandado un json
    headers: {
      "Content-Type": "application/json",
    },
    //fetch no lo puede mandar un json como tal por eso debemos de hacer un stringify con la variable datos no data porque esa ata no la necesito
    //ymnadra los datos que esta en la const datos qu es lunes 24
    body: JSON.stringify(datos),
  })
    .then((response) => response.json())
    .then((respuestaJSON) => {
      console.log("respuestaJson", respuestaJSON);
      //refresacmos todos los uauarios y abajo en esa funcion refrescar los estamos recibiendo
      refrescar();
      //pero tambien se deberia de ejecutar esa funcion de restaurar bton aqui tambien en ambascasos
      restaurarBoton();
      //si no es exitosa sabemos que hay un cath que recibe un error o razon de qu porque fallo esa razon ypor alli mismo deberiamos de poner restaurarBoton
    }).catch((razon)=>{
  console.log(razon);
   restaurarBoton();
    })

  //podremos una bandera
  //console.log('response ', response);

  //esta peticion se hara cuando de click al boton porque alli llamo a la funcion enviar datos
}

//vamos a eliminar un usuario
function eliminarUnUsuario(e) {
  e.preventDefault()
    console.log('eliminarUnUsuario',e)
  fetch(`https://bootcamp-dia-3.camilomontoyau.now.sh/usuarios/${e.target.dataset.indice}`,{
    method: "DELETE", // or 'PUT'
  })
    .then((response) => response.json())
    .then((respuestaJSON) => {
      console.log("respuestaJson", respuestaJSON);
     
      refrescar();
    });

}
function editarUnUsuario(e) {
  e.preventDefault()
    console.log('eliminarUnUsuario',e);
if (e.target.dataset.indice) {
      /*
este indice que esta alli  que lo estamos leyendo en la const usuario quisiera que fuera el valor del inputinidce 
por eso ponemos indice.valu = alindice que estamos obteniendo alli con e.target.dataset.indice
*/
const usuario = usuarios[e.target.dataset.indice]
//aqui tambien podemos hacer lo ternario para asi validar si hay un campo vacio ppues poner no la palabra en si vacio si no pone un string vacio con comilla simples '' si noponga
//el nombre apellido pais etc
 nombre.value = usuario.nombre ? usuario.nombre: '' ;
 apellido.value = usuario.apellido ? usuario.apellido: '';
 pais.value = usuario.pais ? usuario.pais: '';
 //entonces necesitamos ese input hiden con ese valor delinidce
 indice.value= e.target.dataset.indice;
//console.log('usuario a editar' , usuario);
boton.innerText = 'Editar'
} else {
  boton.innerText = 'Crear'
}

}


function refrescar() {
  fetch("https://bootcamp-dia-3.camilomontoyau.now.sh/usuarios")
    .then((response) => response.json())
    .then((respuestaUsuario) => {
      console.log("respuestaUsuario", respuestaUsuario);
      //guardar los uaurios que viene en respuestaUdusrio en el arrya usuarios
      usuarios = respuestaUsuario;
      render();
    });
}
//funcion de cuando le doy onclick a limpiar me cambie automaticamente a crea el boton porque limpiar.onclick= a esa funcio de restaurarboton para esa funcionalidad
function restaurarBoton() {
  boton.innerText = 'Crear';
  indice.value= '';
  nombre.value = '';
  apellido.value = '';
  pais.value = '';
  
}


refrescar();
limpiar.onclick = restaurarBoton;
boton.onclick = enviarDatos;
