const cool = require('cool-ascii-faces')
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000  //Environment variables
const app = express();

//main app
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('pages/index'))
app.get('/cool', (req, res) => res.send(cool()))

//Team wk9 Math function (doMath)
app.get('/math', function (req, res) {
    var number1 = req.query.number1
    var number2 = req.query.number2
    var operand = req.query.operand
    var result = doMath(number1, number2, operand)
    var params = {
        number1: number1, number2: number2, operand: operand, result: result
    }
    res.render('pages/team/viewing', params)
})
//Team wk9 ajax funtions (math.js)
app.get('/math_service', function (req, res) {
    var number1 = req.query.number1;
    var number2 = req.query.number2;
    var operand = req.query.operand;
    var result = {result: doMath(number1, number2, operand)};
    var stringify = JSON.stringify(result);
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(stringify);
    res.end();

});

//Prove wk9 mail functions (doMailMath)
app.get('/mail', function (req, res) {
    var weight = req.query.weight
    var types = req.query.types
    var result = doMailMath(weight, types)

    var params = {
        weight: weight, types: types, result: result
    }
    res.render('pages/prove/mail_view', params)//ejs
})

//Prove wk9 ajax functions (mail_math.js)
app.get('/mail_service', function (req, res) {
    var weight = req.query.weight;
    var types = req.query.types;
    var result = {result: doMailMath(weight, types)};
    var stringify = JSON.stringify(result);
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(stringify);
    res.end();

})

app.listen(PORT, () => console.log(`Listening on ${PORT}`))


//Team wk9 math functions ('/math)
function doMath(number1, number2, operand) {
    var result = 0;
    if (operand == 'plus') {
        result = Number(number1) + Number(number2);
    } else if (operand == 'minus') {
        result = Number(number1) - Number(number2);
    } else if (operand == 'times') {
        result = Number(number1) * Number(number2);
    } else if (operand == 'divide') {
        result = Number(number1) / Number(number2);
    }

    return result;
}


//Prove wk9 ('/mail)
function doMailMath(weight, types) {
    var result = 0;
    var price = 0;
    var message = "";
    
    if (types == 'stamp') {
        if (weight <= 1)
            price = .55;
        else if (weight <= 2)
            price = .70;
        else if (weight <= 3)
            price = .85;
        else if (weight <= 3.5)
            price = 1.00;
        else
            message = "Letter is too heavy for stamped mail. Please choose a different mail type.";
           
    }
    if (types == 'metered') {
        
        if (weight <= 1)
            price = .50;
        else if (weight <= 2)
            price = .65;
        else if (weight <= 3)
            price = .80;
        else if (weight <= 3.5)
            price = .95;
        else
            message = "Letter is too heavy for metered mail. Please choose a different mail type.";
    }
    if (types == 'flats') {
        
        if (weight <= 1)
            price = 1.00;
        else if (weight <= 2)
            price = 1.15;
        else if (weight <= 3)
            price = 1.30;
        else if (weight <= 4)
            price = 1.45;
        else if (weight <= 5)
            price = 1.60;
        else if (weight <= 6)
            price = 1.75;
        else if (weight <= 7)
            price = 1.90;
        else if (weight <= 8)
            price = 2.05;
        else if (weight <= 9)
            price = 2.20;
        else if (weight <= 10)
            price = 2.35;
        else if (weight <= 11)
            price = 2.50;
        else if (weight <= 12)
            price = 2.65;
        else if (weight <= 13)
            price = 2.80;
        else
            message = "Envelope is too heavy. Please choose the package mail type.";
    }
    if (types == 'package') {
        
        if (weight <= 4)
            price = 3.66;
        else if (weight > 4 && weight <= 8)
            price = 4.39;
        else if (weight > 8 && weight <= 12)
            price = 5.19;
        else if (weight > 12 && weight <= 13)
            price = 5.71;
        else
            message = "Package is too heavy for first class mail.";
    }
    if (result = Number(price)) {
        return result;

    } else if (result = message) {
        return message;
    }
}