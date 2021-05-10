const listaConsultas = document.getElementById("lista-consultas");
const mascota = document.getElementById("mascota");
const veterinaria = document.getElementById("veterinaria");
const historia = document.getElementById("historia");
const diagnostico = document.getElementById("diagnostico");
const indice = document.getElementById("indice");
const btnGuardar = document.getElementById("btn-guardar");
const formulario = document.getElementById("formulario");
let consultas = [];
let mascotas = [];
let veterinarias = [];
const url = "https://veterinaria-backend-theta-one.vercel.app";

console.log({ mascota, veterinaria, historia, diagnostico });

/**
 * 
 *  {mascota: 0, 
        dueno:0, 
        fechaCreacion: new Date(), 
        fechaEdicion:new Date(), 
        historia:'',
         diagnostico:''
        }
 */

async function listarConsultas() {
  const entidad = "consultas";
  try {
    //*fetch es una promesa por eso se pone el await
    const respuesta = await fetch(` ${url}/${entidad}`);
    //*las que viene del servidor y eso va a tomar lo que vino en las repsuestas y lo va a convertit en un json y como es una promesa se pone el await para que obtenga la respuesta de la promesa
    const consultasDelServidor = await respuesta.json();
    //* la respuesta sera un array y eso se hace cn el objeto array de js y el metodo de ese objeto isarray y eso verificara si eso es un array
    if (Array.isArray(consultasDelServidor)) {
      //*si es un array si si guardamos eso  en la variables consultas que es el arreglo que inicializaos al inicio
      consultas = consultasDelServidor;
    }
    //* si todo sale bien deberiamos de pintar la consultas y la pintaremos con el html de esa tabla, si esa respuesta es ok es decir es que si tenemos consultas
    //*y esas consultas las vamos a recorrer y vamos a poner una const y la vamos a recorrer con .map y por cada consulta vamos a imprimir consulta y el map recibe un callback y ese callbakc recibira la concatenacion de todo eso
    if (respuesta.ok) {
      //*por cada consulta entonces imprimimos primero el inidce  por eso tambien debemos de pasar el indice por donde le paso la consulta para que la recorras
      //*map me devuelve un array de todos los string necesitamos  decirle join para que unan todos los string mediante un string vacio osea que no le agregue algo mas al string que simplemente sea un string

      //*destructuras la consulta con el fin de obtener la mascota completa   pero para no complicar las cosas pondremos consulta.mascota.nombre
      const htmlConsultas = consultas
        .map(
          (consultas, indice) =>
            `
            <tr>
            <th scope="row">${indice}</th>
            <td>${consultas.mascota.nombre}</td>
            <td>${consultas.veterinaria.nombre} ${consultas.veterinaria.apellido}</td>
            <td>${consultas.diagnostico}</td>
            <td>${consultas.fechaCreacion}</td>
            <td>${consultas.fechaEdicion}</td>
    
           

            <td>
                <div class="btn-group me-2" role="group" aria-label="Second group">
                    <button class="editar" type="button" class="btn btn-info editar" data-bs-toggle="modal" data-bs-target="#exampleModal" ><i class="fas fa-edit"></i></button>
                   
        
                </div>
            </td>
        </tr>`
        )
        .join("");
      //*qu el innerhtml sea igual a los que llegue en html consultas
      listaConsultas.innerHTML = htmlConsultas;
      Array.from(document.getElementsByClassName("editar")).forEach(
        (botonEditar, index) => (botonEditar.onclick = editar(index))
      );
    }
  } catch (error) {
    console.log({ error });
    $(".alert-danger").show();
  }
}

