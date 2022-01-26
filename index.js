// Let's write the code now
"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const app = express().use(bodyParser.json()); // creates express http server
// const { initializeApp } = require("firebase-admin/app");
const functions = require("firebase-functions");
const { WebhookClient } = require("dialogflow-fulfillment");
const { Card, Suggestion } = require("dialogflow-fulfillment");
const token = "testing"; //verification token

var admin = require("firebase-admin");

var serviceAccount = require("./config/serviceAccountKey.json");

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://vitual-assistant-pharmacy.firebaseio.com",
  });

  console.log("Firebase initialized");
} catch (err) {
  console.log(`Error here ${err}`);
}

//db access using firestore
var db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true });

process.env.DEBUG = "dialogflow:debug"; // enables lib debugging statements

//Let's define port number
const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("Your application is running with no issues!");
  if (req.query.token !== token) {
    res.status(401).send("Unauthorized");
  }

  // return challenge
  return res.end(query.query.challenge);
}); // end of app.get

// exports.dialogflowFirebaseFulfillment = functions.https.onRequest(
//   (request, response) => {
//     const agent = new WebhookClient({ request, response });
//     console.log(
//       "Dialogflow Request headers: " + JSON.stringify(request.headers)
//     );
//         console.log("Dialogflow Request body: " + JSON.stringify(request.body));

app.post("/pharmacist", express.json(), (req, res) => {
  const agent = new WebhookClient({
    request: req,
    response: res,
  });

  function testing(agent) {
    agent.add(`Yes we are live on port ${port}`);
  }

  function welcome(agent) {
    agent.add(`Welcome to my agent!`);
  }

  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }

  let intentMap = new Map();
  intentMap.set("Default Welcome Intent", welcome);
  intentMap.set("Default Fallback Intent", fallback);
  intentMap.set("Mock Up Demo", testing);
  // intentMap.set('your intent name here', yourFunctionHandler);
  // intentMap.set('your intent name here', googleAssistantHandler);
  agent.handleRequest(intentMap);
});

app.listen(port, () => {
  console.log(`Chatbot Webhook is listening on port ${port}`);
  console.log("press Ctrl+C to cancel");
});
