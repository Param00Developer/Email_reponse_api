# Email Response API

**Description:**  
The **Email Response API** is an automation tool designed to handle basic email responses efficiently. By leveraging Google's Gmail API and the Gemini AI platform, this application checks for new emails every 30 seconds and generates contextually appropriate, professionally-toned replies based on the content of the emails.  

This tool streamlines email management, saving users significant time and ensuring prompt responses.  

---

## Installation  

1. **Clone the repository:**  
   ```bash
   git clone https://github.com/Param00Developer/Email_reponse_api.git
   >>cd Email_reponse_api
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Obtain necessary credentials:**

- **Create a Google Cloud Platform project** and enable the Gmail API.
- **Generate a service account key** and download it as `credentials.json`.
- **Paste the `credentials.json` file** into the root directory of the project.
- **Obtain a Gemini API key**.  
4. **Set up environment variables:**

- Create a .env file in the project's root directory and configure the following:
  ```markdown
  API_KEY=your_gemini_api_key
  PORT=3000 # or your preferred port
  ```
5. **Start the application:**
   ```
   npm run start
   ```
## Features

- **Automated Email Response:** Automatically checks for unread emails every 30 seconds and replies based on their content.  
- **Gemini AI Integration:** Uses Gemini for intelligent response generation tailored to the context of the email.  
- **Professional Tone:** Ensures all responses maintain a formal and professional tone.  
- **Configurable Settings:** Users can adjust polling intervals and other parameters in the code.  
## Prerequisites

Before using this application, ensure the following:  

- **Node.js:** Install the latest version of Node.js.  
- **npm:** Node Package Manager is required for installing dependencies.  
- **Google Cloud Platform Account:** Gmail API must be enabled.  
- **Gemini API Key:** Required for AI-generated responses.  
## Dependencies

This project relies on the following libraries:  

- **`@google-cloud/local-auth`**: Simplifies local authentication with Google Cloud Platform.  
- **`@google/generative-ai`**: Facilitates interaction with the Gemini AI platform.  
- **`dotenv`**: Manages environment variables securely.  
- **`express`**: (Optional) Sets up a web server for additional functionality.  
- **`googleapis`**: Provides seamless access to Google's Gmail API.  
- **`nodemon`**: Enhances development by automatically restarting the server on changes.  
- **`readline`**: (Optional) Enables command-line input handling for interactive use.  

---

## Usage  

Once the application is running, it will:  

1. Connect to the user's Gmail account via the Gmail API.  
2. Monitor for new unread emails every 30 seconds (or as configured).  
3. Use the Gemini API to analyze email content and generate an appropriate reply.  
4. Send the generated response back to the sender automatically.  

---

## Future Enhancements  

- **Multi-Language Support:** Enable responses in various languages based on email content.  
- **Customizable Response Templates:** Allow users to define specific templates for different email types.  
- **Improved Sentiment Analysis:** Use AI to better understand the tone of incoming emails.  
- **Mobile App Integration:** Provide notifications and controls through a mobile application.  

---

## Contact  

For more details or to contribute to the project, connect via:  
**LinkedIn:** [Param Nautiyal](https://www.linkedin.com/in/paramnautiyal/)  

