const mysql = require('mysql');

// Replace 'your_db_user' and 'your_db_password' with your actual MySQL credentials
const db = mysql.createConnection({
    host: 'localhost',               // Host where your MySQL server is running
    user: 'your_db_user',           // Your MySQL username
    password: 'your_db_password',   // Your MySQL password
    database: 'ti2web2024'          // Your database name
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return; // Exit the function if there's an error
    }
    console.log('Connected to the database.');
});

module.exports = db; // Export the database connection for use in other modules