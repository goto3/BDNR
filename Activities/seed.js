const config = require("config");
const MongoClient = require("mongodb").MongoClient;
const fs = require("fs");

const filePath = config.statesFilePath ?? "./lib/seed/states.json";
const DB_URL = config.get("dbURL");
const DB = config.get("db");

var _db;

var states = [];
var zones = [];

(async () => {
	let data = [];
	try {
		data = require(filePath);
	} catch (ex) {
		console.log(`\nERROR: No file found on path ${filePath}. Generating states and saving file...`);
		data = generateData();
	}
	parseData(data);
	await connectDB();
	await saveStates(states);
	await saveZones(zones);
})();

function parseData(data) {
	data.forEach((s) => {
		for (var i = 1; i < 100; i++) {
			zones.push({ State: s.Code, Code: i, Name: `Zona ${i}`, Vacunatorios: [] });
		}
		states.push(s);
	});
}

async function connectDB() {
	_db = (await MongoClient.connect(DB_URL, { useUnifiedTopology: true })).db(DB);
	try {
		_db.dropDatabase();
	} catch (ex) {}
}

async function saveStates(states) {
	_db.collection("states").insertMany(states, function (err, res) {
		if (err) throw err;
		console.log(`\n====> Successfully inserted ${res.insertedCount} states into the database.`);
	});
}

async function saveZones(zones) {
	_db.collection("zones").insertMany(zones, function (err, res) {
		if (err) throw err;
		console.log(`\n====> Successfully inserted ${res.insertedCount} zones into the database.`);
		process.exit(0);
	});
}

function generateData() {
	const generatedStates = [];
	generatedStates.push({ Code: 1, Name: "Montevideo" });
	generatedStates.push({ Code: 2, Name: "Artigas" });
	generatedStates.push({ Code: 3, Name: "Canelones" });
	generatedStates.push({ Code: 4, Name: "Cerro Largo" });
	generatedStates.push({ Code: 5, Name: "Colonia" });
	generatedStates.push({ Code: 6, Name: "Durazno" });
	generatedStates.push({ Code: 7, Name: "Flores" });
	generatedStates.push({ Code: 8, Name: "Florida" });
	generatedStates.push({ Code: 9, Name: "Lavalleja" });
	generatedStates.push({ Code: 10, Name: "Maldonado" });
	generatedStates.push({ Code: 11, Name: "Paysandu" });
	generatedStates.push({ Code: 12, Name: "Rio Negro" });
	generatedStates.push({ Code: 13, Name: "Rivera" });
	generatedStates.push({ Code: 14, Name: "Rocha" });
	generatedStates.push({ Code: 15, Name: "Salto" });
	generatedStates.push({ Code: 16, Name: "San Jose" });
	generatedStates.push({ Code: 17, Name: "Soriano" });
	generatedStates.push({ Code: 18, Name: "Tacuarembo" });
	generatedStates.push({ Code: 19, Name: "Treinta y Tres" });
	generatedStates.forEach((s) => {
		s.Zones = [];
		for (var i = 1; i < 100; i++) {
			s.Zones.push(i);
		}
	});

	let data = JSON.stringify(generatedStates, null, 2);
	fs.writeFileSync(filePath, data);
	return generatedStates;
}
