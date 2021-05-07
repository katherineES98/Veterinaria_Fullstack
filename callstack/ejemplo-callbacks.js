/*

setTimeout(() => {
    console.log("me ejecute despues");
}, 3000);
*/


//tambien se puede hacer de esta manera la funcion anterior

/*
const ejecutarMasTarde = () =>{
    console.log("me ejecute despues");
}

setTimeout(ejecutarMasTarde,3000);
*/

//esta es otra manera 
/*
const ejecutarMasTarde = () =>{
    setTimeout(()=>{
        console.log("me ejecute despues");
    },3000);
    
};

ejecutarMasTarde();

*/

//ahora la haremos diferente en poner la funcion afuera y darle un nombre , claro la funcion que esta dentro de settimeout
/*
const funciondeCallback = ()=>{
    console.log("me ejecute despues");
}



const ejecutarMasTarde = () =>{
    setTimeout(funciondeCallback,3000);
    
};

ejecutarMasTarde();
*/

//ahora vamos a ver otros casosdonde se puede usar callbacks
/*
function sumar(num1,num2){
    return num1 + num2;
}

function restar(num1,num2){
    return num1 - num2;
}

function multiplicar(num1,num2){
    return num1 * num2;
}
*/
//console.log(sumar(5,4));
//console.log(restar(5,4));
//console.log(multiplicar(5,4));
/*
function multiFuncion(num1,num2,callback){
    const resultado = callback(num1,num2);
    console.log(resultado);
}
multiFuncion(5, 4, sumar);
multiFuncion(5, 4, restar);
multiFuncion(5, 4, multiplicar);
*/

/*
//otro ejemplo de callback parte 3 ahora con un boton 
este es una manera de hacerlo pero ahora lo haremos poniendole a la funcio un nombre no necesita
parentesis la funcion porque solo es una instruccion
const miBoton = document.getElementById("miboton");
miBoton.addEventListener("click" , evento =>{
    console.log(evento);
    alert("diste click en el boton")
});

*/

/*
//otra manera de hacerlo la funcion anterior
const miBoton = document.getElementById("miboton");
const ejecutarCuandoClickEnElBoton = evento => {
    console.log(evento);
    alert ("diste click en el bootn")
};
miBoton.addEventListener("click" ,ejecutarCuandoClickEnElBoton );
*/


/*
//otra mnera solo para ver el odern que se ejecuta es lo mimso solo que en el console no le pasams el evento

const miBoton = document.getElementById("miboton");
const ejecutarCuandoClickEnElBoton = evento => {
    console.log("por aca soy callback");
    alert ("diste click en el bootn")
};
//este es un callback 
miBoton.addEventListener("click" ,ejecutarCuandoClickEnElBoton );
//pero este no es un callback
ejecutarCuandoClickEnElBoton();
*/

//anidamiento de collback
/*/
setTimeout(() => {
  console.log("ejecucion1");
    setTimeout(() => {
        console.log("ejecucion2")
        setTimeout(() => {
            console.log("ejecucion3")
            setTimeout(() => {
                console.log("ejecucion4")
            }, 4000);
        }, 10000);
    }, 2000);
}, 3000);
*/
//esto lo podriamos hacer mas ordenado y ahora el codigo no seria tan anidado muuy triangulo demuerte XD y deberia de funcionar

const funcion4 = () =>{
    console.log("ejecucion4")

}

const funcion3 = () =>{
    console.log("ejecucion3")
    setTimeout( funcion4, 4000)
}

const funcion2 = () =>{
    console.log("ejecucion2")
    setTimeout(funcion3 , 10000)
}

const funcion1 = () =>{
    console.log("ejecucion1")
    setTimeout(funcion2 , 2000)
}
setTimeout(funcion1,3000)