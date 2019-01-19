// src/app.ts
import express from "express";
import morgan from "morgan"
import * as bodyParser from "body-parser";
import {Routes} from './routes/Routes';
import mongoose from 'mongoose';

import fs from "fs";
import path from "path";

class App {

    public app: express.Application;


    public routePrv: Routes = new Routes();

    constructor() {
        this.app = express();
        this.config();
        this.routePrv.routes(this.app);
        mongoose.connect('mongodb://localhost/salsa-events', { useNewUrlParser: true });
    }

    private config(): void{
        console.log("this.app.get('env'): " + process.env.NODE_ENV);
        if (process.env.NODE_ENV === 'production') {
            let accessLogStream = fs.createWriteStream(path.join('/var/log/', 'rest-access.log'), { flags: 'a' })
            this.app.use(morgan('combined', { stream: accessLogStream }))
        } else {
            this.app.use(morgan('dev'));
        }

        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

}

export default new App().app;
