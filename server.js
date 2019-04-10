const express = require('express')
const bodyParser = require('body-parser')

const logger = require('morgan')
const cors = require('cors');
const userRouter = require('./routes/userRouter')
const trackRouter = require('./routes/trackRouter')

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());

app.use('/users', userRouter)
app.use('/tracks', trackRouter)

app.get('/', async (req, res) => {
  res.json({ msg: 'Express is running!'})
})

app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
});