const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Database connection
const livreorModel = require('../model/livreorModel');
const { paginationLivreOr } = require('../model/paginationModel');

// Route to get all messages with pagination
router.get('/livreor', (req, res) => {
    const currentPage = parseInt(req.query.page) || 1; // Get current page from query parameters
    const nbPerPage = 3; // Number of items per page

    // Fetch messages from the database
    livreorModel.getAllLivreOr(db, currentPage, nbPerPage, (err, messages) => {
        if (err) return res.status(500).send(err.message); // Handle database errors

        // Get the total number of messages for pagination
        livreorModel.getNbLivreOr(db, (err, count) => {
            if (err) return res.status(500).send(err.message); // Handle database errors

            // Generate pagination links
            const paginationLinks = paginationLivreOr('/livreor', 'page', count, currentPage, nbPerPage);

            // Render the page with messages and pagination links
            // Pass submit_message and submit_status to the view
            res.render('index', { 
                messages, 
                paginationLinks, 
                totalComments: count, 
                submit_message: '', // Set default or actual submit message
                submit_status: '' // Set default or actual submit status
            });
        });
    });
});

// Route to add a message
router.post('/livreor/add', (req, res) => {
    const { firstname, lastname, usermail, message } = req.body;

    livreorModel.addLivreOr(db, firstname, lastname, usermail, message, (err, successMessage) => {
        if (err) {
            // Handle error and set the message and status
            return res.render('index', {
                submit_message: err.message, // Pass the error message
                submit_status: 'error', // Pass an error status
                messages: [], // Optionally clear messages
                paginationLinks: '', // Clear pagination if needed
                totalComments: 0 // Reset total comments
            });
        }
        
        // Redirect to 'livreor' page after a successful submission
        res.redirect('/livreor');
    });
});

module.exports = router;
