
/*
const miPormesa = new Promise ((resolve,reject) => {
//esta es aceptable la promesa
    //resolve ("la promesa fue resuelta")

    //ahora vamos hacer que la promesa sea rechazada
reject("la promesa fallo")
});
//recibe dos funxiones una que es aceptable y otra rechazable
miPormesa.then( respuesta=> console.log (respuesta), razon => console.log(razon)
);
*/

//ahora vamos hacerlo con settimeout
/*
const miPromesa = new Promise ((resolve,reject) => {
    //esta es aceptable la promesa
        setTimeout(() => {
            //ahora hagamos lo contrario esta es que no hubo ningun error ahora que hiaga un errro
            //resolve("set time out finalizo")
//esta es que hay un error con reject
            reject("set tim out rechazado")
        }, 20000);
    
        
    });
    //recibe dos funxiones una que es aceptable y otra rechazable
    miPromesa.then( respuesta=> console.log (respuesta), razon => console.log(razon)
    );
    */
    //ahora vamos a crear esta misma pero ahora con ramdom

    
    /*

    const miPromesa = new Promise ((resolve,reject) => {
        const tiempoRejected = Math.floor(Math.random() * 10000) + 1000;
        const tiempoResolved = Math.floor(Math.random() * 10000) + 1000;
        console.log("tiempoRejected" , tiempoRejected)
        console.log("tiempoResolved" , tiempoResolved)
        //esta es la que rechazara la promesa ahora con un tiempo random
            setTimeout(() => {
                reject("la promesa fallo")
            }, tiempoRejected);
            //esta es a que aceptara la promesa segun el tiempo que el random le asignara
            setTimeout(() => {
                resolve("promesa satisfecha")
            }, tiempoResolved);
        
            
        });
        //recibe dos funxiones una que es aceptable y otra rechazable
        miPromesa.then( respuesta=> console.log (respuesta), razon => console.log(razon)
        );
        */


      /*
        //ahora creariamos una fabrica de promesas

        const fabricaDePromesas = (indice)=> new Promise ((resolve,reject) => {
            const tiempoRejected = Math.floor(Math.random() * 10000) + 1000;
            const tiempoResolved = Math.floor(Math.random() * 10000) + 1000;
            
            //esta es la que rechazara la promesa ahora con un tiempo random
                setTimeout(() => {
                    reject(`la promesa ${indice} fallo`)
                }, tiempoRejected);
                //esta es a que aceptara la promesa segun el tiempo que el random le asignara
                setTimeout(() => {
                    resolve(`promesa ${indice} satisfecha`)
                }, tiempoResolved);
            
                
            });

            let misPromesas = [];
            for (let i = 0; i < 10; i++) {
               misPromesas = [...misPromesas,fabricaDePromesas(i)];
                
            }

            misPromesas.forEach(promesaActual=> promesaActual.then(respuesta =>console.log(respuesta)).catch(razon => console.log(razon))
            );
 */





 //ahoravamos hacer el codigo anterior con promise all

 const fabricaDePromesas = (indice)=> new Promise ((resolve,reject) => {
    const tiempoRejected = Math.floor(Math.random() * 10000) + 1000;
    const tiempoResolved = Math.floor(Math.random() * 10000) + 1000;
    
    //esta es la que rechazara la promesa ahora con un tiempo random
        setTimeout(() => {
            reject(`la promesa ${indice} fallo`)
        }, tiempoRejected);
        //esta es a que aceptara la promesa segun el tiempo que el random le asignara
        setTimeout(() => {
            resolve(`promesa ${indice} satisfecha`)
        }, tiempoResolved);
    
        
    });

    let misPromesas = [];
    for (let i = 0; i < 10; i++) {
       misPromesas = [...misPromesas,fabricaDePromesas(i)];
        
    }

    //usamos promise all enves del foreach y a ese funcion le pasamos el array mispromesas
//lo malo es que si una falla alli para todo no dea veer las demas
    //Promise.all(misPromesas).then(respuesta => console.log(respuesta)).catch (razon => console.log(razon))
         //vamos usar otro metodo que es allsettled devuelve un objeto bueno en si el retorno fue una promesa solo que aqui como retorna tanto las rechazadas como admitidas se convierte en un objeto
    //Promise.allSettled(misPromesas).then(respuesta => console.log(respuesta)).catch (razon => console.log(razon))

    //ahora vamos a probar con .race que es la primera que se ejecute gana ya sea admitida o rechzada es como una carrera
    Promise.race(misPromesas).then(respuesta => console.log(respuesta)).catch (razon => console.log(razon))