const orders = {
	asc : "asc",
	desc: "desc" 
}

function sortBy(array, field) {
    return array.sort((a, b) => {
        if (a[field] < b[field]) {
            return -1;
        }
        if (a[field] > b[field]) {
            return 1;
        }
        return 0;
    });
}

exports.sort = function (array, sortOrder, sortField) {
    switch (sortOrder) {
        case orders.asc:
            return sortBy(array, sortField);
            break;
        case orders.desc:
            return sortBy(array, sortField).reverse();
            break;
        default:
            return [];
    }
};


