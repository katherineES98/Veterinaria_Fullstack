import React from "react";

function Modal() {
    return(
        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">Nueva Mascota</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
            <form id="form">
              <input type="hidden" id="indice" />
                <div className="form-row">
                  
                        <div className="col">
                            <select id="tipo"  className="form-select"  aria-label="Default select example">
                                <option selected>Tipo Animal</option>
                                <option >Perro</option>
                                <option >Gato</option>
                                <option >Pajaro</option>
                                <option >Otro</option>
                              </select>
                        </div>
                  
                </div>
                <div className="row g-3 form-row">
                    <div className="col">
                      <input type="text" id="nombre" class="form-control" placeholder="Nombre" aria-label="Nombre" />
                    </div>
                    <div className="col">
                      <select id="dueno" className="form-select" aria-label="Default select example">
                        <option selected>Duenos</option>
                        <option>Juan</option>
                        <option >Pedro</option>
                        <option >Esteban</option>
                        <option >John</option>
                        <option >Camilo</option>
                      </select>
                    </div>
                   
                  </div>
            </form>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
          <button type="button" id="btn-guardar" data-bs-dismiss="modal" className="btn btn-primary">Guardar</button>
        </div>
      </div>
    </div>
  </div>
    );
}

export default Modal ;