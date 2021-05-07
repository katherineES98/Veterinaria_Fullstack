const http = require('http');
const url = require('url');
//por dependecia hacemos esto  por buena pacticas . las dependencias serian al principios de la pagina. obtener payload en el caso de haber uno 
const StringDecoder = require('string_decoder').StringDecoder;
let recursos ={
  mascotas:[
    {tipo: "perro", nombre:"Trosky", dueno:"camilo"},
    {tipo: "perro", nombre:"Trosky", dueno:"camilo"},
    {tipo: "perro", nombre:"Trosky", dueno:"camilo"},
    {tipo: "perro", nombre:"Trosky", dueno:"camilo"},
    {tipo: "perro", nombre:"Trosky", dueno:"camilo"}
  ],

};

/*utlizar el metodo createserver proviene de htttp osea de donde guarde  la referencia al modulo http osea la consta que esta arriba  y si nos fijamos hay un punto http.createserver ese punto es una 
no tacion punto que es un objeto que lo que me entrega http es un objeto o un prototipo que me tendria que dar un metodo createserver y esa recibe una funcion osea le estoy pasando a esa funcion un parametro que es otra funcion y eso es un collback 
es decir que esa funcion le puedo poner en una variable y pasarle la variable a esa otra funcion 
como const callbackDelSevidor= (req,res)=>{res.end();} ; y pasarle nada mas a esa variable a la funcion createServer y funcionaria igual de como estar ahora es lo mismo si paso la funcion directamente dentro de esa funcion como parametro
el create server se la pasa un objeto antes de requestListener http.createServer([options][,requestlistener])

*/
const callbackDelServidor =(req, res) => {

  //console.log(req.url)//esta respuestano no la veremos a nivel delnvegador porque lo estamos ejecutando en este ambito ya sea en la cmd o aqui en la terminal de vscode 
//cada vez que ejecuto un req= request se vaa ejecutar ese console log de req y es bien largo lo que imprime y lo queme interesa es sobre la url y como es un objeto y lo que neesito de ese es la url
    
//la urlActual entonces es el string como tal que llega en el request de la url 
  //paso1   
const urlActual = req.url;


//la url parseada que es de tipo url tiene un protocolo ,slashes,auth,host,port,hostname,,hash,search,query,pathname,path,href
//yel search que es realmente  el query que ya lo convierte en quey porque le habia pasado variable cualquier cosa , todo lo que le pase por query llegara como string  a pesar que le envie numeros, booleanos  siempre llegara como un string
 //hicimos el paseint recordemos que el true lo que hace es un query string y la convierteen un objeto 
const urlParseada = url.parse(urlActual, true);
     console.log({urlActual,urlParseada});
//paso 2

// y de urlpaseada.pathname lo que obtenemos es el pathname por ahora y dependiendo del pathname loque tenemos eso es lo que llamamos ruta 

const ruta = urlParseada.pathname;

//paso 3 quitar el slash  este se llamara ruta limpia yle pasaremos un replace es simplemente pasarle una expresion regular que nos busque todos los slash y los quite
//la 'g' significa que lo haga global osea para todas las courrencia y que lo convierta en un string vacio osea coja todos los slahp / que encuentre en todos los string y se convierta en un string vacio esta expresionque le paso alli es para quitar esos slach

const rutaLimpia = ruta.replace(/^\/+|\/+$/g, '');

//paso 3.1 me obtiene el metodo get y ese metodo tolowecase la hace minusculas 
const metodo = req.method.toLowerCase();

//paso 3.2
//obtener variable del query url desde la url parseada y si la url parseada no tiene query le llegara un query vacio o nada pues
const {query = {} } = urlParseada;
console.log({query});

//paso 3.3
//obtener los headers
const { headers = {} } = req;
console.log({headers});

//3.4 obtener payload en el caso de haber uno  eso pordepedencia lo pusimos arriba ahora aqui pondremos la instacia decoder
const decoder = new StringDecoder('utf-8');
let buffer = '';
//3.4.1 ir acumulando la data  cuando el request reciba un payload
req.on('data' , (data)=> {
buffer += decoder.write(data);
});

//3.4.2 terminar de acumular datos y decirle al decoder que finalice , 

req.on('end', ()=>{
buffer += decoder.end();

//lo que haya en el buffer conviertiendo en un json real con json.parse(lo que haya en el buffer) es estar reemplazando la variable por la que viene en buffer pero ya conviertiendolo en un json 
if (headers["content-type"]==="application/json") {
  buffer = JSON.parse(buffer);
}

//3.4.3 revisar si tiene subrutas en este caso es el indice del array

if (rutaLimpia.indexOf("/") > -1) {
  var [rutaPrincipal , indice] = rutaLimpia.split("/");
}




//3.5 ordenar la data del request
 const data ={
  indice,
  ruta:rutaPrincipal || rutaLimpia,
  query,
  metodo,
  headers,
  payload:buffer
 };
 console.log({data});
 //3.6 elegir el manejador dependiendo de la ruta y asignarle funcion que elenrutador tiene
let handler;
if (data.ruta&& enrutador[data.ruta] && enrutador[data.ruta][metodo]) {
  handler = enrutador[data.ruta][metodo];
} else {
  handler = enrutador.noEncontrado;
}

//paso 4 ejecutar handler (manejador) para enviar la respuesta
if (typeof handler ==='function') {
  handler(data, (statusCode= 200, mensaje)=>{
    const respuesta =JSON.stringify(mensaje);
    //escribir los headers lo unico que voy a escibir de headers y lo unico que voy a escubur de headers sera el status code el status code no se manda directamente en la respuesta se manda dentro de los encabezados de la respuesta  alli paso el statuscode
    //alli escribi para la respuesta el header por eso es writehead uno de los headers
    res.setHeader("Content-Type","application/json");
    res.writeHead(statusCode);

    //linea donde realmente ya estamos resondiendo ala aplicacion cliente
    res.end(respuesta);
  })
}

//paso 4 con swich  enviar una respuesta dependiendo de la ruta
//enves del if haremos un swich para que veamos que es lo mismo
switch (rutaLimpia) {
  //si localhost:8000/ruta entonces e suna ruta conocida de lo contrario no
  case 'ruta':
    res.end('estas en una ruta conocida');
    break;
  default:
    res.end('desconocida');
}


});
//paso4
//dependiendo del string qu no llegue a ruta enviamos un msj o enviamos el otro ahora hay que hacer que las rutas no ncesariamente nos llegue con ese slach '/'
/*

if (rutaLimpia === 'ruta') {
  res.end('hola estas en ruta');
  
} else {
  res.end('estas en una ruta que no conozco');
};
*/
//estos pasos se refeljan arriba
    //1)obtner url desde el objeto request osea de req que le pasamos al callbackDelServidor, ok listo 
   //2) vamos a obtener la ruta
   //3)enviar una respuesta dependiendo de la ruta
    //res.end("hola tu"); 
};

