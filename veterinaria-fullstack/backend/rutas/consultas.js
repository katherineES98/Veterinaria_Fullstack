module.exports = function consultasHandler({
  consultas, 
  veterinarias,
   mascotas,
}) {
    return   {
       get: (data, callback)=>{
         if (typeof data.indice !== "undefined") {
           if (consultas[data.indice]) {
             return callback(200, consultas[data.indice]);
           }
           return callback(404 ,{
             mensaje:`consulta con indice ${data.indice} no encontrado`,
           });
         }
         //* esto es si manejamos toda la data en la memoria , claro si tenemos una bases de datos no seria neceswrio esto porque la relacion ya la haria con la baase de datos esas relaciones 
        const consultasConRelaciones = consultas.map((consulta)=>(
          {...consulta,
             mascota: {...mascotas[consulta.mascota], id: consulta.mascota },
             veterinaria:{...veterinarias[consulta.veterinaria], id: consulta.veterinaria },
            } 
          ));
       callback(200 , consultasConRelaciones);
     },
     //metodo post
     post: (data, callback)=>{
         let nuevaConsulta = data.payload;
         nuevaConsulta.fechaCreacion = new Date();
         nuevaConsulta.fechaEdicion= null;
        //no haremos un push si no un destructuracion mejor lo que tenga en consulta agregar la nueva consulta
        //consultas.push(data.payload);
        consultas= [...consultas,nuevaConsulta];
       callback(201 , nuevaConsulta);
     },
     put: (data, callback)=>{
       if (typeof data.indice !== "undefined") {
         if (consultas[data.indice]) {
         const {fechaCreacion} = consultas[data.indice];
         consultas[data.indice]={
             ...data.payload,
             fechaCreacion,
             fechaEdicion: new Date(),
         };

           return callback(200, consultas[data.indice]);
         }
         return callback(404 ,{
           mensaje:`consulta con indice ${data.indice} no encontrado`,
         });
       }
     callback(400 , {mensaje:"indice no enviado "});
   },
   delete: (data, callback)=>{
     if (typeof data.indice !== "undefined") {
       if (consultas[data.indice]) {
        consultas = consultas.filter((_consultas,indice)=>indice != data.indice);
         return callback(204, {mensaje: `elemento con indice ${data.indice} eliminado `, 
       });
       }
       return callback(404 ,{
         mensaje:`consulta con indice ${data.indice} no encontrado`,
       });
     }
   callback(400 , {mensaje:"indice no enviado "});
   },
   };
   } 