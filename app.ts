import { Server } from "@overnightjs/core";
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Db } from "./db";

import * as controllers from './src/controllers';

export default class App extends Server {

    constructor() {
        super();
        this.corsPolicy();
        this.middleWare();
        Db.connect();
        this.loadControllers();
    }

    private corsPolicy() {
        express.Router()
        this.app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE,OPTIONS");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, user, authorization");
            next();
        });
    }

    private middleWare() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
    } 

    private loadControllers() {
        const controllerInstances = [];
        for (const name of Object.keys(controllers)) {
            const controller = (controllers as any)[name];
            if (typeof controller === 'function') {
                controllerInstances.push(new controller());
            }
        }
        this.addControllers(controllerInstances, undefined);
    }

    public start() {

        this.app.get('/', function (req, res) {
            res.send('<h1>Hey.... Hello Leeway...!<h1>');
        });

        this.app.listen(process.env.PORT || 5000, () => {
            console.log("server start at port :" + 5000);
        })
    }
}