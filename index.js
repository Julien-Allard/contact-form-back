require("dotenv").config();

const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(formidable());

const api_key = process.env.API_KEY;
const domain = process.env.DOMAIN;
const mailgun = require("mailgun-js")({ apiKey: api_key, domain: domain });

app.post("/form", (req, res) => {
  const data = {
    from: `${req.fields.firstname} ${req.fields.lastname} <${req.fields.email}>`,
    to: "allardj85@gmail.com",
    subject: `${req.fields.subject}`,
    text: req.fields.message,
  };

  mailgun.messages().send(data, (error, body) => {
    if (error === undefined) {
      res.status(200).json({ message: "Données bien reçues, mail envoyé." });
    } else {
      res.status(400).json(error);
    }
  });
});

app.listen(process.env.PORT, () => {
  console.log("Server has started !");
});