const enrutador ={
  ruta:(data, callback)=>{
    callback(200 ,{mensaje: 'esta es/ruta'})
  },
  //dentro de esta ruta esperaramos es que llegue un array  con usuario esta de usuario solo era para probar nada mas 
/*
  usuarios:(data, callback)=>{
    //y en este callback le mnadaremos ese array de usuario
    callback(200 ,[{nombre: 'usuario 1'},{nombre: 'usuario 2'},{nombre: 'usuario 3'}])
  },*/

  //usaremos este server para nuestra aplicacion mascota
  //le pasaremos el metodo get a mascota
  mascotas:{
    get: (data, callback)=>{
      if (typeof data.indice !== "undefined") {
        if (recursos.mascotas[data.indice]) {
          return callback(200, recursos.mascotas[data.indice])
        }
        return callback(404 ,{
          mensaje:`mascota con indice ${data.indice} no encontrado`,
        });
      }
    callback(200 , recursos.mascotas);
  },
  //metodo post
  post: (data, callback)=>{
    //console.log('este es el headers',{data})
    recursos.mascotas.push(data.payload);
    //201 cambia el statuddcode porque estamos creando un objeto por eso cambia ese estatusdecode de 200 a 201
    callback(201 , data.payload);
  },
},
  noEncontrado : (data, callback)=>{
    callback(404, {mensaje:'no encontrado'});
  }
}

const server = http.createServer( callbackDelServidor);


server.listen(8000 , ()=>{
    console.log('el servidor esta escucando peticioes en http://localhost:8000')
});