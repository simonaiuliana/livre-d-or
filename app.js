const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const livreorRoutes = require('./routes/livreorRoutes'); // Import the routes
const app = express();
const PORT = process.env.PORT || 3000;

// Set up body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Use the livreor routes
app.use('/', livreorRoutes);

// Define routes
app.get('/', (req, res) => {
    res.render('index'); // Render the 'index.ejs' view
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
