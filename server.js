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

app.get('/',(req,res,next) => {                   
    res.send(envelopes);
})

app.listen(PORT, () => {
    console.log(`Server is listening on PORT:${PORT}`);
})