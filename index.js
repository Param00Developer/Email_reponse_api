import express from "express";

import startEmailSending from "./controller/master";

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
try {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
} catch (err) {
  console.log(`Error while using port ::${err}`);
}

app.get("/health", (req, res) => {
  res.send("Server is running").status(200);
});

app.get("/intitate", startEmailSending);
