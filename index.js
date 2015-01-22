var nconf	= require("nconf");
var chalk	= require("chalk");
var localdb	= require("diskdb");
var path	= require("path");
var pg		= require("pg");

nconf.argv().file({ file: "./data/config.json" });

var debug = nconf.get("debug") === undefined ? false : true;
var pathdb = path.join(__dirname, "./data/");

var dbparams = nconf.get("db");

debug && console.log(chalk.cyan("Base de datos local en: " + pathdb));
debug && console.log(chalk.cyan("Parametros de conexion: " + JSON.stringify(dbparams)));

localdb.connect(pathdb, [ "formats" ]);

// postgres connection
var string = "postgres://" + dbparams.user + ":" + dbparams.pass + "@" + dbparams.host + ":" + dbparams.port + "/" + dbparams.db;

debug && console.log(chalk.cyan("Cadena de conexion: " + string));

var client = new pg.Client(string);
client.connect(function(err) {
	if(err) {
		return console.log(chalk.red("Error de conexion: ") + err);
	}
	debug && console.log(chalk.cyan("Cliente conectado a postgreSQL"));
	client.end();
});