module.exports = function(app) {

	var calculaResultado = function(req, res, next) {
		console.log("/resultados/enquete/");
	}

	// mapeamento

	// calcula resultado de enquete
	app.get("/resultados/enquete/", calculaResultado);
}