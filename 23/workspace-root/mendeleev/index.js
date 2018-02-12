const elements = {
    'H': {
        name: 'Hydrogenium',
        number: 1,
        weight: 1.0079,
    },
    'NE': {
        name: 'Neon',
        number: 2,
        weight: 4.0026,
    },
    'B': {
        name: 'Borum',
        number: 5,
        weight: 10.811,
    },
    'AR': {
        name: 'Argon',
        number: 18,
        weight: 39.948,
    },
    'K': {
        name: 'Kalium',
        number: 19,
        weight: 39.098,
    }
};

module.exports = (element) => {
    if (!element)
        throw new Error('Element object is undefined');

    return elements[element.toUpperCase()] || null;
};
