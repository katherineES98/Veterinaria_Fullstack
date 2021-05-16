import React from "react";
import classNames from "classnames";
/**importanto la libreria para usar fontawesome con react  */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt , faEdit } from "@fortawesome/free-solid-svg-icons";
import "./BotonAccion.css";

function BotonAccion({tipo}){
    return(
        <button type="button" classNames ={
            classNames(
                "btn" , {
                "btn-info": tipo === "editar",
                "btn-danger": tipo===  "eliminar",
            }


            )
        }>
      { tipo === "editar" && <FontAwesomeIcon icon={faEdit} />}
      { tipo === "eliminar" && <FontAwesomeIcon icon={faTrashAlt} />}
 </button>
    );
}

export default BotonAccion;