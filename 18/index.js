import Logger from './logger/logger.js'
import ConsoleLogger from './logger/console-logger';
import FileleLogger from './logger/file-logger';
import DeferredFileLogger from './logger/deffered-file-logger';
import fs from 'fs';


(async () =>{
    let logger = new Logger();
    let consoleLogger = new ConsoleLogger('pref', ConsoleLogger.LEVEL.INFO, 'YY-M-D, h:m:s a');
    let fileLogger1 = new FileleLogger('file1.log', 'file_log', Logger.LEVEL.ERROR, 'YYYY-MM-D, h a');
    let fileLogger2 = new FileleLogger(fs.createWriteStream('file2.log'));
    let deferredFileLogger1 = new DeferredFileLogger('file3.log',3);

//1
    console.log(logger.format("loggerMessage", Logger.LEVEL.INFO));

//2
    consoleLogger.log("message", ConsoleLogger.LEVEL.ERROR);
    consoleLogger.log("message", ConsoleLogger.LEVEL.LOG);
    consoleLogger.log("message", ConsoleLogger.LEVEL.INFO);
    consoleLogger.log("message", ConsoleLogger.LEVEL.ER);

//3
     fileLogger1.log("mes1");
     fileLogger1.log("mes2");
     fileLogger2.log("mes3");
     fileLogger2.log("mes4");


//4
     deferredFileLogger1.log('aa');
     deferredFileLogger1.log('bb');
     deferredFileLogger1.log('cc');
     deferredFileLogger1.log('dd');
     deferredFileLogger1.log('ee');
    // deferredFileLogger1.log('ff');


    //....
    fileLogger1.close();
    fileLogger2.close();
    deferredFileLogger1.close();

})();

