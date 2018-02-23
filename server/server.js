const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var data = require('./zip');
const jsonParser = bodyParser.json();
app.use(express.static('build'));
app.use(jsonParser);

const port = process.env.PORT || 8080;

const calcDistance = (placeOne, placeTwo) => {
    const radius = 3963.1676;
    const distanceLat = deg2rad(placeTwo.Lat - placeOne.Lat);
    const distanceLong = deg2rad(placeTwo.Long - placeOne.Long);
    const equation = Math.sin(distanceLat / 2) * Math.sin(distanceLat / 2) +
        Math.cos(deg2rad(placeOne.Lat)) * Math.cos(deg2rad(placeTwo.Lat)) *
        Math.sin(distanceLong / 2) * Math.sin(distanceLong / 2);
    const calc = 2 * Math.atan2(Math.sqrt(equation), Math.sqrt(1 - equation));
    const d = radius * calc;
    return d.toFixed(2);
}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}

app.post('/api/zip', (req, res) => {

    let object = {
        zipOne: {},
        zipTwo: {}
    }
    let zipOneIndex = 0;
    let zipTwoIndex = 0;

    for (let i = data.zips.length - 1; i >= 0; i--) {
        if (data.zips[i].Zipcode === req.body.zipOne) {
            zipOneIndex = i;
        } else {
            object.zipOne = {
                message: 'zipcode not found'
            }
        }
    }

    for (let i = data.zips.length - 1; i >= 0; i--) {
        if (data.zips[i].Zipcode === req.body.zipTwo) {
            zipTwoIndex = i;
        } else {
            object.zipTwo = {
                message: 'zipcode not found'
            }
        }
    }

    object.zipOne = data.zips[zipOneIndex];
    object.zipTwo = data.zips[zipTwoIndex];

    object.distance = calcDistance(object.zipOne, object.zipTwo);

    res.send(object);
})

app.listen(port, () => {
    console.log(`Server Listening on PORT:${port}`);
});