var express = require("express");
var load = require("express-load");
var bodyParser = require("body-parser");
var expressValidator = require("express-validator");

// carrega módulo
module.exports = function() {
	
	// express
	var app = express();

	// trata recursos estáticos da aplicação
	app.use(express.static("./app/public"));

	app.set("view engine", "ejs");
	app.set("views", "./app/views");

	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
	app.use(expressValidator());

	load("routes", {cwd: "app"}).then("infra").into(app);

	/*
	'use'

	ex:
	req para o express -> function -> function -> function -> rota

	insere middlewares
	*/
	
	// middleware para apresentação do erro ao usuário
	app.use(function(req, res, next) {
		res.status(404).render("erros/404");
		next();
	});

	// seta status 500
	// nesse middleware o 1º argumento é o erro
	app.use(function(error, req, res, next) {

		if(process.env.NODE_ENV == "production") {
			res.status(500).render("erros/500");
			return;
		}

		next(error);
	});

	return app;
}