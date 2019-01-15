module.exports = function(app) {

	// select * from comentarios
	var listaComentarios = function(req, res, next) {
		var connection = app.infra.connectionFactory();
		var comentarioDAO = new app.infra.ComentarioDAO(connection);
		comentarioDAO.lista(function(erros, resultados) {

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
					res.render("comentarios/lista", {lista:resultados});
				},
				json: function(){
					res.json(resultados);
				}
			});
	    	
		});
		connection.end();
	};

	// insert into comentario
	var criaComentario = function(req, res){

		var comentario = req.body;

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
					res.status(400).render("comentarios/form", {
						errosValidacao: erros,
						comentario: comentario
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
		var comentarioDAO = new app.infra.ComentarioDAO(connection);
		comentarioDAO.salva(comentario, function(erros, resultados) {
			// always redirect after post
			res.redirect("/comentarios");
		});
	};

	// remove from comentarios
	var apagaComentario = function(req, res) {
		var comentario = req.body;
		var connection = app.infra.connectionFactory();
		var comentarioDAO = new app.infra.ComentarioDAO(connection);
		comentarioDAO.exclui(comentario, function(erros, resultados) {
			// always redirect after post
			res.redirect("/comentarios");
		});
	};


	// mapeamento

	// o endereço é o mesmo mas o verbo define a função
	// lista comentarios
	app.get("/comentarios", listaComentarios);

	// cria comentario
	app.post("/comentarios", criaComentario);

	// o endereço é o mesmo mas o verbo define a função
	// apaga comentario
	app.post("/comentarios/form", apagaComentario);

	// form para criar comentario
	app.get("/comentarios/form", function(req, res) {
		res.render("comentarios/form", {
			errosValidacao: {},
			comentario: {}
		});
	});
}