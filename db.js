const mongoClient = require("mongodb").MongoClient
mongoClient.connect("mongodb://localhost:27017", {useUnifiedTopology: true})
.then(conn => global.conn = conn.db("workshop"))
.catch(err => console.log(err))

// Método utilizado para listar todos clientes
function findAll(callback){
    global.conn.collection("customers").find({}).toArray(callback);
}
// Método utilizado para Inserir novos clientes
function insert(customer, callback){
    global.conn.collection("customers").insert(customer,callback);
}
// Método utilizado recuperar cliente por id
const ObjectId = require("mongodb").ObjectID;
function findOne(id, callback){
    global.conn.collection("customers").findOne(new ObjectId(id),callback);
}

// Método utilizado para atualizar os dados do cliente
function update(id,customer,callback){    
    global.conn.collection("customers").update({_id: ObjectId(id)},customer,callback);
}
// Método utilizado para apagar os dados de um cliente
function deleteOne(id,callback){    
    global.conn.collection("customers").deleteOne({_id: ObjectId(id)},callback);
}

module.exports = {findAll,insert, findOne, update, deleteOne}