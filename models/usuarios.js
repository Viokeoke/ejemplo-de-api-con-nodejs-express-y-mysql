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