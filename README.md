# ejemplo-de-api-con-nodejs-express-y-mysql
Ejemplo de cómo hacer una api con nodejs y express consumiendo datos de una base de datos MySQL

<h3>Cómo hacer una api con Node.js, express y MySQL</h3>
<img class="center " width="50%" src="http://blueberrydevelop.com/blogPersonal/images/blogapinode/nodejs.png">

<p>En este tutorial explicaremos cómo hacer una api con Node.JS ayudándonos de la libreria express para hacer consultas a una base de datos MySQL. En este tutorial partiremos de la base de que tenemos instalado Node.JS y configurado correctamente el editor de paquetes npm.</p>
<h4>Instalar express</h4>
  
<img class="center " width="50%" src="http://blueberrydevelop.com/blogPersonal/images/blogapinode/express.png">
<p>Esta parte puede darnos muchos problemas, yo tuve muchas complicaciones con express por que tras instalarlo no me lo reconocía la terminal de windows, depende de cada ordenador y configuración si os dá muchos problemas podeis dejarme un comentario o googlear un poco a mucha gente le sucede esto, suele deberse a que express no se instala correctamente, en vez de instalarse globalmente se instala en la carpeta en la que estamos ejecuntando la consola de comandos.</p>
<p> Para instalar express sólo tendremos que ejecutar este comando en la terminal</p>
<pre class="language-markup">
	npm install -g express
</pre>

<h4>Primera app con express</h4>
<p>Para crear nuestra primera app con express ejecutaremos el siguiente comando</p>
<pre class="language-markup">
	express nuestraPrimeraApi
</pre>
<p>Automáticamente se creará una carpeta con el nombre que hallamos especificado en este caso nos creará la carpeta nuestraPrimeraApi,dentro de ella econtraremos estos archivos.</p>
<img class="materialboxed center z-depth-3 " width="100%" src="http://blueberrydevelop.com/blogPersonal/images/blogapinode/carpetaArchivos.PNG">
<p>El archivo app.js es como nuestro "main" de la aplicación, con el configuraremos toda la aplicación, podremos definir las rutas,etc. Express nos creará por defecto una serie de archivos con contenido por defecto el cual obviaremos y borraremos para empezar desde cero para entender el funcionamiento de la api, asi que borraremos los archivos que se encuentran dentro de la carpeta routes y el contenido de app.js. También crearemos una carpeta llamada models que será donde guardemos cada uno de los archivos encargados de conectar con la base de datos y lanzar sentencias SQL.La jerarquía deberá quedar tal que así.</p>
<img class="materialboxed center z-depth-3 " src="http://blueberrydevelop.com/blogPersonal/images/blogapinode/jerarquiaArchivos.PNG">
<h4>Un poco de código</h4>
<p>Comenzaremos añadiendo código al archivo app.js al que previamente hemos borrado todo el contenido generado automáticamente por express y añadiremos esto:</p>
<pre class="  language-javascript" ><code class="  language-javascript">
var express = require("express");
var router=express.Router();
var aplicacion = express();

router.get('/', function(request, response) {  
   response.status(200).json({"mensaje":"Nuestra primera app con node.js utilizando express"});
});

aplicacion.use(router);  


aplicacion.listen(5000, function() { 
console.log("Servidor iniciado");
});
</code>
</pre>
<p>Creo que el código es fácil de entender y que no tiene mucha miga, importamos express al archivo mediante el método require y lo almacenamos en la variable express.
Express ya se encarga del direccionamiento de la api y mediante el objeto router podremos crear las diferentes llamadas get,post,put y delete. Para terminar sólo tendremos que indicar a la app que utilize las rutas definidas por router y el puerto en el que debe iniciarse.</p>
<p>Para iniciar nuestra aplicación sólo tendremos que navegar con la terminal hasta el directorio en el que se encuentre la api y ejecutar el siguiente comando</p>
<pre class="language-bash">
	node app.js
</pre>
<p>Tras ejecutarlo el servidor estará corriendo en http://localhost:5000/</p>
<h4>¿Cómo hacer llamadas a nuestra api?</h4>
<p>Para poder consumir nuestra api y probarla podremos usar clientes que nos proporcionen las herramientas necesarias para hacer las diferentes llamadas get,post... Tras probar unos cuantos el que más me ha gustado y con la interfaz más intuitiva es <a href="http://insomnia.responset/">insomnia rest client</a>.</p>
<p>Con este cliente podremos seleccionar las diferentes llamadas para probar nuesto cliente, para probarlo sólo tendremos que hacer una peticion get tal que así</p>
<img class="materialboxed center z-depth-3 " width="100%" src="http://blueberrydevelop.com/blogPersonal/images/blogapinode/insomniaRest.PNG">
<h4>Configurando la base de datos MySQL</h4>
<p>Ya hemos aprendido como definir una ruta get sencilla y la respuesta en un json.
Ahora nos meteremos con la base de datos, he escogido MySQL para este ejemplo, podeis usar cualquier base de datos tan sólo teneis que buscar el framework e instalarlo mediante npm, para ello con la terminal en la carpeta de nuestra aplicación ejecutaremos:</p>
<pre class="language-bash">
	npm install mysql
