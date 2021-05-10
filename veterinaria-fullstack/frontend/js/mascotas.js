//atrapamos el valor que tenga el id en el html

const listaMascota = document.getElementById("lista-mascotas");
const tipo = document.getElementById("tipo");
const nombre = document.getElementById("nombre");
const dueno = document.getElementById("dueno");
const btnGuardar = document.getElementById("btn-guardar");
//este es el input que guarda el indice ya sea para eliminar o editar
const indice = document.getElementById("indice");

//este form le vamos a decir que no haga lo nomrla que hace navegar los elemnto cuando le damos enter a un formulario osea en un input de texto en el formulario

const form = document.getElementById("form");
const url = "https://veterinaria-backend-theta-one.vercel.app/mascotas";
let mascotas = [];

async function listarMascota() {
  try {
    const respuesta = await fetch(url);
    const mascotaDelServer = await respuesta.json();
    if (Array.isArray(mascotaDelServer)) {
      mascotas = mascotaDelServer;
    }

    if (mascotas.length > 0 ) {
       //enves de llamar solicitarMascota haremos la peticion aqui para que espere hacer la peticion para listar o se agrgeue al arreglo
    //solicitarMascotas() ;
    //el string de mascotas para hacerlo dinamico  es como en poo solo que aqui uso map para recorrer el arreglo enves de for y le paso lo que quiero dinamico,
    //lo cambiamos a const el tipo de variable htmlmascota porque nunca cambiamos esa variable e la funcion por eso le quitamos el let por const

    /* 3) quitamos el data-indice para hacerlo de esta manera para obtener el indice para editar esta es la 3 forma de hacerlo:
no ocupamos pasarle a boton editar esto "data-indice= ${index}" notampoco el onclick="editar(this)" si no que solo 
en la funcion editar retornamos otra funcion asi:

function editar(index) {

return function cuandoCliqueo() {
    console.log(index);
}
}
 y esta funcion se llama cuando le damos click sellama lo que retona la funcion 
 asise usa esto tambien para cuando le demos click se llame y le pasmos de una index a boton editar y se lo pamos como argumento y si funciona

Array.from(document.getElementsByClassName('editar')).forEach((botonEditar,index)=>botonEditar.onclick= editar(index))

las otras dos maneras las tendo en el cuaderno XD


*/
    const htmlMascotas = mascotas
    .map(
      (mascota, index) => `
  <tr>
  <th scope="row">${index}</th>
  <td>${mascota.tipo}</td>
  <td>${mascota.nombre}</td>
  <td>${mascota.dueno}</td>
  <td>
      <div class="btn-group me-2" role="group" aria-label="Second group">
          <button type="button" class="btn btn-info editar" data-bs-toggle="modal" data-bs-target="#exampleModal" ><i class="fas fa-edit"></i></button>
          <button type="button" class="btn btn-danger eliminar"><i class="far fa-trash-alt"></i></button>

        </div>
  </td>
</tr>
   
  `
    )
    .join("");

  //lo que voy a cambiar con el html dinamico le paso el id por listarmacota y el nuevo string que voy a renderizar mendiante innerhtml
  listaMascota.innerHTML = htmlMascotas;
  //este nos devuelve htmlcollection pero no podemos trabajar htmlcollection yhago un array.from , y no cesito guradrlo en una variable porque no lo utilizare de nuevo
  //tampoco necesito hacer un map si no mas bien unforeach  porque no ncesito guardar el resultado de eso simplemente que vaya a cada uno y le inyecte una funcion esa funcion sera editar
  //este lo usamos para la 3 forma de obtner el indice para la primera ni segunda la necesitamos pero paraesta si y le pasamos de una el index que recibe .map
  Array.from(document.getElementsByClassName("editar")).forEach(
    (botonEditar, index) => (botonEditar.onclick = editar(index))
  );
  Array.from(document.getElementsByClassName("eliminar")).forEach(
    (botonEliminar, index) => (botonEliminar.onclick = eliminar(index))
  );

      return;
    }
    //* si no entra al if pintara esta parte que aqui solo mostrara un msj de que no hay nada en la tabla si hay elemento pues tendria que entrar al if

    listaMascota.innerHTML = `
    <tr>
    <td colspan = "5">No hay Mascotas </td>
    
  </tr>
    `
  } catch (error) {
    console.log({error})
    $(".alert").show();
    throw error;
  }
}

