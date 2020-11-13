const functions = require("firebase-functions");
const admin = require("firebase-admin");
const fs = require("fs");

admin.initializeApp();

exports.demo = functions.https.onRequest((req, res) => {
  let content = fs.readFileSync("demo.html").toString();
  content = content.replace("{headers}", JSON.stringify(req.headers));
  res.status(200).send(content);
});

exports.addMessage = functions.https.onRequest(async (req, res) => {
  const body = JSON.parse(req.body);
  const metadata = body.metadata || {};
  metadata.date = Date.now();
  const keys = [
    "referer",
    "user-agent",
    "x-forwarded-for",
    "x-appengine-city",
    "x-appengine-citylatlong",
    "x-appengine-country",
  ];
  keys.forEach((e) => {
    if (req.headers[e]) {
      metadata[e] = req.headers[e];
    }
  });
  let message = {
    metadata: metadata,
    content: body.content,
  };
  const writeResult = await admin
    .firestore()
    .collection(body.collection)
    .add(message);
  res.sendStatus(200);
});
