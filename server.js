const express = require('express')
const connectDB = require('./config/db')
const path = require('path'); //for file path

//Initialize app
const app = express()

//Connect DB
connectDB()

//Init Middleware
app.use(express.json({ extended: false }))     //parser needed to accept req.body data in routes



//Route Middleware
app.use('/api/users', require('./routes/users'))
app.use('/api/contacts', require('./routes/contacts'))
app.use('/api/auth', require('./routes/auth'))

//Serve static assets (React) in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) =>  //* - any route that is not listed above
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    );
  }

//Listen to server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))