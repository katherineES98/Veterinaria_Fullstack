/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
/**importar el Css aqui para que se apliquen al nav los estilos  */
import  "./Nav.css";


function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

    <a className ="navbar-brand"  href ="#">Veterinaria</a>
      
      {/*<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Navegación de palanca">
          <span classNasme="navbar-toggler-icon"></span>
      </button>
  */}
      <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item active">
              <a className="nav-link " aria-current="page" href="index.html">Mascotas <span className ="sr-only">(current)</span></a>
          </li>
          <li className="nav-item">
              <a className="nav-link" href="veterinarias.html">Veterinari@s</a>
          </li>
          <li className="nav-item">
              <a className="nav-link" href="consultas.html">Consultas</a>
          </li>
          <li className="nav-item">
          <a className="nav-link" href="duenos.html">Dueños</a>
          </li>
      </ul>
          <form className="d-flex">
              <input className="form-control mr-sm-2" type="search" placeholder="Buscar" aria-label="Search" />
              <button className="btn btn-outline-light" type="submit">Search</button>
          </form>
       </div>
  
  </nav>
   
  );
}

export default Nav ;
