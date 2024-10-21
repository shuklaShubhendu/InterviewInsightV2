// server.js
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const axios = require('axios');
const cors = require('cors');
const pdf = require('pdf-parse'); // Make sure to install pdf-parse if reading PDFs
const app = express();

// Enable CORS
app.use(cors());

// Set up multer for file upload
const upload = multer({ dest: 'uploads/' });

// Route to handle resume submission
app.post('/submit-resume', upload.single('resume'), async (req, res) => {
  const { jobTarget } = req.body; // Get job target from request
  const resumeFile = req.file; // Get uploaded resume file

  try {
    const resumeData = await readResumeFile(resumeFile.path); // Read the resume file

    // Prepare the request for OpenAI
    const openAiResponse = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo', // Use the appropriate model
      messages: [
        {
          role: 'user',
          content: `Evaluate this resume for the role of ${jobTarget}: ${resumeData}`,
        },
      ],
      max_tokens: 100,
    }, {
      headers: {
        Authorization: `Bearer YOUR_OPENAI_API_KEY`, // Replace with your OpenAI API key
      },
    });

    // Extract ATS score and suggestions from the OpenAI response
    const atsScore = extractAtsScore(openAiResponse.data);
    const suggestions = extractSuggestions(openAiResponse.data);
    
    res.json({ atsScore, suggestions }); // Send response back to frontend
  } catch (error) {
    console.error('Error processing resume:', error); // Log error
    res.status(500).send('Error processing resume'); // Send error response
  }
});

// Function to read the resume file
const readResumeFile = async (filePath) => {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdf(dataBuffer);
  return data.text;
};

// Function to extract ATS score from OpenAI response
const extractAtsScore = (response) => {
  // Logic to parse the response to get the ATS score
  return Math.floor(Math.random() * 100); // Dummy logic
};

// Function to extract suggestions from OpenAI response
const extractSuggestions = (response) => {
  // Logic to parse the response to get suggestions
  return "Improve your project descriptions and add more technical skills."; // Dummy logic
};

// Start the server
app.listen(5000, () => console.log('Server running on port 5000'));
