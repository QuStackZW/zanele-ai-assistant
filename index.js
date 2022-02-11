// Let's write the code now
//Author: Andile Mbele
//Date: 2/2/2022
//Description: Chatbot for healthcare

"use --trace-warnings";

const express = require("express");
const bodyParser = require("body-parser");
const app = express().use(bodyParser.json()); // creates express http server
// const myApp = dialogflow({ debug: true });
// const { initializeApp } = require("firebase-admin/app");
// const functions = require("firebase-functions");
const { WebhookClient } = require("dialogflow-fulfillment");
const { Card, Suggestion } = require("dialogflow-fulfillment");
const token = "testing"; //verification token

var admin = require("firebase-admin");

var serviceAccount = require("./config/serviceAccountKey.json");
const { AgentsClient } = require("@google-cloud/dialogflow");

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

// myApp.intent("Wassup", (conv) => {
//   conv.ask("Welcome to number echo! Say a number.");
// });
// myApp.intent("Input Number", (conv, { num }) => {
//   // extract the num parameter as a local string variable
//   conv.close(`You said ${num}`);
// });
// exports.yourAction = functions.https.onRequest(myApp);

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
      "Hello there. I am Zanele, your awesome virtual assistant pharmacist! I can assist you with the following"
    );
    agent.add(
      "1. Ask a medical or pharmaceutical related question. \n2. Buy over-the-counter medicine or any of our products \n3. Add Drug"
    );

    agent.add(new Suggestion("Ask Question"));
    agent.add(new Suggestion("Add to Cart"));
    agent.add(new Suggestion("Add Drug"));
  }

  function askPharmacyOrMedicalQuestion(agent) {
    agent.add("Sure, what would you like to ask?");
  }

  function howToLowerBloodPressure(agent) {
    agent.add(
      "Your blood pressure can fluctuate throughout the day. For example, it may go up monetarily if you see your idol. Or go down, depending on your situation and point of view. \n\nHowever, having elevated blood pressure over longer periods of time puts you at higher risk for all kinds of problems including heart attacks and stroke. Your first option should never be medications, unless it is an emergency situation. Lifestyle modification should come first such as reducing your sodium intake, losing weight, getting more exercise, limiting alcohol intake, reducing stress, meditating, and listening to some relaxing music. Don't try to manage your blood pressure on your own."
    );
  }

  // function whatIsKeto(agent) {
  //   agent.add(
  //     "The “Keto” Diet is short for ketogenic. The ketogenic diet is a low-carbohydrate, higher fat diet with fat consisting of as much as 90% of the caloric intake. Yes, you heard that correctly, after years of people recommending low fat diets, a high-fat diet is now being pushed. What’s the theory behind this? Well, depriving your body of carbohydrates is supposed to switch your body from relying on sugar from carbs for fuel to relying on ketone bodies that result when your liver burns fat that is stored in your body. Burning fat in theory sounds good. The relative simplicity of this explanation and the observation that people can lose weight in the short term from this diet has led to a business boom, with many pushing keto products like books, seminars, and foods. \n\nBut is keto just a fad or is there some meat (and bacon and cheese) to it? Well, the jury is still out on the keto diet as not enough longer-term scientific studies have been done to determine if it is an effective and healthy way of losing weight and maintaining weight loss. The diet certainly has some potential risks such as not getting enough of the nutrients that you would normally get from fruits, vegetables, and grains, overtaxing your liver and kidneys, constipation, and your constantly telling other people that you are on the keto diet. Plus, some may find the diet tough to maintain. Again, this is a case of the science needing to catch up to the hype."
  //   );
  // }

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

  function whatCausesHiccups(agent) {
    agent.add(
      "Looks like lots of people are getting hiccups or at least laughing at people who are getting the hiccups this year. This is the second appearance on this list for hiccups. \n\nIt’s not completely clear what may cause temporary hiccups. It may be having too much stuff in your stomach such as food, air, or bacon. It may be sudden changes in temperature. It may be stress or excitement such as seeing Justin Bieber. In most cases, you just don’t know what started them. Chronic or frequently repeated episodes of hiccups are a different story, This can be a sign that something like a mass or inflammation is irritating your diaphragm or the nerves that control and extend to your diaphragm. Certain medication or serious medical conditions such as diabetes, kidney failure, and encephalitis can lead to hiccups as well. Therefore, if hiccups continue to be an issue, call you doctor."
    );
  }

  function whatCausesKidneyStones(agent) {
    agent.add(
      "Kidney stones, otherwise known as renal lithiasis or nephrolithiasis if you want words harder to pronounce, form when some type of mineral or salt clusters together inside your kidneys. Stones can form when you have too much of certain mineral or salt or if you are not hydrated enough. Calcium oxalate or calcium phosphate stones can form when you get high doses of vitamin D, undergo bypass surgery, or have metabolic issues. \n\nUric acid stones can result when you eat too much protein or have gout. Certain types of urinary tract infection can lead to struvite stones."
    );
  }

  function whatIsHPV(agent) {
    agent.add(
      "The “human papilloma virus”, or HPV, is the most common sexually transmitted infection in the world. HPV is a highly contagious virus which affects the skin and moist membranes of the body such as the cervix, anus, mouth and throat. \n\nHPV is spread primarily through skin-to-skin contact. HPV is the most common sexually transmitted infection, and it is estimated that 80% of people will have at least one type of HPV at some point in their lifetime. You do not have to have sexual intercourse to catch HPV. The virus can be transmitted through touching or genital to genital contact, oral or anal sex. There is even evidence to suggest that deep kissing can spread HPV. \n\nHPV does not have any symptoms, so you may not know if you have it. It will likely only become apparent following a diagnosis with a HPV-related cancer, or genital warts."
    );
  }

  function howToLowerCholesterol(agent) {
    agent.add(
      "If you are asking this for yourself, you may not want to try the keto diet. Cutting your intake of saturated fats and trans-fats is an important step. So is increasing your intake of omega-3 fatty acids and fiber. \n\nGetting more physical activity and losing weight may help. If you are smoking, stop. Also, limit your alcohol consumption. High cholesterol can increase your risk of stroke and various types of cardiovascular diseases."
    );
  }

  function howManyCaloriesShouldIEatADay(agent) {
    agent.add(
      "You need calories to survive. However, people probably are wondering how many calories they should eat based on whether they want to gain weight, lose weight, or do neither. The frequently cited threshold is 2,000 calories for women and 2,500 calories for men per day to maintain the same body weight. \n\nHowever, this greatly oversimplifies the complexities of your body. The calories that you need depend heavily, no pun intended, on many factors, including your body size, your age, and your activity level. The Mifflin-St. Jeor equation does take into account differences in sex, age, weight, height, and activity level and serves as the basis for some for some online calorie recommendation calculators. But even these are just approximations and do not account for every factor that may affect your weight. Plus, all calories are not equal. \n\nGetting 2,000 calories from just eating sticks of butter or drinking soda is very different from getting the same number from a more balanced diet. Highly-processed foods may have different effects on your metabolism compared to natural foods."
    );
  }

  function howLongDoesAlcoholStayInYourBlood(agent) {
    agent.add(
      "This is another tough question that does't have a single set answer for everyone. On average, you are probably able to metabolize about half-a-drink per hour. But the speed at which you break down alcohol depends on a whole lot of things. \n\nFirst of all, how big are you? What is your age? What is your metabolism and general health like? How much food did you have in your stomach to soak up the alcohol so that it didn't get absorbed into your bloodstream? What kinds of drinks did you have and what was their alcohol content? \n\nKeep in mind that even if your body can clear alcohol from your bloodstream at an average rate of 0.015 per hour, a breathalyzer or blood test can still detect alcohol for up to 12 hours, a urine test for up to 3 to 5 days, and a hair test for up to 90 days. If you are going to drive, operate a combine harvester, or do anything that requires good concentration and coordination, the best thing to do is not drink at all. Even if it means, heaven forbid, revealing your real sober personality at a party or on a date, it is not worth the risk to try to time your personal alcohol clearance exactly."
    );
  }

  function painRelieversSafeForPregnancy(agent) {
    agent.add(
      "Your doctor has likely told you that you shouldn’t take any medicine without checking with them first. You might wonder: Do you need to check with them even if you just want to pop a pain reliever? \n\nThe simple answer is: yes. You should ask your doctor before you take any medication, even if it’s just an over-the-counter pill designed to relieve pain. Such medicine may seem harmless enough, but the rules change when you’re carrying a baby.\n\nSome medicines aren’t safe to take when you’re pregnant -- even over-the-counter ones. \n\nMost pregnant women can take acetaminophen if their doctor gives them the thumbs-up. It’s the most common pain reliever that doctors allow pregnant women to take. Some studies have found that about two-thirds of pregnant women take acetaminophen sometime during their nine-month stretch."
    );
  }

  function whatIsTheMedicationCalled(agent) {
    agent.add(
      "Each medication has two names: the common (also called generic) name and the brand name. The brand name is the name under which a specific manufacturer markets a product (e.g., Tylenol®). The common name is the standard name of the medication (e.g., acetaminophen). The label on your medication will state the brand name, common name, or both. If more than one company makes a medication, its common name will be the same. The brand name will be different for each company. In other countries, the brand name may be different, but the common name is usually the same."
    );
  }

  function whatCausesAHeadacheAnyway(agent) {
    agent.add(
      "1. Anxiety\nStress can take a toll on you. Breathe, relax and take a stroll. \n\n2. Glare\nBrightness from your computer screen, sunlight or overhead lights can make things painful. Turn it down and try adding a desk lamp. \n\n3. Noise\nIt's not just loud, repetitive sounds. Even lower level on continuous noise can hurt. Calming music and headphones may help. \n\n4. Eating + Sleeping Patterns\nEat when you're hungry. Sleep enough (not too much or too little), and don't sleep in an odd position in a cold room – it can make your muscles spasm. \n\n5. Medication\nSome prescription medications may have the potential to trigger a headache. If you notice an increase, talk to your doctor. \n\n6. Physical Activity\nTake it easy in the gym. Pushing too hard can result in an exertional headache from the swelling of blood vessels in your head, neck and scalp. \n\n7. Lack of physical activity\nEven though over-exertion can increase your risk for headaches, staying sedentary doesn't help either. As with most things in life, moderation is key. Talk to your doctor before beginning or revising any exercise regimen. \n\n8. Posture\nYour mom was right! Sit up straight to keep blood flowing (and move around when you can if you spend extended periods of time bent over a desk). \n\n9. Hormones\nWhen estrogen levels drop (especially right before your period), you may be more likely to get a headache. Keep track of your cycle and plan when you can. \n\n10. Food sensitivities\nFood and drink release neurotransmitters, which can cause headaches in some people. Triggers include aspartame, caffeine, chocolate, alcohol, cheese and more."
    );
  }

  // Purchases functionality from the Dialogflow API
  function makeAPurchase(agent) {
    agent.add(
      "Super Med Pharmacy has 3 categories of products; \n\n1. Over the counter-medication,\n2. Cosmetics \n3. Toiletries \n\nSelect your choice"
    );
    agent.add(new Suggestion("Drugs"));
    agent.add(new Suggestion("Cosmetics"));
    agent.add(new Suggestion("Toiletries"));
  }

  function drugName(agent) {
    // Over the counter-Medication
    agent.add("What's the name of the medication you want to buy?"); // Drug names
  }

  function howMany(agent) {
    agent.add("How many units of the medication do you want to buy?");
  }
  function whoIsBuying(agent) {
    agent.add("Who is buying the medication?");
  }

  function deliveryDate(agent) {
    agent.add("When do you want to receive the medication?");
  }
  function deliveryTime(agent) {
    agent.add("What time do you want to receive the medication?");
  }
  function deliveryAddress(agent) {
    agent.add("Where do you want to receive the medication?");
  }
  function deliveryPhone(agent) {
    agent.add("What's your phone number?");
  }
  function deliveryEmail(agent) {
    agent.add("What's your email address?");
  }
  function drugPrice(agent) {
    agent.add("How much does the medication cost?");
  }
  function paymentMethod(agent) {
    agent.add("What's the payment method you're using?");

    agent.add(new Suggestion("One Money"));
    agent.add(new Suggestion("EcoCash"));
    agent.add(new Suggestion("MyCash"));
  }

  function linkedNumber(agent) {
    agent.add(`What is your ${agent.parameters.paymentMethod} linked number?`);
  }
  async function reviewTransactionDetails(agent) {
    //Details of the purchase
    let drugName = agent.parameters.drugName;
    let howMany = agent.parameters.howMany;
    let whoIsBuying = agent.parameters.whoIsBuying;
    let deliveryDate = agent.parameters.deliveryDate;
    let deliveryTime = agent.parameters.deliveryTime;
    let deliveryAddress = agent.parameters.deliveryAddress;
    let deliveryPhone = agent.parameters.deliveryPhone;
    let deliveryEmail = agent.parameters.deliveryEmail;
    let drugPrice = agent.parameters.drugPrice;
    let paymentMethod = agent.parameters.paymentMethod;
    let linkedNumber = agent.parameters.linkedNumber;

    agent.add(
      `Your Name: ${whoIsBuying} \nOrder: ${drugName} \nUnits: ${howMany} \nDelivery Date: ${deliveryDate} \nDelivery Time: ${deliveryTime} \nDelivery Address: ${deliveryAddress} \nDelivery Phone: ${deliveryPhone} \nDelivery Email: ${deliveryEmail} \n Price: ${drugPrice} \nPayment Method: ${paymentMethod} \nLinked Number: ${linkedNumber}`
    );

    agent.add("Confirm transaction details?");
    agent.add(new Suggestion("Yes"));
    agent.add(new Suggestion("No"));
  }

  async function confirmTransaction(agent) {
    let drugName = agent.parameters.drugName;
    let units = agent.parameters.units;
    let whoIsBuying = agent.parameters.whoIsBuying;
    let deliveryDate = agent.parameters.deliveryDate;
    let deliveryTime = agent.parameters.deliveryTime;
    let deliveryAddress = agent.parameters.deliveryAddress;
    let deliveryPhone = agent.parameters.deliveryPhone;
    let deliveryEmail = agent.parameters.deliveryEmail;
    let drugPrice = agent.parameters.drugPrice;
    let paymentMethod = agent.parameters.paymentMethod;
    let linkedNumber = agent.parameters.linkedNumber;

    db.collection("purchases")
      .add({
        drug: drugName,
        units: units,
        buyer: whoIsBuying,
        date: deliveryDate,
        time: deliveryTime,
        address: deliveryAddress,
        phone: deliveryPhone,
        email: deliveryEmail,
        price: drugPrice,
        paymentMethod: paymentMethod,
        linkedNumber: linkedNumber,
      })
      .then(function (docRef) {
        agent.add("Order added successfully");
      })
      .catch(function (error) {
        agent.add("Error adding document: ", error);
      });
    agent.add("Your order was successful");
  }

  //User wants to purchase either of the 3 options
  // User inputs his or her details as prompted
  // UseMapr inputs the amount of the purchase
  // User inputs the payment method
  // User inputs the delivery address
  // User inputs the delivery date
  // User inputs the delivery time
  // User inputs the delivery instructions
  // User inputs the delivery phone number
  // User inputs the delivery email

  //Adding new drugs into database;
  //User inputs the drug name
  //User inputs the drug price
  //User inputs the drug category
  //user inputs the drug manufacturer
  //User inputs the drug Administering instructions
  //User inputs the drug image
  //Save data to the database;

  function nameOfDrug(agent) {
    agent.add("What's the name of the drug you want to add?");
  }

  function priceOfDrug(agent) {
    agent.add("How much does the drug cost?");
  }

  function drugCategory(agent) {
    //     (1) Central Nervous System (CNS) Depressants. CNS depressants slow down the operations of the brain and the body. ...
    // (2) CNS Stimulants. ...
    // (3) Hallucinogens. ...
    // (4) Dissociative Anesthetics. ...
    // (5) Narcotic Analgesics. ...
    // (6) Inhalants. ...
    // (7) Cannabis.
    agent.add("What's the category of the drug?");
  }

  function drugManufacturer(agent) {
    agent.add("Who is the manufacturer of the drug?");
  }
  function drugAdministeringType(agent) {
    // Oral route.
    // Sublingual/ Buccal route.
    // Rectal route.
    // Topical route.
    // Transdermal route.
    // Inhalational route/ pulmonary route.
    // Injection route.
    // Oral administration. This is the most frequently used route of drug administration and is the most convenient and economic. ...
    // Sublingual. ...
    // Rectal administration. ...
    // Topical administration. ...
    // Parenteral administration. ...
    // Intravenous injection.
    agent.add("How is the drug administered?");
  }
  function drugImage(agent) {
    agent.add("What's the image of the drug?");
  }

  async function drugHandler(agent) {
    let name = agent.context.get("NameofDrug-followup").parameters.nameOfDrug;
    let price = agent.context.get("PriceofDrug-followup").parameters.drugPrice;
    let category = agent.context.get("DrugCategory-followup").parameters
      .drugCategory;
    let manufacturer = agent.context.get("DrugCategory-custom-followup")
      .parameters.drugManufacturer;
    let adminType = agent.context.get("DrugCategory-custom-custom-followup")
      .parameters.drugAdministrationMethod;
    let image = agent.context.get("DrugImage-followup").parameters.drugImage;

    return db
      .collection("drugs")
      .add({
        name: name,
        price: price,
        category: category,
        manufacturer: manufacturer,
        adminType: adminType,
        image: image,
      })
      .then((ref) => {
        agent.context.set("save-to-db", 5, {
          name: name,
          price: price,
          category: category,
          manufacturer: manufacturer,
          adminType: adminType,
          image: image,
          docId: ref.id,
        });
        console.log(`Successfully added: ${ref.id}`);
        agent.add("Drug added successfully");
      })
      .catch(function (error) {
        agent.add("Error adding document: ", error);
      });
  }

  async function saveToDb(agent) {
    let name = agent.context.get("save-to-db").parameters.name;
    let price = agent.context.get("save-to-db").parameters.price;
    let category = agent.context.get("save-to-db").parameters.category;
    let manufacturer = agent.context.get("save-to-db").parameters.manufacturer;
    let adminType = agent.context.get("save-to-db").parameters.adminType;
    let image = agent.context.get("save-to-db").parameters.image;
    let docId = agent.context.get("save-to-db").parameters.docId;

    return db
      .collection("drugs")
      .doc(docId)
      .set({
        name: name,
        price: price,
        category: category,
        manufacturer: manufacturer,
        adminType: adminType,
        image: image,
      })
      .then(function () {
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  }

  // function UserAccount(agent) {
  //   //Register a user
  //   //Get the user's National ID
  //   agent.add("Please enter your full name");
  // }

  // *********************************************USER ACCOUNT DETAILS*******************************************************//
  function userName(agent) {
    //Get the user's fullname
    agent.add("Please enter your full name");
  }
  function userDateOfBirth(agent) {
    //Get the user's date of birth
    agent.add("Please enter your date of birth");
  }

  function userNationalIdentification(agent) {
    //Get the user's national identification number'
    agent.add(
      "Please enter your national identification number. (e.g. 08-2127708X35)"
    );
  }
  function userGender(agent) {
    //Get the user's Gender
    agent.add(new Suggestion("Female"));
    agent.add(new Suggestion("Male"));
  }

  function userTelephoneNumber(agent) {
    //Get the user's telephone number
    agent.add("Please enter your phone number");
  }
  function userAddress(agent) {
    // Get the user's home Address
    agent.add("Please enter your home address");
  }
  function userCity(agent) {
    //Get the user's City/town
    agent.add("Which city do you live in?");
  }
  // ********************************************* END OF USER ACCOUNT DETAILS*******************************************************//

  // *********************************************FETCH DRUGS FROM DB*******************************************************//
  function getDrugs(agent) {
    db.collection("drugs")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          agent.add(doc.data().name);
        });
      })
      .catch((err) => {
        console.log("Error getting documents", err);
      });
  }
  // *********************************************END OF FETCH DRUGS FROM DB*******************************************************//

  // *********************************************TEST IF IT SAVES TO DB*******************************************************//
  function whatIsYourName(agent) {
    agent.add("What is your name?");
  }

  function whatIsYourAge(agent) {
    agent.add("How old are you?");
  }

  function confirmPersonalDetails() {
    const name = agent.context.get("getName").parameters.name;
    const age = agent.context.get("getAge").parameters.age;

    agent.add(`Your name is ${name} and you are ${age} years old`);
    agent.add("Confirm");

    agent.add(new Suggestion("Yes"));
    agent.add(new Suggestion("No"));
  }
  async function saveUserDetails(agent) {
    const name = agent.context.get("getName").parameters.name; //User's name");
    const age = agent.context.get("getAge").parameters.age; //User's age");
    // let name = agent.parameters.name;
    // let age = agent.parameters.age;

    return db
      .collection("users")
      .add({
        name: name,
        age: age,
      })
      .then((ref) => {
        agent.add(
          `User details saved successfully. The Reference ID is ${ref.id}`
        );
        console.log(`Successfully added: ${ref.id}`);
        agent.add(new Suggestion("Get Started"));
        agent.add(new Suggestion("Search for drugs"));
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  }
  // *********************************************END OF TEST IF IT SAVES TO DB*******************************************************//

  // *********************************************FALLBACK INTENT*******************************************************//
  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }
  // *********************************************END OF FALLBACK INTENT*******************************************************//

  //**************************************************INTENT MAPS AS DEFINED BY THE CODE AND DIALOGFLOW*****************************************************//
  let intentMap = new Map();
  intentMap.set("Default Welcome Intent", welcome);
  intentMap.set("Default Fallback Intent", fallback);
  intentMap.set("Mock Up Demo", testing);

  //Database testing
  intentMap.set("What is your name", whatIsYourName);
  intentMap.set("What is your age", whatIsYourAge);
  intentMap.set("Confirm Personal Details", confirmPersonalDetails);
  intentMap.set("Save User Details", saveUserDetails);

  //Pharmaceutical Questions
  intentMap.set(
    "Ask Pharmacy Or Medical Question",
    askPharmacyOrMedicalQuestion
  );
  intentMap.set("How To Lower Blood Pressure?", howToLowerBloodPressure);
  // intentMap.set("What Is Keto?", whatIsKeto);
  intentMap.set("How to get rid of hiccups?", howToGetRidOfHiccups);
  intentMap.set("How long does the flu last?", howLongDoesTheFluLast);
  intentMap.set("What Causes Hiccups?", whatCausesHiccups);
  intentMap.set("What Causes Kidney Stones?", whatCausesKidneyStones);
  intentMap.set("What Is HPV?", whatIsHPV);
  intentMap.set("How To Lower Cholesterol?", howToLowerCholesterol);
  intentMap.set(
    "How Many Calories Should I Eat A Day?",
    howManyCaloriesShouldIEatADay
  );
  intentMap.set(
    "How Long Does Alcohol Stay In Your Blood?",
    howLongDoesAlcoholStayInYourBlood
  );
  intentMap.set(
    "What Pain Relievers Are Safe During Pregnancy?",
    painRelieversSafeForPregnancy
  );
  intentMap.set("What is the medication called?", whatIsTheMedicationCalled);
  intentMap.set("What Causes A Headache Anyway?", whatCausesAHeadacheAnyway);

  //Add Drugs the pharmacy has
  intentMap.set("Add Drug", nameOfDrug);
  intentMap.set("Price of Drug", priceOfDrug);
  intentMap.set("Drug Category", drugCategory);
  intentMap.set("Drug Manufacturer", drugManufacturer);
  intentMap.set("Drug Administering Type", drugAdministeringType);
  intentMap.set("Drug Image", drugImage);
  intentMap.set("Drug Handler", drugHandler);

  // Purchases here
  intentMap.set("Make a purchase", makeAPurchase);
  intentMap.set("DrugName", drugName);
  intentMap.set("HowManyUnits", howMany);
  intentMap.set("WhoIsBuying", whoIsBuying);
  intentMap.set("DeliveryDate", deliveryDate);
  intentMap.set("DeliveryTime", deliveryTime);
  intentMap.set("DeliveryAddress", deliveryAddress);
  intentMap.set("DeliveryPhone", deliveryPhone);
  intentMap.set("DeliveryEmail", deliveryEmail);
  intentMap.set("DrugPrice", drugPrice);
  intentMap.set("Payment Method", paymentMethod);
  intentMap.set("LinkedNumber", linkedNumber);
  intentMap.set("Review Transaction Details", reviewTransactionDetails);
  intentMap.set("Review Transaction Details - yes", confirmTransaction);
  agent.handleRequest(intentMap);
});
//**************************************************END OF INTENT MAPS AS DEFINED BY THE CODE AND DIALOGFLOW*****************************************************//

//**************************************************APP LISTEN*****************************************************//
app.listen(port, () => {
  console.log(`Chatbot Webhook is listening on port ${port}`);
  console.log("press Ctrl+C to cancel");
});
//**************************************************END OF APP LISTEN*****************************************************//
