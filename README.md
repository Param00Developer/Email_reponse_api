# Email reponse API

**Description:**
This project automates email responses by checking the latest email, generating a response using Gemini, and sending a professionally-toned reply via Google's Gmail API.

**Installation:**

1. Clone the repository: `git clone https://github.com/Param00Developer/Email_reponse_api.git `
2. Install dependencies: `npm install`

3. Obtain necessary credentials:
   - Create a Google Cloud Platform project and enable the Gmail API.
   - Generate a service account key and download it as `credentials.json`.
   - Obtain a Gemini API key.
4. Create a `.env` file at the root of your project and add the following variables:
   **Usage:**
5. Start the project: `npm run start`

**Prerequisites:**

- Node.js (latest version)
- npm
- Google Cloud Platform project with Gmail API enabled
- Gemini API key

**Dependencies:**

- `@google-cloud/local-auth`: For local authentication with Google Cloud Platform.
- `@google/generative-ai`: For interacting with Gemini AI.
- `dotenv`: For loading environment variables from a `.env` file.
- `express`: For creating a web server (if used).
- `googleapis`: For interacting with Google APIs, including Gmail.
- `nodemon`: For automatically restarting the server on code changes (development dependency).
- `readline`: For reading user input from the command line (if used).

**Contact:**
https://www.linkedin.com/in/paramnautiyal/
