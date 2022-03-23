/* eslint-disable indent */
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data, context) => {
  // get user and add custom claim (admin)
  return admin
    .auth()
    .getUserByEmail(data.email)
    .then((user) => {
      return admin.auth().setCustomUserClaims(user.uid, {
        admin: true,
      });
    })
    .then(() => {
      return {
        message: `Success! ${data.email} now is an admin.`,
      };
    })
    .catch((error) => {
      return error;
    });
});

// tidak bisa, sekarang harus upgrade ke blaze plan. perlu credit card.
