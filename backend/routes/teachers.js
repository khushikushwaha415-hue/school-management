const express = require('express');
const router = express.Router();
const Teacher = require('../models/Teacher');
const auth = require('../middleware/auth');

// Get all teachers
router.get('/', auth, async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ message: 'Server error!', error });
  }
});

// Add teacher
router.post('/', auth, async (req, res) => {
  try {
    const { name, email, subject, phone } = req.body;

    const existing = await Teacher.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Teacher already exists!' });
    }

    const teacher = new Teacher({ name, email, subject, phone });
    await teacher.save();

    res.status(201).json({ message: 'Teacher added!', teacher });

  } catch (error) {
    res.status(500).json({ message: 'Server error!', error });
  }
});

// Update teacher
router.put('/:id', auth, async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'Teacher updated!', teacher });
  } catch (error) {
    res.status(500).json({ message: 'Server error!', error });
  }
});

// Delete teacher
router.delete('/:id', auth, async (req, res) => {
  try {
    await Teacher.findByIdAndDelete(req.params.id);
    res.json({ message: 'Teacher deleted!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error!', error });
  }
});

module.exports = router;