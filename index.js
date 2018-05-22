import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import routes from "./src/routes/routes";
import { request } from "http";

const app = express();
const PORT = 3000;

let contacts = require('./data'); //takes the data array and imports it into contacts


//mongo connection
mongoose.connect("mongodb://localhost/project2");

//bodyparser
app.use(bodyParser.urlencoded({ extended: true })); //parse incoming requests with urlencoded payloads
app.use(bodyParser.json()); //parse incoming requests with json payloads

routes(app);

//prints stuff to homepage
app.get("/", (req, res) => {
  if (!contacts){
    res.status(404).json({Message: 'There are currently no Contacts on this webpage.'})//Returns a not found error code if there are no contacts and sends a message saying such
  }
  res.json(contacts);//Change send request to Json so frontend can work with data easier
});

app.get('/:id', (req,res) => {
  const reqId= req.params.id;

  let contact = contacts.filter(contact => {
    return contact.id == reqId;
});
if (!contacts){
  res.status(404).json({Message: 'There are currently no Contacts on this webpage.'})
};
  res.json(contact[0])
});

// post method to add contacts
app.post("/", (req, res) => {

const contact = {
  id: contacts.length + 1,
  first_name: req.body.first_name,
  last_name: req.body.last_name,
  email: req.body.email,
  gender: req.body.gender,
  catch_phrase: req.body.catch_phrase
};
contacts.push(contact); //pushes to contact array


res.json(contact);

});

app.put("/:id", (req, res) => { //used to update exsiting contacts

  const reqID = req.params.id;

  let contact = contacts.filter(contact =>{ //filters by id
    return contact.id ==reqID;
  })[0];
const index = contacts.indexOf(contact);

const keys = Object.keys(req.body);

keys.forEach(key => {
  contact[key] = req.body[key];
});
contacts[index] = contact;

res.json(contacts[index]);
});

app.delete("/:id", (req, res) => {

  const reqID= req.params.id;
 
  let contact = contacts.filter(contact =>{ //filters by id
    return contact.id ==reqID;
  })[0];

    const index = contacts.indexOf(contact);

    contacts.splice(index,1);//splices out one contact

    res.json({Message: 'Contact has been deleted'});
  });






//server is listening on this port
app.listen(PORT, () => {
  console.log(`the server is up and running on localhost:${PORT}`);
});
