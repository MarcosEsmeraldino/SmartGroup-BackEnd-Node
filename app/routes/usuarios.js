module.exports = function(app) {

	// select * from usuarios
	var listaUsuarios = function(req, res, next) {
		var connection = app.infra.connectionFactory();
		var usuariosDAO = new app.infra.UsuariosDAO(connection);
		usuariosDAO.lista(function(erros, resultados) {

			if(erros) {
				return next(erros);
			}

			/*Content Negotiation é um mecanismo definido no 
			HTTP que torna possível servir diferentes formatos 
			de um mesmo conteúdo a partir da mesma url. 
			Evitando assim que se precisasse criar novas urls 
			para cada formato necessário*/
			res.format({
				html: function(){
					res.render("usuarios/lista", {lista:resultados});
				},
				json: function(){
					res.json(resultados);
				}
			});
	    	
		});
		connection.end();
	};

	// insert into usuarios
	var criaUsuario = function(req, res){

		var usuario = req.body;

		// express-validator
		//req.assert("titulo", "Título é obrigatório").notEmpty();
		//req.assert("preco", "Formato inválido").isFloat();

		var erros = req.validationErrors();

		if(erros) {
			/*Content Negotiation é um mecanismo definido no 
			HTTP que torna possível servir diferentes formatos 
			de um mesmo conteúdo a partir da mesma url. 
			Evitando assim que se precisasse criar novas urls 
			para cada formato necessário*/
			
			res.format({
				html: function(){
					res.status(400).render("usuarios/form", {
						errosValidacao: erros,
						usuario: usuario
					});
				},
				json: function(){
					res.status(400).json(erros);
				}
			});

			return;
		}
		// end express-validator

		var connection = app.infra.connectionFactory();
		var usuariosDAO = new app.infra.UsuariosDAO(connection);
		usuariosDAO.salva(usuario, function(erros, resultados) {
			// always redirect after post
			res.redirect("/usuarios");
		});
	};

	// remove from usuarios
	var apagaUsuario = function(req, res) {
		var usuario = req.body;
		var connection = app.infra.connectionFactory();
		var usuariosDAO = new app.infra.UsuariosDAO(connection);
		usuariosDAO.exclui(usuario, function(erros, resultados) {
			// always redirect after post
			res.redirect("/usuarios");
		});
	};


	// mapeamento


	// o endereço é o mesmo mas o verbo define a função
	// lista usuarios
	app.get("/usuarios", listaUsuarios);
	
	// cria usuario
	app.post("/usuarios", criaUsuario);

	// o endereço é o mesmo mas o verbo define a função
	// apaga usuario
	app.post("/usuarios/form", apagaUsuario);

	// form para criar Usuario
	app.get("/usuarios/form", function(req, res) {
		res.render("usuarios/form", {
			errosValidacao: {},
			usuario: {}
		});
	});
}