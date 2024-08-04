fetchLatestUnreadEmail().then((emailDetails) => {
  if (emailDetails) {
    const fromEmail = emailDetails.from.match(/<(.+)>/)[1];
    console.log(`From: ${fromEmail}`);
    console.log(`Subject: ${emailDetails.subject}`);
    console.log(`Body: ${emailDetails.body}`);
  } else {
    console.log("No unread messages found.");
  }
});