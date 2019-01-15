function UsuarioDAO(connection) {
	this._connection = connection;
}

UsuarioDAO.prototype.lista = function(callback) {
    this._connection.query("select * from usuario", callback);
}

UsuarioDAO.prototype.salva = function(usuario, callback) {
    this._connection.query("insert into usuario set ?", usuario, callback);
}

UsuarioDAO.prototype.exclui = function(usuario, callback) {
	console.log(usuario);
    this._connection.query("delete from usuario where id = " + usuario.id, usuario, callback);
}

UsuarioDAO.prototype.altera = function(usuario, callback) {
    this._connection.query("update usuario set ?", usuario, callback);
}

module.exports = function() {
	return UsuarioDAO;
}
