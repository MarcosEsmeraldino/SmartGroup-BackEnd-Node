var mysql = require("mysql");

// factory method
function createDbConnection() {

	/*
	 Utiliza a variável NODE_ENV (express/lib/application) para definir se usa banco de testes ou de produção.

	 NODE_ENV deve ser definido na execução do teste pela seguinte linha de comando:
	 
	 NODE_ENV=test node_modules/mocha/bin/mocha
	 */
	if(process.env.NODE_ENV == "test")
		return mysql.createConnection({
			host : "localhost",
			user : "root",
			password : "novasenha",
			database : "smartgroup_backend_node_test"
		});

	else
		return mysql.createConnection({
			host : "localhost",
			user : "root",
			password : "novasenha",
			database : "smartgroup_backend_node"
		});
}

//wrapper
module.exports = function() {
	return createDbConnection;
}