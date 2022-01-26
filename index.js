// Let's write the code now
"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const app = express().use(bodyParser.json()); // creates express http server
// const { initializeApp } = require("firebase-admin/app");
// const functions = require("firebase-functions");
const { WebhookClient } = require("dialogflow-fulfillment");
const { Card, Suggestion } = require("dialogflow-fulfillment");
const token = "testing"; //verification token

var admin = require("firebase-admin");

var serviceAccount = require("./config/serviceAccountKey.json");

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://virtual-assistant-pharmacy.firebaseio.com",
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
    agent.add(
      `Hello. I am Zanele, your awesome virtual assistant pharmacist! I can assist you if you with the following`
    );
    agent.add(
      "1. Ask me medical and pharmaceutical related questions. \n2. Make a purchase for over-the-counter medicine"
    );

    agent.add(new Suggestion("Ask me a medical question"));
    agent.add(new Suggestion("Make a purchase"));
  }

  function askPharmacyOrMedicalQuestion(agent) {
    agent.add("Sure, what would you like to ask?");
  }

  function bloodPressure(agent) {
    agent.add(
      "Your blood pressure can fluctuate throughout the day. For example, it may go up monetarily if you see your idol. Or go down, depending on your situation and point of view. \n\nHowever, having elevated blood pressure over longer periods of time puts you at higher risk for all kinds of problems including heart attacks and stroke. Your first option should never be medications, unless it is an emergency situation. Lifestyle modification should come first such as reducing your sodium intake, losing weight, getting more exercise, limiting alcohol intake, reducing stress, meditating, and listening to some relaxing music. Don't try to manage your blood pressure on your own."
    );
  }

  function whatIsKeto(agent) {
    agent.add(
      "The “Keto” Diet is short for ketogenic. The ketogenic diet is a low-carbohydrate, higher fat diet with fat consisting of as much as 90% of the caloric intake. Yes, you heard that correctly, after years of people recommending low fat diets, a high-fat diet is now being pushed. What’s the theory behind this? Well, depriving your body of carbohydrates is supposed to switch your body from relying on sugar from carbs for fuel to relying on ketone bodies that result when your liver burns fat that is stored in your body. Burning fat in theory sounds good. The relative simplicity of this explanation and the observation that people can lose weight in the short term from this diet has led to a business boom, with many pushing keto products like books, seminars, and foods. \n\nBut is keto just a fad or is there some meat (and bacon and cheese) to it? Well, the jury is still out on the keto diet as not enough longer-term scientific studies have been done to determine if it is an effective and healthy way of losing weight and maintaining weight loss. The diet certainly has some potential risks such as not getting enough of the nutrients that you would normally get from fruits, vegetables, and grains, overtaxing your liver and kidneys, constipation, and your constantly telling other people that you are on the keto diet. Plus, some may find the diet tough to maintain. Again, this is a case of the science needing to catch up to the hype."
    );
  }

  function howToGetRidOfHiccups(agent) {
    agent.add(
      "Altering your breathing cycle, which may calm your diaphragm down. Possibilities include breathing into a paper bag, pulling your knees to your chest and leaning forward, drinking water from the opposite side of a glass while bending over, or holding your breath. If you do hold your breath, make sure that you don’t do this indefinitely. \n\nGargling with ice water or sipping cold water. If you do gargle, make sure that you don’t have so much ice in your mouth that you start spreading it around the room like a geyser. \nPulling on your tongue. But don’t pull so hard that your tongue comes out, which will lead to bigger problems.\nRubbing the back of your neck. It’s unclear whether adding the words, “there, there,” makes a difference. \nGetting scared. A sudden scare may help, such as someone suddenly jumping in front of you or being told that there is a sequel to the 2016 movie Dirty Grandpa. \nLaughing spontaneously. They say laughter is the best medicine. Maybe someone else hiccuping can get you laughing.\nAnecdotal evidence suggests that breathing into a paper bag may help stop hiccups."
    );
  }

  function howLongDoesTheFluLast(agent) {
    agent.add(
      "If you are wondering about how long you are contagious, you actually start becoming contagious one day before you even have symptoms. In fact, one third of people infected with the flu virus don’t ever develop symptoms. But they can still shed flu viruses like some people bedazzle. So that person whom you stood so close to for so long may have given you more than his or her number.\n\nThis makes it very tough to completely avoid flu viruses. That’s why getting vaccinated is the only way to really protect yourself and others."
    );
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
