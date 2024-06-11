import { RequestHandler,  } from 'express';
import MarsRoverService from "../services/MarsRoverService";

export const exploreMars:RequestHandler = (req, res, next) => {
    const input:string = req.body;

    if (!input) {
        return res.status(400).send('Input data is required');
    }

    try {
        const service = new MarsRoverService(input);
        res.status(200).json(service.exploreMars());
    } catch (error) {
        res.status(500).json(error.message);
    }
};