var nconf	= require("nconf");
var chalk	= require("chalk");
var localdb	= require("diskdb");
var path	= require("path");
var pg		= require("pg");

var addr	= require("./addr.js")

nconf.argv().file({ file: "./data/config.json" });

var debug = nconf.get("debug") === undefined ? false : true;
var pathdb = path.join(__dirname, "./data/");

var dbparams = nconf.get("db");

debug && console.log(chalk.cyan("Base de datos local en: " + pathdb));
debug && console.log(chalk.cyan("Parametros de conexion: " + JSON.stringify(dbparams)));

localdb.connect(pathdb, [ "vpri" ]);

// postgres connection
var string = "postgres://" + dbparams.user + ":" + dbparams.pass + "@" + dbparams.host + ":" + dbparams.port + "/" + dbparams.db;

debug && console.log(chalk.cyan("Cadena de conexion: " + string));

var client = new pg.Client(string);
client.connect(function(err) {
	if(err) {
		return console.log(chalk.red("Error de conexion: ") + err);
	}
	debug && console.log(chalk.cyan("Cliente conectado a postgreSQL"));

	// consulta
	var q = "select gid as id, pdonvial as vpri, pdotexto as vsec, pdotipo as tipo, st_x(geom) as lon, st_y(geom) as lat ";
	q += "from pdom where coalesce(pdonvial, '') <> '' and coalesce(pdotexto, '') <> '' and pdotipo in (1, 2, 3) ";
	q += "order by gid limit 1";
	client.query(q, function(err, result) {
		if(err) {
			client.end();
			return console.log(chalk.red("Error en la consulta: ") + err);
		}
		var rows = result.rows || [], rowsLength = rows.length;
		//console.log(rows);
		rows.forEach(function(reg, index, arr) {
			var vpri = reg.vpri, vsec = reg.vsec;
			//debug && console.log(chalk.cyan("vpri: ") + vpri);
			//debug && console.log(chalk.cyan("vsec: ") + vsec);
			//console.log(index);00..

			//if(!addr.parse(vpri)) {
			//	console.log("id: " + reg.id);
			//}
			//if(!addr.parse(vsec)) {
			//	console.log("id: " + reg.id);
			//}
			addr.parse({
				type: "vpri",
				addr: vpri
			});
		});
		client.end();
	});
});