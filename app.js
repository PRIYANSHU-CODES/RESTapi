const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const app = express();



app.use(bodyParser.json());


app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});


app.post('/bfhl', (req, res) => {
    try {

        const { data } = req.body;

        const alphabets = data.filter(item => typeof item === 'string' && item.length === 1);
        const numbers = data.filter(item => typeof item === 'number');


        const highestAlphabet = alphabets.length > 0 ? String.fromCharCode(
            Math.max(...alphabets.map(char => char.charCodeAt(0)).map(code => code > 96 ? code - 32 : code))
        ) : '';


        const response = {
            is_success: true,
            user_id: 'pk1717',
            email: 'pk1717@srmist.edu.in',
            roll_number: 'RA2011003030145',
            numbers,
            alphabets,
            highest_alphabet: [highestAlphabet],
        };

        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error : Server Crashed' });
    }
});




app.listen(port, () => {
    console.log(`Endpoint running on  ${port}`);
});