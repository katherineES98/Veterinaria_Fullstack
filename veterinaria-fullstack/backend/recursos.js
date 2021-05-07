module.exports = {
    mascotas:[
      {tipo: "Perro", nombre:"Trosky0", dueno:"Camilo"},
      {tipo: "Perro", nombre:"Trosky1", dueno:"Camilo"},
      {tipo: "Perro", nombre:"Trosky2", dueno:"Camilo"},
      {tipo: "Perro", nombre:"Trosky3", dueno:"Camilo"},
      {tipo: "Perro", nombre:"Trosky4", dueno:"Camilo"}
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
         diagnostico:'diagnostico'
        },
      
    ],
  };