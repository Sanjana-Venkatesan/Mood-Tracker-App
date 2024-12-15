const mongoose = require('mongoose');
const mood = require('./mood');

const QuoteSchema = new mongoose.Schema({
  text: { type: String, required: true },
  mood:{type:String,required:true,enum:[
    'Happy', 
    'Sad', 
    'Excited', 
    'Tired', 
    'Angry', 
    'Calm', 
    'Anxious', 
    'Grateful', 
    'Bored', 
    'Hopeful', 
    'Lonely', 
    'Confident', 
    'Frustrated', 
    'Inspired', 
    'Nostalgic', 
    'Proud', 
    'Relaxed', 
    'Stressed', 
    'Overwhelmed', 
    'Curious'
  ]}
});

module.exports = mongoose.model('Quote', QuoteSchema);
