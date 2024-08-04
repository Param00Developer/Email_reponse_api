import { fetchLatestUnreadEmail, sendEmail } from "../config/email.js";
import { generate } from "../config/ai_response_builder.js";

async function sendEmailResponses() {
  try {
    const emailDetails = await fetchLatestUnreadEmail();
    if (emailDetails) {
      const fromEmail = emailDetails.from.match(/<(.+)>/)[1];
      // console.log(`From: ${fromEmail}`);
      // console.log(`Subject: ${emailDetails.subject}`);
      // console.log(`Body: ${emailDetails.body}`);
      const responseEmail = await generate(
        emailDetails.subject,
        emailDetails.body
      );
      // console.log("🚀 ~ sendEmail ~ responseEmail:", responseEmail);
      const [subject, body] = responseEmail.split("----");
      console.log("🚀 ~ sendEmailResponses ~ subject:", subject);
      if (subject && body) {
        const subjectRegex = /^Subject:(.+)$/;
        const subjectData = subject.match(subjectRegex);
        console.log("🚀 ~ sendEmailResponses ~ subject:", subjectData[1]);
        console.log("🚀 ~ sendEmailResponses ~ fromEmail:", fromEmail);
        await sendEmail(fromEmail, subjectData[1], body);
      }
    } else {
      console.log("No unread messages found.");
    }
  } catch (err) {
    console.error(err);
  }
}
function startEmailSending(req, res) {
  setInterval(sendEmailResponses, 30000); // Call sendEmail every 30 seconds
}

export async function responseCron() {
  try {
    startEmailSending();
  } catch (err) {
    console.error(`Error in cron for email :: ${err}`);
  }
}

export default startEmailSending;
