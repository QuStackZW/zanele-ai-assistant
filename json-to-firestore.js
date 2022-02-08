// For Firebase JS SDK v7.20.0 and late
const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyAQGGwYewqNfqaYtDH-UGSZs3UuItpkhw0",
  authDomain: "virtual-assistant-pharmacy.firebaseapp.com",
  projectId: "virtual-assistant-pharmacy",
  storageBucket: "virtual-assistant-pharmacy.appspot.com",
  messagingSenderId: "553267317818",
  appId: "1:553267317818:web:14fd69f74c260b9b5c3903",
  measurementId: "G-FZS3BQYM49",
};

let db = firebase.firestore();

let orders = [
  {
    id: "1",
    amount: "10",
    deliveryAddress: "9969 Alexander Road, Magwegwe",
    deliveryDate: "February 8, 2022",
    drugsOrdered: "Bioplus",
    email: "menelisizimunya@yahoo.com",
    fullName: "Menelisi Zimunya",
    paymentMethod: "EcoCash",
    phoneNumber: "+263 77 606 1964",
  },
  {
    id: "2",
    amount: "12",
    deliveryAddress: "171 Alexander Road, Sunninghill",
    deliveryDate: "February 8, 2022",
    drugsOrdered: "Levora",
    email: "irene.nhembura@gmail.com",
    fullName: "Irene Nhamburo",
    paymentMethod: "EcoCash",
    phoneNumber: "+263 77 503 9638",
  },
  {
    id: "3",
    amount: "6",
    deliveryAddress: "71 Joshua Nkomo Road, Burnside",
    deliveryDate: "February 8, 2022",
    drugsOrdered: "Bioplus",
    email: "mzie.muroyiwa@gmail.com",
    fullName: "Mzimkhulu Muroyiwa",
    paymentMethod: "EcoCash",
    phoneNumber: "+263 77 129 8305",
  },
  {
    id: "4",
    amount: "5",
    deliveryAddress: "80 President Road, New Luveve, Bulawayo",
    deliveryDate: "February 8, 2022",
    drugsOrdered: "Bioplus",
    email: "menelisizimunya@yahoo.com",
    fullName: "Patience Chiringa",
    paymentMethod: "OneMoney",
    phoneNumber: "+263 71 680 1181",
  },
  {
    id: "5",
    amount: "11",
    deliveryAddress: "11 Pine Road, Mbare",
    deliveryDate: "February 8, 2022",
    drugsOrdered: "Bioplus",
    email: "menelisizimunya@yahoo.com",
    fullName: "Utile Madzivanzira",
    paymentMethod: "OneMoney",
    phoneNumber: "+263 71 827 7318",
  },
  {
    id: "6",
    amount: "7",
    deliveryAddress: "305 Pine Road, Lobengula",
    deliveryDate: "February 8, 2022",
    drugsOrdered: "Bioplus",
    email: "menelisizimunya@yahoo.com",
    fullName: "Tom Mangwana",
    paymentMethod: "EcoCash",
    phoneNumber: "+263 77 114 8072",
  },
  {
    id: "7",
    amount: "8",
    deliveryAddress: "902 Pine Road, Hillcrest",
    deliveryDate: "February 8, 2022",
    drugsOrdered: "Bioplus",
    email: "menelisizimunya@yahoo.com",
    fullName: "Kim Ndandarika",
    paymentMethod: "OneMoney",
    phoneNumber: "+263 78 528 7742",
  },
  {
    id: "8",
    amount: "8",
    deliveryAddress: "3 Joshua Nkomo Road, New Luveve, Bulawayo",
    deliveryDate: "February 8, 2022",
    drugsOrdered: "Ambien",
    email: "menelisizimunya@yahoo.com",
    fullName: "Nkosikhona Mavhura",
    paymentMethod: "OneMoney",
    phoneNumber: "+263 71 407 7281",
  },
  {
    id: "9",
    amount: "9",
    deliveryAddress: "78 Game Free Road, Entumbane",
    deliveryDate: "February 8, 2022",
    drugsOrdered: "Mesalamine",
    email: "menelisizimunya@yahoo.com",
    fullName: "Vaida Chitanda",
    paymentMethod: "OneMoney",
    phoneNumber: "+263 71 614 5382",
  },
  {
    id: "10",
    amount: "8",
    deliveryAddress: "7 University Road, Njube",
    deliveryDate: "February 8, 2022",
    drugsOrdered: "Mirtazipine",
    email: "menelisizimunya@yahoo.com",
    fullName: "Charles Gwaze",
    paymentMethod: "OneMoney",
    phoneNumber: "+263 78 750 4628",
  },
];

orders.forEach((order) => {
  db.collection("orders")
    .doc(order.id)
    .set(order)
    .then(() => {
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
});

// orders.forEach(function (obj) {
//   db.collection("orders")
//     .add({
//       id: obj.id,
//       amount: obj.amount,
//       deliveryAddress: obj.deliveryAddress,
//       deliveryDate: obj.deliveryDate,
//       drugsOrdered: obj.drugsOrdered,
//       email: obj.email,
//       fullName: obj.fullName,
//       paymentMethod: obj.paymentMethod,
//       phoneNumber: obj.phoneNumber,
//     })
//     .then(function (docRef) {
//       console.log("Document written with ID: ", docRef.id);
//     })
//     .catch(function (err) {
//       console.error("Error adding document: ", err);
//     });
// });
