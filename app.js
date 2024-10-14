const express = require('express');
const app = express();
const db = require('./config/db'); // Database connection
const livreorRouter = require('./routes/livreorRoutes'); // Update the path as necessary

app.use(express.urlencoded({ extended: true })); // Middleware for form submissions
app.use(express.json()); // Middleware for JSON bodies

// Use the router
app.use('/livreor', livreorRouter);

// Handle 404 errors
app.use((req, res) => {
    res.status(404).send('Page Not Found');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
