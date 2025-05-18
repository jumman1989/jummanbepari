const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/jumman_db', { useNewUrlParser: true });

const ContactSchema = new mongoose.Schema({ name: String, email: String, message: String });
const Contact = mongoose.model('Contact', ContactSchema);

app.use(bodyParser.json());
app.use(express.static(__dirname));

app.post('/contact', async (req, res) => {
  const contact = new Contact(req.body);
  await contact.save();
  res.json({ message: 'Message received!' });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
