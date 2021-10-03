const express = require('express');
const app = express();

const envelopesRouter = express.Router();   // router
app.use('/envelopes', envelopesRouter)

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();       // parser middleware

const envelopes = require('./db');

const getIndexByName = envelope => {                
    const index = envelopes.findIndex((ele) => ele.name === envelope);
    return index;
}

const getIndexById = id => {                        
    const index = envelopes.findIndex((ele) => ele.id === id);
    return index;
}

const addEnvelope = instance => {
    const newEnvelope = {id: envelopes[envelopes.length-1].id + 1};
    Object.assign(newEnvelope, instance);
    envelopes.push(newEnvelope);
    return newEnvelope;
}

envelopesRouter.get('/', (req,res,next) => {                   
    res.send(envelopes);
})

envelopesRouter.get('/name/:name', (req,res,next) => {   
    const index = getIndexByName(req.params.name);
    const getEnvelope = envelopes[index];
    res.send(getEnvelope);
})

envelopesRouter.get('/id/:id', (req,res,next) => {               
    const index = getIndexById(Number(req.params.id));
    const getEnvelope = envelopes[index];
    res.send(getEnvelope);
})

envelopesRouter.post('/', jsonParser, (req,res,next) => {
    const newEnvelope = addEnvelope(req.body);
    res.status(201).send(newEnvelope);
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on PORT:${PORT}`);
})