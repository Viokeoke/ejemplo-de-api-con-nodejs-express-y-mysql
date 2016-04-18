var express = require("express");
var router=express.Router();
var bodyParser  = require("body-parser");
var aplicacion = express();
var usuarios=require("./routes/rutasUsuario");
router.get('/', function(request, response) {  
   response.status(200).json({"mensaje":"Nuestra primera app con node.js utilizando express"});
});
aplicacion.use(bodyParser.json()); 
//incluimos el archivo en el que se almacenan las rutas de cada entidad
aplicacion.use(router);  
aplicacion.use(usuarios);
 

aplicacion.listen(5000, function() { 
console.log("Servidor iniciado");
});