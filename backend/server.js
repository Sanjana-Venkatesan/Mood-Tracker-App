const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const url =`mongodb+srv://sanjana:swapna528@cluster0.absjn.mongodb.net/moodtracker?retryWrites=true&w=majority`
mongoose.set('strictQuery',false)

mongoose.connect(url)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);  
  });

// Middleware
app.use(cors());
app.use(express.json());

const Mood = require('./models/mood.js');
const Quote = require('./models/Quote.js');

app.get('/quote/:mood', async (req, res) => {
  const { mood } = req.params;

  const quotes = await Quote.find({ mood: mood });

  if (quotes.length === 0) {
    return res.status(404).json({ message: 'No quotes found for this mood' });
  }

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  res.json(randomQuote);
});



app.get('/all-quotes',async (req,res)=>{
  const quotes = await Quote.find()
  res.json(quotes)
})

app.post('/quotes',async(req,res)=>{
  const quote = new Quote(req.body);
  await quote.save();
  res.json(quote)
})

app.post('/moods', async (req, res) => {
  const mood = new Mood(req.body);
  await mood.save();
  res.json(mood);
});

app.get('/moods', async (req, res) => {
  const moods = await Mood.find().sort({ date: -1 }).limit(7);
  res.json(moods);
});

app.get('/all-moods',async (req,res) =>{
  const moods= await Mood.find()
  res.json(moods)
})


app.listen(5000, () => console.log('Server running on port 5000'));