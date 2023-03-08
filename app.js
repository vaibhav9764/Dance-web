const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 80;
const mongoose = require('mongoose');


main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/contactData');
}
const kittySchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});
const Kitten = mongoose.model('formData', kittySchema);

app.use(express.urlencoded());


// For serving static files
app.use('/static', express.static('static'))

// Set the template engine as pug
app.set('view engine', 'pug')

// Set the views directory
app.set('views', path.join(__dirname, 'views'))



app.get('/', (req, res) => {
    res.status(200).render('home.pug');
})

app.get('/contact', (req, res) => {

    res.status(200).render('contact.pug');
})

app.post('/contact', (req, res) => {
    let myData= new Kitten(req.body);
 
    myData.save();
    res.send("submitted succefuly");
})

app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});