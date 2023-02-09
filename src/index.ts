import bodyParser from 'body-parser';
import express, { Request, Response, NextFunction } from 'express';
import { Logger } from 'tslog';
import mongoose from 'mongoose';
import { ResponseError } from './shared/defs';

import authsRoutes from './auth/route';
import devicesRoutes from './device/route';

const logger = new Logger();
global.logger = logger;

const app = express();
app.use(bodyParser.json({ limit: '20mb' }));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    global.logger.info(req.url);
    next();
});

app.use(authsRoutes);
app.use(devicesRoutes);

if (process.env.SWAGGER === 'true') {
    const swaggerUi = require('swagger-ui-express');
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(require('../swagger.json')));
}

app.use((err: ResponseError, req: Request, res: Response, next: NextFunction) => {
    global.logger.error(err.message);
    res.status(err?.status || 500).json({error:  err.message || 'Internal error'});
    next();
});

process
    .on('unhandledRejection', (reason, p) => {
        global.logger.error(reason, 'Unhandled Rejection at Promise', p);
    })
    .on('uncaughtException', err => {
        global.logger.error(err, 'Uncaught Exception thrown');
    });

mongoose.set('strictQuery', false);

mongoose.connect(process.env.DB_URL)
    .then(() => global.logger.info('Connected to DB'));

    console.log('TETS')
const port = +process.env.PORT;
app.listen(port, async () => {
    global.logger.info(`Standard-backend API started on port ${port}`);
});
