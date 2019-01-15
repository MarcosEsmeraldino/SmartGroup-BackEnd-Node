module.exports = function(app) {

	// select * from votos
	var listaVotos = function(req, res, next) {
		var connection = app.infra.connectionFactory();
		var votosDAO = new app.infra.VotosDAO(connection);
		votosDAO.lista(function(erros, resultados) {

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
					res.render("votos/lista", {lista:resultados});
				},
				json: function(){
					res.json(resultados);
				}
			});
	    	
		});
		connection.end();
	};

	// insert into votos
	var criaVoto = function(req, res){

		var voto = req.body;

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
					res.status(400).render("votos/form", {
						errosValidacao: erros,
						voto: voto
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
		var votosDAO = new app.infra.VotosDAO(connection);
		votosDAO.salva(voto, function(erros, resultados) {
			// always redirect after post
			res.redirect("/votos");
		});
	};

	// remove from votos
	var apagaVoto = function(req, res) {
		var voto = req.body;
		var connection = app.infra.connectionFactory();
		var votosDAO = new app.infra.VotosDAO(connection);
		votosDAO.exclui(voto, function(erros, resultados) {
			// always redirect after post
			res.redirect("/votos");
		});
	};


	// mapeamento
	
	// lista votos
	app.get("/votos", listaVotos);
	// cria voto
	app.post("/votos", criaVoto);

	// o endereço é o mesmo mas o verbo define a função
	// apaga voto
	app.post("/votos/form", apagaVoto);
	// form para criar Voto
	app.get("/votos/form", function(req, res) {
		res.render("votos/form", {
			errosValidacao: {},
			voto: {}
		});
	});
}