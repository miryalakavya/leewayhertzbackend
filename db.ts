import * as mongoose from 'mongoose';

export class Db {

    public static connect() {
        let dbUrl = 'mongodb+srv://leeway-backend:leeway@cluster0.dh9bz.mongodb.net/test?retryWrites=true&w=majority',
            opts = {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                autoReconnect: true,
                reconnectInterval: 5000,
                reconnectTries: Number.MAX_VALUE
            };


        return new Promise(async resolve => {
            try {
                mongoose.connection.on('connected', () => { console.info('Db connected'); });
                mongoose.connection.on('close', () => { console.error('lost Db connection'); });
                mongoose.connection.on('reconnected', () => { console.info('Db reconnected'); });
                mongoose.connection.on('error', () => { console.error('Db connection error'); });
                await mongoose.connect(dbUrl, opts);
                resolve();
            } catch (err) {
                console.debug('Error while db connection ' + JSON.stringify(err));
            }

        });
    }
}