//cuando se ejecute esa funcion  y lede ese submit mostrara el evento
async function enviarDatos(evento) {
  evento.preventDefault();

  try {
    const datos = {
      tipo: tipo.value,
      nombre: nombre.value,
      dueno: dueno.value,
    };
    let method = "POST";
    let urlEnvio = url;
    const accion = btnGuardar.innerHTML;

    if (accion === "Editar") {
      method = "PUT";
      //editando,... indice..value el valor que tenga ese endice le pasara los datos y asi editar
      mascotas[indice.value] = datos;
      urlEnvio = `${url}/${indice.value}`;
    }
    /*
    switch (accion) {
        case 'Editar':
            metodo ="PUT";
            //editando,... indice..value el valor que tenga ese endice le pasara los datos y asi editar
            mascotas[indice.value] = datos;
            urlEnvio=`${url}/indice.value`;
            break;
        //default:
            //si no estamos editando creamos y le agregamos al arreglo mascotas a la propiedad datos
           // mascotas.push(datos);
            //break;
    }
    */

    const respuesta = await fetch(urlEnvio, {
      //le decimos a fetch que utilizra el metodo post si no se lo ponemos seria un get y get no quiero porque es para obtener si no un post mandar los datos
      // hara un post a esa url que le mando arriba donde dice fetch
      method,
      //ya no es url enconded si no apllication json porque ,porqueestoy mandado un json
      headers: {
        "Content-Type": "application/json",
      },
      //fetch no lo puede mandar un json como tal por eso debemos de hacer un stringify con la variable datos no data porque esa ata no la necesito
      //ymnadra los datos que esta en la const datos qu es lunes 24
      body: JSON.stringify(datos),
      mode: "cors",
    });
    if (respuesta.ok) {
      listarMascota();
      resetModal();
    }
  } catch (error) {
    console.log({error})
    $(".alert").show();
    throw error;
    
  }
}

//cada vez que hace pusg entonces tenemos que llamar a listarmascota para que la liste en la tabla

//console.log('datos', datos);
//agergarlo al array de mascota

function editar(index) {
  //verfiicacion si llega el indice o no porque cuando abrimos nuevo no deberia de llegar el inice que usamos en editar esta verificacion nos ayuda para saber si estamos creando o editado

  //tercera forma de hacerlo retornando una funcion que es la que llama cuando le damos click
  return function cuandoCliqueo() {
    //console.log(mascotas[indice]);
    //como en le puse mascotas[indice] entonces me trae los datos que esta en el json mascota que esta en ese indice que en esppecifo qu le paso cunado cliqueo
    // lo pongo en una const para poder acceder al valor que tenga mascota.nombre y los demas para pasarlo al input nombre.value y cada que ves que haga click me pase
    //o me estraiga los datos y me los ponga de una en la ventana modal en sus input y me lo llene con la infor que esta en ese indice cuando le doy click en editar

    //para que el btn guardar cambien a editar cuando se abra la modal
    btnGuardar.innerHTML = "Editar";
    $("#exampleModal").modal("toggle");
    const mascota = mascotas[index];
    nombre.value = mascota.nombre;
    dueno.value = mascota.dueno;
    tipo.value = mascota.tipo;
    indice.value = index;
  };

  /*
    //de ese evento estamos recbiendo un tareget del parametro que le pasamos "elemento"
    esta es para la segunda forma de obtener el indice del boton editar;
    console.dir( elemento);
    console.log(elemento.dataset.indice)

    */

  //el indice esta en elemtento por eso hago este recorrido para poder obtener el inidice a darle click al  boton editar
  //console.log(elemento.dataset.indice);
}

//para resetear el boton cuando le damos editar y se resetea la modal y cuando se resetea cambia el boton a crear de la modal nuevo

function resetModal() {
  nombre.value = "";
  dueno.value = "";
  tipo.value = "";
  indice.value = "";
  btnGuardar.innerHTML = "Crear";
}

//function de eleminar siempre pasandole el inidce para saber que elemento eliminara
function eliminar(index) {
  //url envio sera igual a lo que tenga en url mas el index
  const urlEnvio = `${url}/${index}`;
  //hacerlo con clousere o algo asi que es que retorna otra funcion para que cuando de click pase el indice para saber cual eliminaremos
  return async function clickEnEliminar() {
    try {
      //*hacerlo con petciones con fetch
      const respuesta = await fetch(urlEnvio, {
        //le decimos a fetch que utilizra el metodo post si no se lo ponemos seria un get y get no quiero porque es para obtener si no un post mandar los datos
        // hara un post a esa url que le mando arriba donde dice fetch
        // este si puede ir directo el metodo delete porque no lo estaremos modificando como put y post que allisolo simos method en fetch
        method: "DELETE",
        //ya no es url enconded si no apllication json porque ,porqueestoy mandado un json

        //fetch no lo puede mandar un json como tal por eso debemos de hacer un stringify con la variable datos no data porque esa ata no la necesito
        //ymnadra los datos que esta en la const datos qu es lunes 24
      });
      if (respuesta.ok) {
        listarMascota();
        resetModal();
      }
    } catch (error) {
      console.log({error})
    $(".alert").show();
      throw error;
    }

    //aqui lo hacemos con esta propedad de filter para asi que funcione el eliminar solo que seria que el inidex que le pasamos seria diferente para que funcione
    //mascotas = mascotas.filter((mascota , indiceMascota)=>indiceMascota != index);
  };
}

//el foreach funciona igaul que el map pero no guarda el resultado no retorna el resultado como tal
//en el foreach es simplemente lo que necesito es por cada uno de estos

listarMascota();
/*
//enves de esta funcion lo meteremos en listar mascotas porque no esta haciendobien el recorrido 
function solicitarMascotas() {
    fetch("https://veterinaria-backend-theta-one.vercel.app/mascotas").then((respuesta)=>{
    if (respuesta.ok) {
        return respuesta.json();
    }

    })
    .then((mascotaDelServer)=>{
        console.log(mascotaDelServer);
    })
    
}*/

form.onsubmit = enviarDatos;
btnGuardar.onclick = enviarDatos;
