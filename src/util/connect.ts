import mongoose from "mongoose";
import config from "config";
import logger from "./logger";
async function connect(){
    const dbUri = config.get<string>('dbUri');
    try{
        const connection = await mongoose.connect(dbUri);
        logger.info('Connected to the database')
        return connection;
    }catch(err: any){
        logger.error('Could not connect to the database');
        process.exit(1);
    }
}

export default connect; 