const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = () => {
    MongoClient.connect(
        'mongodb+srv://santhosh_todo_db_user:x1Si8YkVck8X1k18@cluster0-c4wcz.mongodb.net/todo?retryWrites=true&w=majority',
        {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        }
    )
    .then(client => {
        //console.log('Connected');
        _db = client.db();
    })
    .catch(error => {
        console.log(error);
        throw error;
    });
}

const getDb = () => {
    if(_db) {
        return _db;
    }
    throw 'Error connecting data store';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;