
import React from "react";
//*importamos la nav que separamos y para incorporarla a la principal la importamos porque leestamos diciendo que me lo traiga y aparte de eso metamelo antes del container y asi va estar integrado mejro por partes  
import Nav from "./Componentes/Nav";
//*importanto el actionsMenu y luego ponerlo como una etiqueta html para poder colocarlo doonde antes estaba en conjuntoque ahora lo separamos 
import ActionsMenu from "./Componentes/ActionsMenu";
//*Importando ahora el js de Tabla que es el otro componente que separmos ahora lo ponemos dentro de la funcion para asi decirle inserteme esto donde antes tenia el codigo html que ahora lo podremos como una etiqueta html
import Tabla from "./Componentes/Tabla";


function Mascotas() {

  return(
    <>
  <div className="container">
 <Nav/>
<ActionsMenu/>
<Tabla/>

</div>





</>


);
       
    }

    export default Mascotas;