async function listarMascotas() {
  const entidad = "mascotas";
  try {
    //*fetch es una promesa por eso se pone el await
    const respuesta = await fetch(` ${url}/${entidad}`);
    //*las que viene del servidor y eso va a tomar lo que vino en las repsuestas y lo va a convertit en un json y como es una promesa se pone el await para que obtenga la respuesta de la promesa
    const mascotasDelServidor = await respuesta.json();
    //* la respuesta sera un array y eso se hace cn el objeto array de js y el metodo de ese objeto isarray y eso verificara si eso es un array
    if (Array.isArray(mascotasDelServidor)) {
      //*si es un array si si guardamos eso  en la variables consultas que es el arreglo que inicializaos al inicio
      mascotas = mascotasDelServidor;
    }
    //* si todo sale bien deberiamos de pintar la consultas y la pintaremos con el html de esa tabla, si esa respuesta es ok es decir es que si tenemos consultas
    //*y esas consultas las vamos a recorrer y vamos a poner una const y la vamos a recorrer con .map y por cada consulta vamos a imprimir consulta y el map recibe un callback y ese callbakc recibira la concatenacion de todo eso
    if (respuesta.ok) {
      //*por cada consulta entonces imprimimos primero el inidce  por eso tambien debemos de pasar el indice por donde le paso la consulta para que la recorras
      //*map me devuelve un array de todos los string necesitamos  decirle join para que unan todos los string mediante un string vacio osea que no le agregue algo mas al string que simplemente sea un string
      //*haciendo el oppendchild
      mascotas.forEach((_mascota, indice) => {
        const optionActual = document.createElement("option");
        optionActual.innerHTML = _mascota.nombre;
        optionActual.value = indice;
        mascota.appendChild(optionActual);
      });

      //*destructuras la consulta con el fin de obtener la mascota completa   pero para no complicar las cosas pondremos consulta.mascota.nombre
      //const htmlMascotas= mascotas.map((mascota, indice)=>
      //`<option value="${indice}" >${mascota.nombre}</option>`
      //).join("");
      //*qu el innerhtml sea igual a los que llegue en html consultas

      // mascota.innerHTML += htmlMascotas
      //mascota.appendChild(htmlMascotas);
    }
  } catch (error) {
    console.log({ error });
    $(".alert-danger").show();
  }
}

//** append child() toma un nodo y le agrga un hijo , agrega un nodo al final de la lista de los hijos de un nojo especifico osea al selectle egr=egare como hijo lo que le agregue aqui enves de decirle macota.html sera mascota.appendchild     */
//**si no nos da asi mascota.appendChild(htmlMascotas); tendriamos que hacer un foreach y no nos dio porque aca hay muchos nodos , podemos crearlo como un tipo nodo con cada uno de los nodos omejor seria e esta manera creo  mascota.innerHTML += htmlMascotas
//** para usar appendchildtengo que crear un nodo html

async function listarVeterinarias() {
  const entidad = "veterinarias";
  try {
    //*fetch es una promesa por eso se pone el await
    const respuesta = await fetch(` ${url}/${entidad}`);
    //*las que viene del servidor y eso va a tomar lo que vino en las repsuestas y lo va a convertit en un json y como es una promesa se pone el await para que obtenga la respuesta de la promesa
    const veterinariasDelServidor = await respuesta.json();
    //* la respuesta sera un array y eso se hace cn el objeto array de js y el metodo de ese objeto isarray y eso verificara si eso es un array
    if (Array.isArray(veterinariasDelServidor)) {
      //*si es un array si si guardamos eso  en la variables consultas que es el arreglo que inicializaos al inicio
      veterinarias = veterinariasDelServidor;
    }
    //* si todo sale bien deberiamos de pintar la consultas y la pintaremos con el html de esa tabla, si esa respuesta es ok es decir es que si tenemos consultas
    //*y esas consultas las vamos a recorrer y vamos a poner una const y la vamos a recorrer con .map y por cada consulta vamos a imprimir consulta y el map recibe un callback y ese callbakc recibira la concatenacion de todo eso
    if (respuesta.ok) {
      //*por cada consulta entonces imprimimos primero el inidce  por eso tambien debemos de pasar el indice por donde le paso la consulta para que la recorras
      //*map me devuelve un array de todos los string necesitamos  decirle join para que unan todos los string mediante un string vacio osea que no le agregue algo mas al string que simplemente sea un string
      //*haciendo el oppendchild
      veterinarias.forEach((_veterinaria, indice) => {
        const optionActual = document.createElement("option");
        optionActual.innerHTML = `${_veterinaria.nombre} ${_veterinaria.apellido}`;
        optionActual.value = indice;
        //*el select de la veterinaria
        veterinaria.appendChild(optionActual);
      });

      //*_veterinaria esto es veterinari local
      //*destructuras la consulta con el fin de obtener la mascota completa   pero para no complicar las cosas pondremos consulta.mascota.nombre
      //const htmlMascotas= mascotas.map((mascota, indice)=>
      //`<option value="${indice}" >${mascota.nombre}</option>`
      //).join("");
      //*qu el innerhtml sea igual a los que llegue en html consultas

      // mascota.innerHTML += htmlMascotas
      //mascota.appendChild(htmlMascotas);
    }
  } catch (error) {
    console.log({ error });
    $(".alert-danger").show();
  }
}

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
    const consulta = consultas[index];
    indice.value = index;
    mascota.value = consulta.mascota.id;
    veterinaria.value = consulta.veterinaria.id;
    historia.value = consulta.historia;
    diagnostico.value = consulta.diagnostico;
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

