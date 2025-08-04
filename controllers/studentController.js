const logger = require('../logger');
const Student = require('../models/student');
const StudentProfile = require('../models/studentProfile');

// Update student profile details
exports.updateStudentProfile = (req, res) => {
  const id = parseInt(req.params.id);
  logger.info(`Updating profile for student with id ${id}`);
  StudentProfile.updateProfile(id, req.body, (err, student) => {
    if (err) {
      logger.error(`Database error while updating profile for student id ${id}`);
      return res.status(500).json({ error: 'Database error' });
    }
    if (!student) {
      logger.warn(`Student not found for profile update with id ${id}`);
      return res.status(404).json({ error: 'Student not found' });
    }
    logger.info(`Student profile updated with id ${id}`);
    res.json(student);
  });
};


exports.getAllStudents = (req, res) => {
  logger.info('Fetching all students');
  Student.getAll((err, students) => {
    if (err) {
      logger.error('Database error while fetching all students');
      return res.status(500).json({ error: 'Database error' });
    }
    logger.info('Successfully fetched all students');
    res.json(students);
  });
};


exports.getStudentById = (req, res) => {
  const id = parseInt(req.params.id);
  logger.info(`Fetching student with id ${id}`);
  Student.getById(id, (err, student) => {
    if (err) {
      logger.error(`Database error while fetching student id ${id}`);
      return res.status(500).json({ error: 'Database error' });
    }
    if (!student) {
      logger.warn(`Student not found with id ${id}`);
      return res.status(404).json({ error: 'Student not found' });
    }
    logger.info(`Successfully fetched student with id ${id}`);
    res.json(student);
  });
};


exports.createStudent = (req, res) => {
  const { name, age, grade } = req.body;
  logger.info('Creating a new student');
  if (!name || !age || !grade) {
    logger.warn('Missing required fields for student creation');
    return res.status(400).json({ error: 'Name, age, and grade are required' });
  }
  Student.create({ name, age, grade }, (err, student) => {
    if (err) {
      logger.error('Database error while creating student');
      return res.status(500).json({ error: 'Database error' });
    }
    logger.info(`Student created with id ${student.id}`);
    res.status(201).json(student);
  });
};


exports.updateStudent = (req, res) => {
  const id = parseInt(req.params.id);
  logger.info(`Updating student with id ${id}`);
  Student.update(id, req.body, (err, student) => {
    if (err) {
      logger.error(`Database error while updating student id ${id}`);
      return res.status(500).json({ error: 'Database error' });
    }
    if (!student) {
      logger.warn(`Student not found for update with id ${id}`);
      return res.status(404).json({ error: 'Student not found' });
    }
    logger.info(`Student updated with id ${id}`);
    res.json(student);
  });
};


exports.deleteStudent = (req, res) => {
  const id = parseInt(req.params.id);
  logger.info(`Deleting student with id ${id}`);
  Student.delete(id, (err, success) => {
    if (err) {
      logger.error(`Database error while deleting student id ${id}`);
      return res.status(500).json({ error: 'Database error' });
    }
    if (!success) {
      logger.warn(`Student not found for deletion with id ${id}`);
      return res.status(404).json({ error: 'Student not found' });
    }
    logger.info(`Student deleted with id ${id}`);
    res.status(204).send();
  });
};
