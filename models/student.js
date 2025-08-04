// ...existing code...
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
    Student.getById(id, (err, student) => {
      if (err || !student) return callback(err, null);
      const name = data.name ?? student.name;
      const age = data.age ?? student.age;
      const grade = data.grade ?? student.grade;
      db.run(
        'UPDATE students SET name = ?, age = ?, grade = ? WHERE id = ?',
        [name, age, grade, id],
        function (err) {
          if (err) return callback(err, null);
          Student.getById(id, callback);
        }
      );
    });
  }

  static delete(id, callback) {
    db.run('DELETE FROM students WHERE id = ?', [id], function (err) {
      if (err) return callback(err, false);
      callback(null, this.changes > 0);
    });
  }
}

module.exports = Student;
