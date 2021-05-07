
//aqui estamos cagado todos los usuaro creamoremos una variable para que los  cargue , bueno poner usuario y no un arreglo si no {}
const listarUsuario = document.getElementById('body-usuario')
let usuario = {};

function tomarIndiceUsuario(){
return  location.search.replace('?', '').split('=')[1];
}



function obtenerUsuario() {
  //en la urlponer el indice que extraemos de tomarindiceusaio para asi tener la informacion de ese usuario en especificio que quiero 
    fetch(`https://bootcamp-dia-3.camilomontoyau.now.sh/usuarios/${tomarIndiceUsuario()}`)
      .then((response) => response.json())
      .then((respuestaUsuario) => {
        console.log("respuestaUsuario", respuestaUsuario);
        //guardar los uaurios que viene en respuestaUdusrio en el arrya usuarios
        usuario = respuestaUsuario;
        render();
      });
  }
function render() {
  const usuarioRender =  `<tr><td class="campo-usuario">Nombre</td><td> ${usuario.nombre ? usuario.nombre:'vacio' }</td></tr>
                         <tr><td class="campo-usuario">Apellido</td>  <td>${usuario.apellido ? usuario.apellido:'vacio' }</td></tr>
                         <tr><td class="campo-usuario">Pais</td>    <td>${usuario.pais ? usuario.pais:'vacio' }</td></tr>
                        `;
    
    //ese indice que e concatenamos en ver es el indice que llrga .map usuario y indice a ese indice hacemos refrencia a un indice en especido de cualquier usuario
 // y ver nos tiene que llevar a index2 con el indice en la url
    //console.log("estos son los usuarios", usuarioRender);
    console.log(usuarioRender)
    listarUsuario.innerHTML = usuarioRender;
  
}

  obtenerUsuario()