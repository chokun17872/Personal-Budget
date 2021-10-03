const express = require('express');
const app = express();
const PORT = 3000;
const budget = 10000;
const envelopes = [
    {
        id: 1,
        name: 'food',
        fund : 3500
    },
    {
        id: 2,
        name: 'education',
        fund: 2500
    },
    {
        id: 3,
        name: 'transportation',
        fund : 1500
    },
    {
        id: 4,
        name: 'videoGames',
        fund : 1500
    },
    {
        id: 5,
        name: 'utilities',
        fund: 1000
    }
];

const getIndexByName = envelope => {                
    const index = envelopes.findIndex((ele) => ele.name === envelope);
    return index;
}

const getIndexById = id => {                        
    const index = envelopes.findIndex((ele) => ele.id === id);
    return index;
}

const addEnvelope = (envelope,fund) => {          
    const newEnvelope = {
        id: envelopes[envelopes.length-1].id + 1,
        name: envelope,
        fund: fund
    };
    envelopes.push(newEnvelope);
    return newEnvelope;
}

app.get('/',(req,res,next) => {                   
    res.send(envelopes);
})

app.get('/envelope/:envelope',(req,res,next) => {   // passed
    const index = getIndexByName(req.params.envelope);
    const getEnvelope = envelopes[index];
    res.send(getEnvelope);
})

app.listen(PORT, () => {
    console.log(`Server is listening on PORT:${PORT}`);
})