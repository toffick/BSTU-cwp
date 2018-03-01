const express = require('express');
const app = express();
var compression = require('compression');

app.use(compression({level: 6}));
app.use(express.static(__dirname + '/public'));

app.use((req, res) => {
    res.send('Gigigigi, net resoursa!')
});

app.listen(3000, () => {
    console.log('http server run on 3000 port');
});
