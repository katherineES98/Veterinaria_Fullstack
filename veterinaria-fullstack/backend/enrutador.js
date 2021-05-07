//pasaremos este modulo a una funcion por la dependencias devariables que tenemos
const recursos = require("./recursos");
const mascotas= require("./rutas/moscotas");
const veterinarias= require("./rutas/veterinarias");
const duenos= require("./rutas/duenos");
const consultas= require("./rutas/consultas");

module.exports ={
    ruta:(data, callback)=>{
      callback(200 ,{mensaje: 'esta es/ruta'});
    },
    
    mascotas: mascotas(recursos.mascotas),
    //estas veterinarias aun no existe en el modulo recurso pero vamos a crearla para asi no tire error en recursos.veterinarias
    veterinarias: veterinarias(recursos.veterinarias),
    duenos: duenos(recursos.duenos),
    consultas: consultas(recursos),
    noEncontrado : (data, callback)=>{
      callback(404, {mensaje:'no encontrado'});
    },
  };
  