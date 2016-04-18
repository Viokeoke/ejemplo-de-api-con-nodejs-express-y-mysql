//Importamos express
var express = require('express');
//Creamos el objeto para definir las rutas
var router = express.Router();
//Importamos el modelo que ejecutará las sentencias SQL
var usuariosModel = require('../models/usuarios');

//Coger todos los usuarios
router.get('/usuarios', function(request, response) {  
   usuariosModel.getUsuarios(function(error, data)
    {
          response.status(200).json(data);
    });
});
//Coger usuario por id
router.get('/usuario', function(request, response) {  
  var id = request.query.id;
  usuariosModel.getUsuarioById(id,function(error, datos)
      {
       
        if (typeof data !== 'undefined' && datos.length > 0)
        {
          response.status(200).json(datos);
        }
        else
        {
          response.status(404).json({"Mensaje":"No existe"});
        }
      });
    });
//Insertar usuario
/*
Ejemplo de uso:
en el Body:
{ 
"nombre": "Usuario de Prueba"
}


*/
router.post('/usuario', function(request, response) { 
  var datosUsuario = {
      id : null,
      nombre : request.body.nombre
    };
    usuariosModel.insertUsuario(datosUsuario,function(error, datos)
    {
      if(datos)
      {
        response.status(200).json({"Mensaje":"Insertado"});
      }
      else
      {
        response.status(500).json({"Mensaje":"Error"});
      }
    });
});

//Modificar un usuario
router.put('/usuario', function(request, response) {  
    var datosUsuario = {
      id:request.query.id,
      nombre : request.query.nombre
      };

    usuariosModel.updateUsuario(datosUsuario,function(error, datos)
    {
      //si el usuario se ha actualizado correctamente mostramos un mensaje
      if(datos && datos.mensaje)
      {
        response.status(200).json(datos);
      }
      else
      {
        response.status(500).json({"mensaje":"Error"});
        
      }
    });

});
//Borrar un usuario

router.delete('/usuario', function(request, response) {  
	var id = request.query.id;
    usuariosModel.deleteUsuario(id,function(error, datos)
    {
      if(datos && datos.mensaje === "Borrado")
      {
        response.status(200).json(datos);
      }
      else
      {
        response.status(500).json({"mensaje":"Error"});
      }
    });

});

module.exports = router;
