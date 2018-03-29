var builder = require('xmlbuilder');


console.log(xml);


function createUsers(){

    var xml = builder.create('root')
        .ele('xmlbuilder')
        .ele('repo', {'type': 'git'}, 'git://github.com/oozcitak/xmlbuilder-js.git')
        .end({ pretty: true});
}