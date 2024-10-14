const getAllLivreOr = (db, currentPage, nbPerPage, callback) => {
    const offset = (currentPage - 1) * nbPerPage;
    db.query('SELECT * FROM messages LIMIT ?, ?', [offset, nbPerPage], (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
};

const getNbLivreOr = (db, callback) => {
    db.query('SELECT COUNT(*) AS count FROM messages', (err, results) => {
        if (err) return callback(err);
        callback(null, results[0].count);
    });
};

const addLivreOr = (db, firstname, lastname, usermail, message, callback) => {
    db.query('INSERT INTO messages (firstname, lastname, usermail, message) VALUES (?, ?, ?, ?)', [firstname, lastname, usermail, message], (err, results) => {
        if (err) return callback(err);
        callback(null, 'Message ajouté avec succès');
    });
};

module.exports = {
    getAllLivreOr,
    getNbLivreOr,
    addLivreOr,
};
