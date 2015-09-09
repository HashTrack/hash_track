var mongoose = require('mongoose');

// connection string to a new Mongo database
var connectionString = 'mongodb://localhost/hashtrack';

// connect to the database
mongoose.connect(connectionString);

mongoose.connection.on('connected', function() {
	console.log('Database connected to '+ connectionString +'...');
});

mongoose.connection.on('error', function(error) {
	console.log('Error connecting to database at '+ connectionString +' with error: ' + error);
});

mongoose.connection.on('disconnected', function() {
	console.log('Database disconnected from '+ connectionString);
});