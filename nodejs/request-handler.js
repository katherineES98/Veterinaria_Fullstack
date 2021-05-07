const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const enrutador=require("./enrutador");
module.exports =(req, res) => {

    //paso1   
  const urlActual = req.url;
  
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
  
  //3.1.1 dar permisos CORSescribiendo los headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Request-Methods",
  "OPTIONS,GET,PUT,DELETE,POST"
  );
  res.setHeader("Access-Control-Allow-Headers", "*");

  //3.1.2 dar respuesta  inmediata cuando el metodo sea "options"
  if (metodo === "options") {
    res.writeHead(200);
    res.end();
    return;
  }

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
  let buffer = "";
  //3.4.1 ir acumulando la data  cuando el request reciba un payload
  req.on("data" , (data)=> {
  buffer += decoder.write(data);
  });
  
  //3.4.2 terminar de acumular datos y decirle al decoder que finalice , 
  
  req.on("end", ()=>{
  buffer += decoder.end();
  
  //lo que haya en el buffer conviertiendo en un json real con json.parse(lo que haya en el buffer) es estar reemplazando la variable por la que viene en buffer pero ya conviertiendolo en un json 
  if (headers["content-type"] === "application/json") {
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
    });
  }
  
  });
  };
  