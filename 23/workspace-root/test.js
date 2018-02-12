const mendeleevMaster = require('mendeleev-master');
const fileName = './elements.txt';

((file) => {
    try {
        mendeleevMaster(file)
    } catch (e) {
        console.log(e.message);
    }
})(fileName);
