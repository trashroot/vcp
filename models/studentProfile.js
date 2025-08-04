// models/studentProfile.js

const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const dbPath = path.resolve(__dirname, '../data/students.db');
const db = new sqlite3.Database(dbPath);

class StudentProfile {
  static updateProfile(id, profileData, callback) {
    const fields = [];
    const values = [];
    // Only allow updating name, age, grade for now
    if (profileData.name) {
      fields.push('name = ?');
      values.push(profileData.name);
    }
    if (profileData.age) {
      fields.push('age = ?');
      values.push(profileData.age);
    }
    if (profileData.grade) {
      fields.push('grade = ?');
      values.push(profileData.grade);
    }
    if (fields.length === 0) {
      return callback(new Error('No valid fields to update'));
    }
    values.push(id);
    const sql = `UPDATE students SET ${fields.join(', ')} WHERE id = ?`;
    db.run(sql, values, function (err) {
      if (err) return callback(err);
      db.get('SELECT * FROM students WHERE id = ?', [id], (err, row) => {
        callback(err, row);
      });
    });
  }
}

module.exports = StudentProfile;
