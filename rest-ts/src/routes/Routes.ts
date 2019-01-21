import {Request, Response} from "express";
import {EventController} from "../controllers/EventController";
import {check, validationResult} from 'express-validator/check';
import express from "express";

export class Routes {

    public eventController: EventController = new EventController();

    dateCheck = [ check('start').exists({checkNull: true, checkFalsy: true}).withMessage(
        'the parameter start is required! ex: ?start=2019-01-01%200:00'
    )];

    public routes(app: express.Application): void {

        app.get('/', (req: Request, res: Response) => {
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            })
        })

        app.get('/event', this.dateCheck , (req: Request, res: Response) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            this.eventController.getEvents(req, res);
        })

        app.get('/event-vector', this.dateCheck , (req: Request, res: Response) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            this.eventController.getEventsVector(req, res);
        })

        app.get('/event/:id', (req: Request, res: Response) => {
            this.eventController.getEventById(req, res);
        })

        app.post('/notify', (req: Request, res: Response) => {
            this.eventController.handleNotification(req, res);
        })
    }
}
