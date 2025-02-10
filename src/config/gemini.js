

import  {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai";
  
  // const apiKey = process.env.GEMINI_API_KEY;
  // const apikey="AIzaSyCdE22emyq1YV4T7G2Ty7ASu5oXs8kvJqQ"

  const genAI = new GoogleGenerativeAI("AIzaSyCdE22emyq1YV4T7G2Ty7ASu5oXs8kvJqQ");
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  async function run(prompt) {
    const chatSession = model.startChat({
      generationConfig,
      history: [
      ],
    });
  
    const result = await chatSession.sendMessage(prompt);
    const response=result.response;
    console.log(response.text());
    return response.text()

  }
  
  export default run;