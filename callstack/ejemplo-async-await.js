
 const fabricaDePromesas = (indice)=> new Promise ((resolve,reject) => {
    const tiempoRejected = Math.floor(Math.random() * 10000) + 1000;
    const tiempoResolved = Math.floor(Math.random() * 10000) + 1000;
    
    //esta es la que rechazara la promesa ahora con un tiempo random
   /*
    setTimeout(() => {
            reject(`la promesa ${indice} fallo`)
        }, tiempoRejected);
        */
        //esta es a que aceptara la promesa segun el tiempo que el random le asignara
        setTimeout(() => {
            resolve(`promesa ${indice} satisfecha`)
        }, tiempoResolved);
    
        
    });
 /*
    let misPromesas = [];
    for (let i = 0; i < 10; i++) {
       misPromesas = [...misPromesas,fabricaDePromesas(i)];
        
    }

    Promise.race(misPromesas).then(respuesta => console.log(respuesta)).catch (razon => console.log(razon))
     */

    //lo primero que haremos es crear una funcion
//funcion asicrona y la ppalabra await solo se usa con la palabra async

/*
async function miAsyncFuncion() {
        const miPromesa1 = await fabricaDePromesas(1);
        console.log('Este es el valor de mi promesa uno',{miPromesa1})
    }
    
//FUNCION normalahora vamos a poner elcodigo de arriba pero si l palabra await
    function miFuncionNomral(){
        const miPromesa2 =fabricaDePromesas(2);
        console.log('Este es el valor de mi promesa2',{miPromesa2})
    }

    */

    //ahora hacerlo con el catch el mismo codigo de arriba para capturar el error


  /*
    async function miAsyncFuncion() {
        try {
            const miPromesa1 = await fabricaDePromesas(1);
        //console.log('Este es el valor de mi promesa uno',{miPromesa1})
        //como esto realmente me devuelve la promesa entonces hare un return que le pasarare elvalor dela promesa1 pero el valor que se resuelva en fabricaDePromesa
        //cosa difernete aca que capturo el valor de mi promesa como un then
        return miPromesa1 ;
       } catch (error) {
           //mes mas que todo para mirar  el error
           //return error;
           //pero si quiero que me tire el error uso throw error
            throw error;
           //console.log("hubo un error") 
        }
    
    }
    
//FUNCION normalahora vamos a poner elcodigo de arriba pero si l palabra await
    function miFuncionNomral(){
        return fabricaDePromesas(2);
        //diferenteaca que aqui ya estoy haviendo el catch es decir es diferente esto con lo de arriba
        //const miPromesa2 =fabricaDePromesas(2).then(resultado => console.log(resultado)). 
       // catch(razon => console.log(razon))
        
    }

  */

//ahora hacer eso de las promesas lo anterior pero sin promise all si no con await 

async function miAsyncFuncion() {
    try {''
        let misPromesas = [];
       for (let i = 0; i < 10; i++) {
           //cada ves que ingresamos un nueva promesa en el array le hacemos await
       misPromesas = [...misPromesas, await fabricaDePromesas(i)];
                
      }
      console.log('varaible mmispromesa al interior de la async function',misPromesas)
        //const miPromesa1 = await fabricaDePromesas(1);
        return misPromesas ;

   } catch (error) {
        throw error;
       //console.log("hubo un error") 
    }

}

//FUNCION normalahora vamos a poner elcodigo de arriba pero si l palabra await
function miFuncionNomral(){
    return fabricaDePromesas(2);
    
    
}
