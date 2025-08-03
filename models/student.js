// models/student.js

const Database = require('sqlite');
const path = require('path');
const dbPath = path.resolve(__dirname, '../data/students.db');
let db;

// Initialize and open the database
Database.open(dbPath).then(database => {
  db = database;
  return db.run(`CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER NOT NULL,
    grade TEXT NOT NULL
  )`);
});
class Student {
  static async getAll(callback) {
    try {
      const rows = await db.all('SELECT * FROM students');
      callback(null, rows);
    } catch (err) {
      callback(err);
    }
  }

  static async getById(id, callback) {
    try {
      const row = await db.get('SELECT * FROM students WHERE id = ?', id);
      callback(null, row);
    } catch (err) {
      callback(err);
    }
  }

  static async create(data, callback) {
    try {
      const { name, age, grade } = data;
      const result = await db.run('INSERT INTO students (name, age, grade) VALUES (?, ?, ?)', name, age, grade);
      const row = await db.get('SELECT * FROM students WHERE id = ?', result.lastID);
      callback(null, row);
    } catch (err) {
      callback(err);
    }
  }

  static async update(id, data, callback) {
    try {
      const { name, age, grade } = data;
      await db.run('UPDATE students SET name = ?, age = ?, grade = ? WHERE id = ?', name, age, grade, id);
      const row = await db.get('SELECT * FROM students WHERE id = ?', id);
      callback(null, row);
    } catch (err) {
      callback(err);
    }
  }

  static async delete(id, callback) {
    try {
      await db.run('DELETE FROM students WHERE id = ?', id);
      callback(null, { deletedID: id });
    } catch (err) {
      callback(err);
    }
  }
}

module.exports = Student;
