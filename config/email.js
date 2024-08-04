import fs from "fs";
import { google } from "googleapis";
import { authenticate } from "@google-cloud/local-auth"; // Import authenticate function

// Get the current working directory
const cwd = `${process.cwd()}\\`;

// If modifying these SCOPES
// const SCOPES = ["https://www.googleapis.com/auth/gmail.readonly"];
const SCOPES = ["https://www.googleapis.com/auth/gmail.modify"];

const auth = await authorize();

// Function to authorize the client using authenticate
async function authorize() {
  try {
    const auth = await authenticate({
      scopes: SCOPES,
      keyfilePath: cwd + "credentials.json", // Path to your credentials.json
      // tokenPath: TOKEN_PATH, // Path to store token.json
    });

    return auth;
  } catch (err) {
    console.error("Authentication failed:", err);
    throw err; // Propagate error for the caller to handle
  }
}

// Function to get the body of the email message
function getBody(payload) {
  let body = "";
  if (payload.parts) {
    for (const part of payload.parts) {
      if (part.mimeType === "text/plain") {
        body = Buffer.from(part.body.data, "base64").toString("utf8");
        break;
      }
    }
  } else if (payload.body) {
    body = Buffer.from(payload.body.data, "base64").toString("utf8");
  }
  return body;
}

// Function to list the latest unread messages
async function listUnreadMessages(auth) {
  const gmail = google.gmail({ version: "v1", auth });
  const res = await gmail.users.messages.list({
    userId: "me",
    q: "is:unread",
    maxResults: 1,
  });
  const messages = res.data.messages;
  if (!messages || messages.length === 0) {
    return { from: null, subject: null, body: null };
  }
  const messageId = messages[0].id;
  const messageRes = await gmail.users.messages.get({
    userId: "me",
    id: messageId,
  });
  const message = messageRes.data;
  const headers = message.payload.headers;
  let from, subject;

  for (const header of headers) {
    if (header.name === "From") {
      from = header.value;
    }
    if (header.name === "Subject") {
      subject = header.value;
    }
  }

  const body = getBody(message.payload);
  // Mark the message as read
  await gmail.users.messages.modify({
    userId: "me",
    id: messageId,
    requestBody: {
      removeLabelIds: ["UNREAD"],
    },
  });

  return { from, subject, body };
}

// Function to fetch the latest unread email details
export async function fetchLatestUnreadEmail() {
  try {
    const emailDetails = await listUnreadMessages(auth);
    return emailDetails;
  } catch (error) {
    console.error("Error fetching email details:", error);
  }
}

export async function sendEmail(to, subject, body) {
  const gmail = google.gmail({ version: "v1", auth });
  const email = [
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=UTF-8",
    `To: ${to}`,
    `Subject: ${subject}`,
    "",
    body,
  ].join("\r\n");
  const encodedMessage = Buffer.from(email)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  try {
    await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: encodedMessage,
      },
    });
    console.log("Email sent successfully!");
  } catch (error) {
    console.log("Error sending email:", error);
  }
}
