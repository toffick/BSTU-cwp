const mendeleevStringify = require('mendeleev-stringify');
const fs = require('fs');

module.exports = (fileName) => {
    fs.readFile(fileName, 'utf8', (err, data) => {
        if (err) throw err;

        data.split('\r\n').forEach((val) => {
            try {
                let elementInfo = mendeleevStringify(val);
                console.log(elementInfo);
            }
            catch (e) {
                console.error(e.message);
            }
        });
    });
};
