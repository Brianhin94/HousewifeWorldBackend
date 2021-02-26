require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
//comment katie
// middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Routes
app.get('/', (req, res) => {
  res.json({ message: "MERN app API Home" })
});
// Controllers
app.use('/api', require('./controllers/auth'));
app.use('/user', require('./controllers/user'));
app.listen(process.env.PORT || 3001, () =>
  console.log(`You're listening to the smooth sounds of Port ${process.env.PORT || 3000}`)
);