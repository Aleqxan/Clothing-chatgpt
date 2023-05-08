const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// use JSON body parser
app.use(bodyParser.json());

// serve static files from the public directory
app.use(express.static('public'));

// set the view engine to ejs
app.set('view engine', 'ejs');

// set the directory for views
app.set('views', './views');

app.get('', (req, res)=>{
    res.render('index')
})

// define routes
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // TODO: validate email and password against the database

  // if the email and password are valid, redirect to the shopping page
  res.render('shopping');
});

// Set up a route to handle the OTP form submission
app.post('/verify-otp', (req, res) => {
    // Get the OTP entered by the user from the request body
    const otp = req.body.otp;
  
    // TODO: Verify the OTP with the backend service or database
    
    // If the OTP is valid, redirect the user to the success page
    res.render('otp');
  
    // If the OTP is invalid, show an error message to the user
    // res.render('otp', { error: 'Invalid OTP. Please try again.' });
  });
  
  // Set up a route to show the OTP form
  app.get('/verify-otp', (req, res) => {
    res.render('otp');
  });
  
  // Set up a route for the success page
  app.get('/success', (req, res) => {
    res.send('Your OTP has been verified successfully!');
  });

// start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


app.post('/confirm-payment', (req, res) => {
    const { cardNumber, cardName, expiryMonth, expiryYear, cvv } = req.body;
  
    // TODO: validate the card details against the payment gateway
  
    // if the payment is successful, show the success page
    res.render('Confirmation');
  });
  
  // Set up a route for the payment success page
  app.get('/payment-success', (req, res) => {
    res.render('Confirmation');
  });





// // define a route that renders a view
// app.get('/', function(req, res) {
//   res.render('index', { title: 'My App' });
// });

// start the server
// app.listen(3000, function() {
//   console.log('Server started on port 3000');
// });

