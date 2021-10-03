const express = require('express');
const app = express();

const envelopesRouter = express.Router();   // router
app.use('/envelopes', envelopesRouter)

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();       // parser middleware

const envelopes = require('./db');

// function

const getIndexByName = envelope => {                
    const index = envelopes.findIndex((ele) => ele.name === envelope);
    if(index !== -1) return index;
    else return null;
}

const getIndexById = id => {                        
    const index = envelopes.findIndex((ele) => ele.id === id);
    if(index !== -1) return index;
    else return null;
}

const addEnvelope = instance => {
    const newEnvelope = {id: envelopes[envelopes.length-1].id + 1};
    if(instance.name && instance.fund){
       Object.assign(newEnvelope, instance);
        envelopes.push(newEnvelope);
        return newEnvelope; 
    }
    else return null;    
}

const updateEnvelope = instance => {
    const index = getIndexByName(instance.name);
    if(index !== -1 && instance.fund > 0){
        Object.assign(envelopes[index], instance);
        return envelopes[index];
    }
    else return null;
}

// router

envelopesRouter.get('/', (req,res,next) => {                   
    res.send(envelopes);
})

envelopesRouter.get('/name/:name', (req,res,next) => {   
    const index = getIndexByName(req.params.name);
    if(index !== -1){
        const getEnvelope = envelopes[index];
        res.send(getEnvelope);
    }
    else res.status(404).send(`Envelope's name does not exist`);
})

envelopesRouter.get('/id/:id', (req,res,next) => {               
    const index = getIndexById(Number(req.params.id));
    if(index !== -1){
        const getEnvelope = envelopes[index];
        res.send(getEnvelope);
    }
    else res.status(404).send(`Envelope's id does not exist`);
})

envelopesRouter.post('/', jsonParser, (req,res,next) => {
    const newEnvelope = addEnvelope(req.body);
    if(newEnvelope){
        res.status(201).send(newEnvelope); 
    }
    else res.status(400).send('Invalid envelope');
})

envelopesRouter.put('/', jsonParser, (req,res,next) => {
    const updatedEnvelope = updateEnvelope(req.body);
    if(updatedEnvelope){
        res.send(updatedEnvelope);
    }
    else res.status(404).send(`Envelope's name does not exist`);
})
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on PORT:${PORT}`);
})