async function enviarDatos(e) {
  e.preventDefault();
  try {
    const datos = {
      nombre: nombre.value,
      apellido: apellido.value,
      documento: documento.value,
    };
    const accion = btnGuardar.innerHTML;
    let urlEnvio = url;
    let method = "POST";
    if (accion == "Editar") {
      urlEnvio += `/${indice.value}`;
      //editando,... indice..value el valor que tenga ese endice le pasara los datos y asi editar

      method = "PUT";
    }

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
      listarDuenos();
      resetModal();
    }
    //cada vez que hace pusg entonces tenemos que llamar a listarmascota para que la liste en la tabla
    //listarDuenos();
    //resetModal() ;
    //console.log('datos', datos);
    //agergarlo al array de mascota
  } catch (error) {
    console.log({ error });
    $(".alert-danger").show();
  }
}

async function enviarDatos(e) {
  //**esta entidad va hacer consulta
  const entidad = "consultas";
  //**para que no navegue la pagina */
  e.preventDefault();
  try {
    const datos = {
      mascota: mascota.value,
      veterinaria: veterinaria.value,
      historia: historia.value,
      diagnostico: diagnostico.value,
    };
    if (validar(datos)) {
      const accion = btnGuardar.innerHTML;
      let urlEnvio = `${url}/${entidad}`;
      let method = "POST";
      if (accion == "Editar") {
        urlEnvio += `/${indice.value}`;
        //editando,... indice..value el valor que tenga ese endice le pasara los datos y asi editar

        method = "PUT";
      }

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
        listarConsultas();
        resetModal();
      }
      formulario.classList.add("was-validated");
      return;
    }

    $(".alert-warning").show();

    //cada vez que hace pusg entonces tenemos que llamar a listarmascota para que la liste en la tabla
    //listarDuenos();
    //resetModal() ;
    //console.log('datos', datos);
    //agergarlo al array de mascota
  } catch (error) {
    console.log({ error });
    $(".alert-danger").show();
  }
}

function resetModal() {
  btnGuardar.innerHTML = "Crear";
  [mascota, veterinaria, historia, diagnostico].forEach((inputActual)=>{
    inputActual.value="";
    inputActual.classList.remove("is-invalid");
    inputActual.classList.remove("is-valid");
  }
  );
  $(".alert-warning").hide();
  $("#exampleModal").modal("toggle");
}

//**esta funcion validar verificar los datos que le pasemos a la funcion que ninguno este vacio y esos datosvan aser objeto verificar si estan lleno y ir por cada objeto si uno esta vacio usando un pbject.keys y recibe un objeto yese nos devuelve un array con todas las llaves de datos esas llaves serian
//**las keys de datos mascotas veterinaria historia  y diagnostico, vamos  adarle un foreach un un for in y ese usaremos porque se hara un break en algun momento
//**en el momento, en el momento que alguna de esas llaves sea un string vacio

function validar(datos) {
  if (typeof datos !== "object") return false;
  //console.log(Object.keys(datos));
  /**esto lo haremos para poder validar los formularios concada uno de las keys que seria los de los datos cuando el formulario este vacio pues retornara el is invalid
   * y el id es la llave por eso se le poen document by id porque la llave es los datos que contiene cada una de las llaves o mejor ducho cada uno de los datos del formulario
   */
  let respuesta = true;
  for (let llave in datos) {
    // console.log(llave);
    if (datos[llave].length === 0) {
      document.getElementById(llave).classList.add("is-invalid");
      respuesta = false;
    } else {
      /**remover la clase anteriorde is invalid del formulario para cuando ya esten lleno los campos  se remueva el ootro y entre a cuando este valido el relleno del formulario  */
      document.getElementById(llave).classList.remove("is-invalid");
      document.getElementById(llave).classList.add("is-valid");
    }
  }
  if (respuesta === true ) $(".alert-warning").hide();
  return respuesta;
}

btnGuardar.onclick = enviarDatos;
listarMascotas();
listarConsultas();
listarVeterinarias();
