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
    if (types == 'stamped') {
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
        if (result = Number(price)){
            return result;
        }else{
            return message;
        }
}