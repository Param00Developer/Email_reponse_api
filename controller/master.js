import { fetchLatestUnreadEmail, sendEmail } from "../config/email.js";
import { generate } from "../config/ai_response_builder.js";

let intervalId;

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
  try {
    intervalId = setInterval(sendEmailResponses, 30000); // Call sendEmail every 30 seconds
    return res.status(200).json({
      success: true,
      message: "Email sending started",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Error starting email sending",
    });
  }
}

async function responseCron() {
  try {
    startEmailSending();
  } catch (err) {
    console.error(`Error in cron for email :: ${err}`);
  }
}

async function closeAutomation(req, res) {
  try {
    clearInterval(intervalId);
    return res.status(200).json({
      success: true,
      message: "Automation stopped",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Error closing automation",
    });
  }
}
export { startEmailSending, closeAutomation };
