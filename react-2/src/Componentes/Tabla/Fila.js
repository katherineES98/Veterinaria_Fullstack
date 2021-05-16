import React from "react";
import BotonAccion from "../BotonAccion";
function Fila({mascota , index}) {
    return(
        <tr>
        <th scope="row">{index}</th>
        <td>{mascota.tipo}</td>
        <td>{mascota.nombre}</td>
        <td>{mascota.dueno}</td>
        <td>
            <div class="btn-group me-2" role="group" aria-label="Basic example">
                
      <BotonAccion tipo = "editar" />
      <BotonAccion tipo = "eliminar" />
              </div>
        </td>
      </tr>

    );
}

export default Fila;