import {model} from "mongoose";
import {EventSchema} from "../model/Event";
import { Request, Response } from 'express';
import morgan from "morgan";
import {format} from 'date-fns';
import deLocale from 'date-fns/locale/de';
let logger = morgan('combined')


const  Event =  model('v_events', EventSchema);

let MongoQuery = require('mongo-querystring');

let mqs = new MongoQuery();

interface Query {
    start?: string;
    type?: string;
    status?: string;
    eventSubType?: string;
}

export class EventController{


    public getEvents(req: Request, res: Response){
        let query: Query = {};
        let projection = {};
        console.log(req.query);
            mqs.customBetween('start')(query, `${req.query.start}|${req.query.end}`);
            if (req.query.type) {
                query.type = req.query.type;
            }
            if (req.query.eventSubType) {
                query.eventSubType = req.query.eventSubType;
            }
            if (req.query.short){
                projection = {description: 0};
            }
        console.log(query);
        Event.find(query, projection, (err, events) => {
            if(err){
                res.send(err);
            }
            res.json(events);
        }).sort({start: 1});
    }

    public getEventsVector(req: Request, res: Response){
        let query: Query = {};
        let projection = {};
        console.log(req.query);
        mqs.customBetween('start')(query, `${req.query.start}|${req.query.end}`);
        if (req.query.type) {
            query.type = req.query.type;
        }
        if (req.query.eventSubType) {
            query.eventSubType = req.query.eventSubType;
        }
        query.status = 'confirmed';
        console.log(query);
        Event.find(query, {start: 1, _id: 0}, (err, events) => {
            if(err){
                res.send(err);
            }
            const z: any = {};

            events.forEach(e => {
                const d:string = format(e.get('start'), 'M-D', {locale: deLocale});
                z[d] = z[d] ? z[d] + 1 : 1;
            })
            res.json(z);
        }).sort({start: 1});
    }

    public getEventById(req: Request, res: Response){
        const id = req.params['id'];
        console.log('id:' + id);
        Event.find({_id: id},(err, events) => {
            if(err){
                res.send(err);
            }
            res.json(events);
        });
    }

    public handleNotification(req: Request, res: Response){

    }
}
