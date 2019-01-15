function ComentarioDAO(connection) {
	this._connection = connection;
}

ComentarioDAO.prototype.lista = function(callback) {
    this._connection.query("select * from comentario", callback);
}

ComentarioDAO.prototype.salva = function(comentario, callback) {
    this._connection.query("insert into comentario set ?", comentario, callback);
}

ComentarioDAO.prototype.exclui = function(comentario, callback) {
	console.log(comentario);
    this._connection.query("delete from comentario where id = " + comentario.id, comentario, callback);
}

ComentarioDAO.prototype.altera = function(comentario, callback) {
    this._connection.query("update comentario set ?", comentario, callback);
}

module.exports = function() {
	return ComentarioDAO;
}
