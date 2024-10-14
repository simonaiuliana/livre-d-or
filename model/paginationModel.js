function paginationLivreOr(url, getName, nbTotalItem, currentPage = 1, nbByPage = 10) {
    // If no items, return null
    if (nbTotalItem === 0) return null;

    // Initialize output variable
    let output = "";

    // Calculate the total number of pages
    const nbPage = Math.ceil(nbTotalItem / nbByPage);

    // If only one page, return null
    if (nbPage < 2) return null;

    // Previous button
    if (currentPage === 1) {
        output += "<< <"; // No links
    } else {
        // Links to home and previous page
        output += `<a href='${url}?&${getName}=1'>&lt;&lt;</a> <a href='${url}?&${getName}=${currentPage - 1}'>&lt;</a>`;
    }

    // Loop through the number of pages
    for (let i = 1; i <= nbPage; i++) {
        // If on the current page, display text
        if (i === currentPage) {
            output += ` ${i} `;
        } else {
            // Otherwise, display a link
            output += ` <a href='${url}?&${getName}=${i}'>${i}</a> `;
        }
    }

    // Next button
    output += currentPage === nbPage 
        ? "> >>" 
        : `<a href='${url}?&${getName}=${currentPage + 1}'>></a> <a href='${url}?&${getName}=${nbPage}'>>></a>`;

    return output;
}

// Export the function (CommonJS module syntax)
module.exports = { paginationLivreOr };