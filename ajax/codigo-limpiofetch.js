const listaUsuario = document.getElementById("body-usuario");
const boton = document.getElementById("boton");
const nombre = document.getElementById("nombre");
let usuarios = [];

function reder() {
const usuarioRender = usuarios.map(usuario =>`<tr><td>${usuario.nombre}</td></tr>`)
.join("");
console.log(usuarioRender)
listaUsuario.innerHTML = usuarioRender;
}


function enviarDatos() {

const datos = {nombre: nombre.value};

fetch('https://bootcamp-dia-3.camilomontoyau.now.sh/usuarios', {
  method: 'POST', // or 'PUT'
  headers:{
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(datos), // data can be `string` or {object}!
}).then(response => response.json())
.then(respuestaJson => {console.log('respuestaJson' ,respuestaJson)
resfrescar();
})

}

function resfrescar(){
    fetch('https://bootcamp-dia-3.camilomontoyau.now.sh/usuarios')
    .then(response => response.json())
    .then(respuestaUsuario=>{
        console.log('respuestaUsuario', respuestaUsuario)
        usuarios = respuestaUsuario
        reder();
    })
}

resfrescar();
boton.onclick = enviarDatos;