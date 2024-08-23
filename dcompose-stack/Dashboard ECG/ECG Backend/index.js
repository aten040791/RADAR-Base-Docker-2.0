const express = require('express');
const app = express();
const port = 5174;
const cors = require('cors');
const medicalTestRouter = require('./medical-test')


// Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/api/medical_tests',medicalTestRouter)


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