</pre>
<p>Tras instalar el paquete que gestionará la conexion MySQL y ejecutará las consultas crearemos un archivo nuevo en models que se llamará connection.js en el que definiremos los datos para que la aplicación se pueda conectar a nuestra base de datos. </p>
<pre class="language-javascript">
	var connection={ 
		host: 'host', 
		user: 'root',  
		password: 'root', 
		database: 'ejemplo',
	};

module.exports = connection;
</pre>
<p>Para este ejemplo he creado una base de datos nueva llamada ejemplo la que contiene una tabla llamada usuarios que contendrá un id de usuario y nombre,algo sencillo.</p>
<h4>Creando modelos y definiendo rutas</h4>
<p>Crearemos nuestro primer modelo dentro de la carpeta models que se llamará usuarios.js en el que ejecutaremos las sentencias sql y definiremos los métodos para la obtención, creación y modificación de usuarios.</p>
<pre class="language-javascript">
//Importamos los datos de la conexión
var conn=require('./connection');
//Importamos el paquete mysql
var mysql = require('mysql'),
//Creamos la conexión a nuestra base de datos con los datos almacenados en conn
connection = mysql.createConnection(
	conn
);
 
//Creamos un objeto al que llamaremos usuarios
var usuarios = {};
 
//Obtenemos todos los usuarios
usuarios.getUsuarios = function(callback)
{
	if (connection) 
	{
		connection.query('SELECT * FROM usuarios', function(error, rows) {
			if(error)
			{
				throw error;
			}
			else
			{
				callback(null, rows);
			}
		});
	}
}
 
//Obtenemos un usuario por su id
usuarios.getUsuarioById = function(id,callback)
{
	if (connection) 
	{
		var sql = 'SELECT * FROM usuarios WHERE id = ' + connection.escape(id);
		connection.query(sql, function(error, row) 
		{
			if(error)
			{
				throw error;
			}
			else
			{
				callback(null, row);
			}
		});
	}
}

//Añadir un nuevo usuario
usuarios.insertUsuario = function(usuarioData,callback)
{
	if (connection) 
	{
		connection.query('INSERT INTO usuarios SET ?', usuarioData, function(error, result) 
		{
			if(error)
			{
				
				throw error;
			}
			else
			{
				//devolvemos el id del usuario insertado
				callback(null, result.insertId);
			}
		});
	}
}
 
//Actualizar un usuario
usuarios.updateUsuario = function(datosUsuario, callback)
{
	
	if(connection)
	{
		var sql = 'UPDATE usuarios SET nombre = ' + connection.escape(datosUsuario.nombre)  +' WHERE id = ' + datosUsuario.id;
		connection.query(sql, function(error, result) 
		{
			if(error)
			{
				throw error;
			}
			else
			{
				callback(null,{"mensaje":"Actualizado"});
			}
		});
	}
}
 
//Eliminar un usuario por su id
usuarios.deleteUsuario = function(id, callback)
{
	if(connection)
	{
		var sql = 'DELETE FROM usuarios WHERE id = ' + connection.escape(id);
		connection.query(sql, function(error, result) 
			{
				if(error)
					{
						throw error;
					}
				else
					{
						callback(null,{"mensaje":"Borrado"});
					}
			});
	}
			
}

module.exports =usuarios;
</pre>
<p>Ahora procederemos a crear las diferentes rutas para ejecutar los métodos que acabamos de crear, para ello crearemos un nuevo archivo en routes al que llamaremos rutasUsuario.js el cual contendrá lo siguiente:</p>
<pre class="language-javascript">
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

</pre>
<p>Podemos ver como cogemos los datos de las diferentes llamadas a la api mediante el request, tenemos varias formas de coger datos para procesarlos, request.body, request.query y request.headers. Para poder coger los datos del body necesitaremos el package body-parser, para ello con la terminal situada en la carpeta de la api ejecutaremos el siguiente comando:</p>
<pre class="language-bash">
	npm install body-parser
</pre>
<p>Tras instalarlo deberemos importar el paquete al archivo app.js e incluirlo al uso de la aplicación para ello añadiremos dos lineas en el archivo app.js:</p>
<pre class="  language-javascript" ><code class="  language-javascript">
var express = require("express");
var router=express.Router();
var bodyParser  = require("body-parser");
var aplicacion = express();
router.get('/', function(request, response) {  
   response.status(200).json({"mensaje":"Nuestra primera app con node.js utilizando express"});
});

aplicacion.use(bodyParser.json()); 
//incluimos el archivo en el que se almacenan las rutas de cada entidad
aplicacion.use(router);  

aplicacion.listen(5000, function() { 
console.log("Servidor iniciado");
});
</code>
</pre>
<h4>Finalizando</h4>
<p>Tras hacer todo lo explicado anteriormente sólo quedará agregar las rutas al app.js,rearrancar la aplicación y probarla haciendo llamadas la api, espero que haya sido de ayuda, teneis el proyecto completo en  <a href="https://github.com/Viokeoke/ejemplo-de-api-con-nodejs-express-y-mysql">github</a>.</p>
<pre class="  language-javascript" ><code class="  language-javascript">
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
</code>
</pre>
</div>


