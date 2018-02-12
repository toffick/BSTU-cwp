const mendeleev = require('mendeleev');

module.exports = (element) => {
    let elementInfoObject = mendeleev(element);

    if (!elementInfoObject)
        throw new Error('Element does not exist');

    return `${elementInfoObject.number}. ${elementInfoObject.name} / ${elementInfoObject.weight}`;
};