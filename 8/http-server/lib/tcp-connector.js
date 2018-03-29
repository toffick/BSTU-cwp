import net from 'net';

export default class Connector {
    constructor(tcpServerConfig){
        this.tcpServerConfig = tcpServerConfig;
        this.client = new net.Socket();
    }

    createSocketConnection(){
        this.client.connect(this.tcpServerConfig, (err) =>{
            if (err) console.error(err);
            else console.log(`Connected to tcp server: ${this.tcpServerConfig.host}:${this.tcpServerConfig.port}`);
        });
    }

    send(data){
        this.client.write(data);
    }

    recieve(cb){
        this.client.on('data', cb);
    }

}
