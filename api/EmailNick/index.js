const sgMail = require("@sendgrid/mail");
const result = require("dotenv").config({ path: "./sendgrid.env" });

if (result.error) {
  throw result.error;
}
// console.log(result.parsed);

module.exports = async function (context, req) {
  const Fromemailaddress = req.body.email;
  const message = req.body.message;

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: "nickdm26@gmail.com", // Change to your recipient
    from: "nickdm26@gmail.com", // Change to your verified sender
    subject: "Portfolio Message from: " + Fromemailaddress,
    text: message,
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });

  context.res = {
    // status: 200, /* Defaults to 200 */
    // body: responseMessage,
  };
};
