const express = require('express')
const router = express.Router()
const pool = require('./core/database');
const {upload} = require('./core/storage');
const readCSVFile = require('./utils/fileStorage');
const fs = require('fs')

// Create a new medical test
router.post('/', upload.single('ecg'), async (req, res) => {
    const { time_of_test, notes, subject_id } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO medical_tests (time_of_test, notes, ecg, subject_id) VALUES ($1, $2, $3, $4) RETURNING *',
            [time_of_test, notes, req.file.filename, subject_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Get all medical tests
router.get('/subject_id/:subject_id', async (req, res) => {
    const { subject_id } = req.params
    try {
        const result = await pool.query('SELECT * FROM medical_tests WHERE subject_id = ' + subject_id);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Get a single medical test by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM medical_tests WHERE test_id = $1', [id]);

        if (result.rows.length === 0) {
            return res.status(404).send('Test not found');
        }
        
        const ecgData = await readCSVFile(result.rows[0].ecg)
        
        res.status(200).json({
            ...result.rows[0],
            ecgData: ecgData.map((item,index) => ({
                x: index,
                y: item.y
            }))
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Update a medical test by ID
router.put('/:id',upload.single('ecg'), async (req, res) => {
    const { id } = req.params;
    const { time_of_test, notes } = req.body;
    const updateArgs = {};
    try {
        if (req.file) {
            updateArgs.ecg = req.file.filename
        }

        if (notes) {
            updateArgs.notes = notes
        }

        updateArgs.time_of_test = time_of_test        
        const updates = Object.entries(updateArgs)
        .filter(([key, value]) => value !== undefined && value !== null && value !== '')
        .map(([key, value]) => `${key} = '${value}'`)
        .join(', ');

        const result = await pool.query(
            `UPDATE medical_tests SET ${updates} WHERE test_id = ${id} RETURNING *`,
        );
        if (result.rows.length === 0) {
            return res.status(404).send('Test not found');
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Delete a medical test by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const oldRecord = await pool.query('SELECT * FROM medical_tests WHERE test_id = $1', [id]);
        const recordWantsDelete = result.rows[0]

        const result = await pool.query('DELETE FROM medical_tests WHERE test_id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).send('Test not found');
        }
        fs.unlink(`./storage/${recordWantsDelete.ecg}`, (err) => {
            if (err) {
                console.error(`Error deleting the file: ${err.message}`);
            }
        });       
        res.status(200).send('Test deleted successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router