function VotoDAO(connection) {
	this._connection = connection;
}

VotoDAO.prototype.lista = function(callback) {
    this._connection.query("select * from voto", callback);
}

VotoDAO.prototype.salva = function(voto, callback) {
    this._connection.query("insert into voto set ?", voto, callback);
}

VotoDAO.prototype.exclui = function(voto, callback) {
	console.log(voto);
    this._connection.query("delete from voto where id = " + voto.id, voto, callback);
}

VotoDAO.prototype.altera = function(voto, callback) {
    this._connection.query("update voto set ?", voto, callback);
}

module.exports = function() {
	return VotoDAO;
}
