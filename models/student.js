// models/student.js

const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, '../data/students.db');
const db = new sqlite3.Database(dbPath);

// Initialize table
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER NOT NULL,
    grade TEXT NOT NULL
  )`);
});
class Student {
  static getAll(callback) {
    db.all('SELECT * FROM students', [], (err, rows) => {
      callback(err, rows);
    });
  }

  static getById(id, callback) {
    db.get('SELECT * FROM students WHERE id = ?', [id], (err, row) => {
      callback(err, row);
    });
  }

  static create(data, callback) {
    const { name, age, grade } = data;
    db.run(
      'INSERT INTO students (name, age, grade) VALUES (?, ?, ?)',
      [name, age, grade],
      function (err) {
        if (err) return callback(err);
        db.get('SELECT * FROM students WHERE id = ?', [this.lastID], (err, row) => {
          callback(err, row);
        });
      }
    );
  }

  static update(id, data, callback) {
    const { name, age, grade } = data;
    db.run(
      'UPDATE students SET name = ?, age = ?, grade = ? WHERE id = ?',
      [name, age, grade, id],
      function (err) {
        if (err) return callback(err);
        db.get('SELECT * FROM students WHERE id = ?', [id], (err, row) => {
          callback(err, row);
        });
      }
    );
  }

  static delete(id, callback) {
    db.run('DELETE FROM students WHERE id = ?', [id], function (err) {
      callback(err, { deletedID: id });
    });
  }
}

module.exports = Student;
