const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000  //Environment variables - listen on 5000 unless there is a port set.
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => res.render('pages/prove_index'));
app.get('/mail', function (req, res) {
    var number1 = req.query.number1
    var number2 = req.query.number2
    var operand = req.query.operand
    var result = doMath(number1, number2, operand)

    var params = {
        number1: number1, number2: number2, operand: operand, result: result
    }
    res.render('pages/prove/mail_view', params)//ejs
})
app.get('/mail_service', function (req, res) {
            var number1 = req.query.number1;
            var number2 = req.query.number2;
            var operand = req.query.operand;
            var result = {result: doMath(number1, number2, operand)};
            var stringify = JSON.stringify(result);
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write(stringify);
            res.end();

        })
app.listen(PORT, () => console.log(`Listening on ${PORT}`))

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