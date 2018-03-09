const express = require('express');
const compression = require('compression');
const app = express();

app.use(compression({level: 6}));
app.use(express.static(__dirname + '/public'));

app.use((req, res) => {
    res.send('Gigigigi, net resoursa!')
});

app.listen(3000, () => {
    console.log('http server run on 3000 port');
});
