import express from "express";
import config from "config";
import schema from "./schema/schema";
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from "body-parser";
import {ApolloServer} from "apollo-server-express";


const PORT = config.get('port') || 5001;
const app = express();

app.use(cors());

async function db_start() {
    try {
        await mongoose.connect('mongodb://db:27017/booking', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
    } catch (e) {
        console.log("Server Error", e.message);
        process.exit(1);
    }
}

db_start();

app.use(bodyParser.json({limit: '10mb'}));
const server = new ApolloServer({ schema });
server.applyMiddleware({ app, path: '/graphql'});



app.listen(PORT, () =>{
    console.info(`Server started on port ${PORT}`);
});

