module.exports = function(app) {

	// select * from enquetes
	var listaEnquetes = function(req, res, next) {
		var connection = app.infra.connectionFactory();
		var enquetesDAO = new app.infra.EnquetesDAO(connection);
		enquetesDAO.lista(function(erros, resultados) {

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
					res.render("enquetes/lista", {lista:resultados});
				},
				json: function(){
					res.json(resultados);
				}
			});
	    	
		});
		connection.end();
	};

	// insert into enquetes
	var criaEnquete = function(req, res){

		var enquete = req.body;

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
					res.status(400).render("enquetes/form", {
						errosValidacao: erros,
						enquete: enquete
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
		var enquetesDAO = new app.infra.EnquetesDAO(connection);
		enquetesDAO.salva(enquete, function(erros, resultados) {
			// always redirect after post
			res.redirect("/enquetes");
		});
	};

	// remove from enquetes
	var apagaEnquete = function(req, res) {
		var enquete = req.body;
		var connection = app.infra.connectionFactory();
		var enquetesDAO = new app.infra.EnquetesDAO(connection);
		enquetesDAO.exclui(enquete, function(erros, resultados) {
			// always redirect after post
			res.redirect("/enquetes");
		});
	};


	// mapeamento

	// o endereço é o mesmo mas o verbo define a função
	// lista enquetes
	app.get("/enquetes", listaEnquetes);

	// cria enquete
	app.post("/enquetes", criaEnquete);

	// o endereço é o mesmo mas o verbo define a função
	// apaga enquete
	app.post("/enquetes/form", apagaEnquete);

	// form para criar Enquete
	app.get("/enquetes/form", function(req, res) {
		res.render("enquetes/form", {
			errosValidacao: {},
			enquete: {}
		});
	});
}