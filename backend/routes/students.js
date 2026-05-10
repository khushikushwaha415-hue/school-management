const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const auth = require('../middleware/auth');

// Get all students
router.get('/', auth, async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Server error!', error });
  }
});

// Add student
router.post('/', auth, async (req, res) => {
  try {
    const { name, email, rollNumber, class: className, marks, attendance } = req.body;

    const existing = await Student.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Student already exists!' });
    }

    const student = new Student({ name, email, rollNumber, class: className, marks, attendance });
    await student.save();

    res.status(201).json({ message: 'Student added!', student });

  } catch (error) {
    res.status(500).json({ message: 'Server error!', error });
  }
});

// Update student
router.put('/:id', auth, async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'Student updated!', student });
  } catch (error) {
    res.status(500).json({ message: 'Server error!', error });
  }
});

// Delete student
router.delete('/:id', auth, async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: 'Student deleted!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error!', error });
  }
});

module.exports = router;