function EnqueteDAO(connection) {
	this._connection = connection;
}

EnqueteDAO.prototype.lista = function(callback) {
    this._connection.query("select * from enquete", callback);
}

EnqueteDAO.prototype.salva = function(enquete, callback) {
    this._connection.query("insert into enquete set ?", enquete, callback);
}

EnqueteDAO.prototype.exclui = function(enquete, callback) {
	console.log(enquete);
    this._connection.query("delete from enquete where id = " + enquete.id, enquete, callback);
}

EnqueteDAO.prototype.altera = function(enquete, callback) {
    this._connection.query("update enquete set ?", enquete, callback);
}

module.exports = function() {
	return EnqueteDAO;
}
