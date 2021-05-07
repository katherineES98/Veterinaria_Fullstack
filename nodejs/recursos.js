module.exports = {
    mascotas:[
      {tipo: "perro", nombre:"Trosky0", dueno:"camilo"},
      {tipo: "perro", nombre:"Trosky1", dueno:"camilo"},
      {tipo: "perro", nombre:"Trosky2", dueno:"camilo"},
      {tipo: "perro", nombre:"Trosky3", dueno:"camilo"},
      {tipo: "perro", nombre:"Trosky4", dueno:"camilo"}
    ],
    veterinarias:[
      {nombre: "Alexandra", apellido:"Perez", documento:"1234567890"},
      {nombre: "Juan", apellido:"Gomez", documento:"456789999666"},
      {nombre: "Julian", apellido:"Madrid", documento:"5678888555"},
      {nombre: "Marvin", apellido:"Vasquez", documento:"1111000006677"},
    ], 
    duenos:[
      {nombre: "Alejandra", apellido:"Ramirez", documento:"12000000"},
      {nombre: "Alejandra", apellido:"Fernandez", documento:"12340000000"},
      {nombre: "Emma", apellido:"Gonzales", documento:"2345677777"},
      {nombre: "Nicoll", apellido:"Lopez", documento:"4321568"},
    ],
    consultas:[
      {mascota: 0, 
        dueno:0, 
        veterinaria:0,
        fechaCreacion: new Date(), 
        fechaEdicion:new Date(), 
        historia:'',
         diagnostico:''
        },
      
    ],
  };