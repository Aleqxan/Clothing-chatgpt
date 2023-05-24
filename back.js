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

app.get('', (req, res) => {
  res.render('index');
});

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

// Set up a route for the signup page
app.get('/signup', (req, res) => {
  res.render('signup');
});

app.post('/signup', (req, res)=>{
  res.render('index')
})

// Set up a route to handle the signup form submission
app.post('/api/signup', (req, res) => {
  const { username, password } = req.body;

  // TODO: save the user details to the database

  // Redirect to a success page or perform any additional logic
  res.render('signup');
});

// Set up a route for the forgot password page
app.get('/forgot-password', (req, res) => {
  res.render('reset');
});

// Set up a route to handle the password reset form submission
app.get('/api/reset-password', (req, res) => {
  const { email } = req.body;

  // TODO: initiate password reset process and send reset instructions to the user's email

  // Redirect to a success page or perform any additional logic
  res.render('/password-confirmation');
});

// Set up a route for the password reset confirmation page
app.get('/password-confirmation', (req, res) => {
  res.render('password-confirmation');
});

// Set up a route for the payment page
app.get('/confirm-payment', (req, res) => {
  res.render('Confirmation');
});

// Set up a route for the payment confirmation page
app.post('/confirm-payment', (req, res) => {
  const { cardNumber, cardName, expiryMonth, expiryYear, cvv, paymentMethod } = req.body;

  // Check if a payment method is selected
  if (!paymentMethod) {
    // Render an error message and prevent further processing
    res.render('Confirmation', { error: 'Please select a payment method.' });
    return;
  }

  // TODO: validate the card details against the payment gateway

  // if the payment is successful, show the success page
  res.render('Confirmation');
});

// Set up a route for the payment success page
app.get('/payment-success', (req, res) => {
  res.render('Confirmation');
});

// start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});