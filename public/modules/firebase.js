var firebase = require("firebase");
var gcloud = require('gcloud');

// Initialize the app with a service account, granting admin privileges
firebase.initializeApp({
    apiKey: "AIzaSyDHqc_8P_hEUTJ-kUvdgc8VAne1r36g0M8",
    authDomain: "kb141-17d6a.firebaseapp.com",
    databaseURL: "https://kb141-17d6a.firebaseio.com",
    serviceAccount: "/Users/juyoungjung/Downloads/KB141-ee115063fbe4.json",
    storageBucket: "kb141-17d6a.appspot.com",
    messagingSenderId: "387641864580"
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
var db = firebase.database();
var ref = db.ref("/key");
ref.once("value", function(snapshot) {
    console.log(snapshot.val());
});
var storage = gcloud.storage({
    projectId:"kb141-17d6a",
    keyFilename: "/Users/juyoungjung/Downloads/KB141-ee115063fbe4.json"
});

var bucket = storage.bucket("kb141-17d6a.appspot.com/AD_File");

