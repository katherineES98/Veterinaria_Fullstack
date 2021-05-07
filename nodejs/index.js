const http = require('http');

//los modulos se le pasa la ruta donde esa ese archivo no se lepasa el .js y asi no tenemos un codigo largo
const requestHandler = require("./request-handler");




const server = http.createServer( requestHandler);


server.listen(8000 , ()=>{
    console.log('el servidor esta escucando peticioes en http://localhost:8000')
});