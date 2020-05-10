const mongodb = require('mongodb')
const mongoClient = require('../util/db');

const TasksClass = class Task {
  constructor(title, id_user, created_at, status = "open") {
    this.title = title;
    this.id_user = id_user;
    this.created_at = created_at;
    this.status = status;
  }

  save(callback) {
    const db = mongoClient.getDb();
    db.collection('tasks')
      .insertOne(this)
      .then(result => {
        console.log(result);
        callback(result);
      })
      .catch( err => {
        console.log(err);
        callback(false);
      });
  }

  static fetchAll(idUser, start = 0, limit = 10, callback) {
    const db = mongoClient.getDb();
    db.collection('tasks')
      .find({"id_user": parseInt(idUser)})
      .skip(parseInt(start))
      .limit(parseInt(limit))
      .toArray()
      .then(result => {
        callback(result);
      })
      .catch(error => {
        console.log(error);
        callback(false);
      })
  }

  static findById(idUser, idTask, callback) {
    const db = mongoClient.getDb();
    const taskId = new mongodb.ObjectID(idTask);
    db.collection('tasks')
      .find({"_id": taskId, "id_user": parseInt(idUser)})
      .toArray()
      .then(result => {
        callback(result);
      })
      .catch(error => {
        console.log(error);
        callback(false);
      })
  }

  static delete(idUser, idTask, callback) {
    const db = mongoClient.getDb();
    const taskId = new mongodb.ObjectID(idTask);
    db.collection('tasks')
      .deleteOne({"_id": taskId, "id_user": parseInt(idUser)})
      .then(result => {
        callback(true);
      })
      .catch(error => {
        console.log(error);
        callback(false);
      })
  }

  static modify(idUser, idTask, title, status, callback) {
    const db = mongoClient.getDb();
    const taskId = new mongodb.ObjectID(idTask);
    db.collection('tasks')
      .update({"_id": taskId, "id_user": parseInt(idUser)}, {$set:{"title": title, "status": status}})
      .then(result => {
        console.log(result);
        callback(result);
      })
      .catch(error => {
        console.log(error);
        callback(false);
      })
  }

};

module.exports = TasksClass;
