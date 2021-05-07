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

function sumar(num1,num2){
    return num1 + num2;
}

function restar(num1,num2){
    return num1 - num2;
}

function multiplicar(num1,num2){
    return num1 * num2;
}

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

//


