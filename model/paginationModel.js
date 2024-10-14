function paginationLivreOr(basePath, paramName, totalItems, currentPage, itemsPerPage) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    let links = '';

    for (let page = 1; page <= totalPages; page++) {
        if (page === currentPage) {
            links += `<strong>${page}</strong> `;
        } else {
            links += `<a href="${basePath}?${paramName}=${page}">${page}</a> `;
        }
    }

    return links;
}

module.exports = { paginationLivreOr };
