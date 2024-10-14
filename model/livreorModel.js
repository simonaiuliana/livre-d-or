// Import the necessary database library
const mysql = require('mysql');

// Function to retrieve all messages with pagination
const getAllLivreOr = (db, currentPage = 1, nbPerPage = 3, callback) => {
    const offset = (currentPage - 1) * nbPerPage;
    const sql = `SELECT *, DATE_FORMAT(datemessage, '%d-%m-%Y %H:%i') AS formatted_date 
                 FROM livreor 
                 ORDER BY datemessage DESC 
                 LIMIT ?, ?`;

    db.query(sql, [offset, nbPerPage], (err, results) => {
        if (err) throw err;
        callback(results); // Return the results through a callback function
    });
};

// Function to retrieve the total number of messages
const getNbLivreOr = (db, callback) => {
    const sql = "SELECT COUNT(id) AS nb FROM livreor";

    db.query(sql, (err, result) => {
        if (err) throw err;
        callback(result[0].nb); // Return the result through a callback function
    });
};

// Function to add a new message to the livreor table
const addLivreOr = (db, firstname, lastname, usermail, message, callback) => {
    const sql = "INSERT INTO livreor (usermail, message, firstname, lastname) VALUES (?, ?, ?, ?)";

    // Validate and sanitize inputs
    if (!firstname || !usermail || !message) {
        return callback(new Error("All fields are required"));
    }
    const validEmail = usermail.match(/\S+@\S+\.\S+/);
    if (!validEmail) {
        return callback(new Error("Invalid email address"));
    }

    db.query(sql, [usermail, message, firstname, lastname], (err, result) => {
        if (err) return callback(err);
        callback(null, "Message added successfully!"); // Return success message
    });
};

// Export the functions for use in other files
module.exports = {
    getAllLivreOr,
    getNbLivreOr,
    addLivreOr
};
