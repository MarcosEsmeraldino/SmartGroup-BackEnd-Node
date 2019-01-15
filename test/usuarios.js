// testa rota sem subir servidor
var express = require("../config/express")();

// supertest -> facilita escrita de testes
// integrado com mocha
var request = require("supertest")(express);

describe("UsuariosController", function() {

	/*
	Sempre que for executar teste, irá antes executar esta função 'beforeEach'.

	ver biblioteca node-database-cleaner
	*/
	beforeEach(function(done){
		var conn = express.infra.connectionFactory();
		conn.query("delete from usuario", function(ex, result){
			if(!ex) {
				done();
			}
		});
	});

	it("#listagem json", function(done){
		request.get("/usuarios")
		.set("Accept", "application/json")
		.expect("Content-type", /json/)
		.expect(200, done); // status
	});

	it("#cadastro de novo usuario com dados inválidos", function(done){
		request.post("/usuarios")
		.send({titulo:"", descricao:"novo livro"})
		.expect(400,done);
	});

	it("#cadastro de novo usuario com dados válidos", function(done){
		request.post("/usuarios")
		.send({titulo:"titulo", descricao:"novo livro", preco:20.50})
		.expect(302,done);
	});

});