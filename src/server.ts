import "reflect-metadata"; 
import initialize from "./shared/aplication/tsyringe";
import express from 'express';
import cors from 'cors';
import createAplicationRouter from "./routes";
import "./database";

const app = express();
 initialize();
app.use(express.json());
app.use(cors({origin:'*'}));
app.use(createAplicationRouter());



app.listen(4020,()=>console.log('server up'));
