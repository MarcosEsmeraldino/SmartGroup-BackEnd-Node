var http = require('http');

var configuracoes = {
	hostname: 'localhost',
	port: 3000,
	path: '/usuarios',
	method: 'post',
	headers: {
		/*Content Negotiation é um mecanismo definido no 
		HTTP que torna possível servir diferentes formatos 
		de um mesmo conteúdo a partir da mesma url. 
		Evitando assim que se precisasse criar novas urls 
		para cada formato necessário*/
		
		// "Accept": "text/html" default
		"Accept": "application/json",
		"Content-type": "application/json"
	}
};

var client = http.request(configuracoes, function(res){
	console.log(res.statusCode);
	res.on('data', function(body){
		console.log("Body: "+body);
	});
});

var usuario = {
	titulo: 'mais sobre node',
	descricao: 'node, javascript e um pouco sobre http',
	preco: 100
};

client.end(JSON.stringify(usuario));