import nlp from "compromise";
import Typo from "typo-js";
import axios from "axios";


// Load the English dictionary
const dictionary = new Typo("en_US");

// Flask API URL
const FLASK_API_URL = "http://127.0.0.1:5000/predict";

const generateAIGrading = async (studentText, assignmentText, assignment) => {
    // NLP Processing
    const doc = nlp(studentText);

    // Word Count
    const wordCount = studentText.split(/\s+/).length;

    // Sentence Count (More Accurate)
    const sentenceCount = doc.sentences().length;

    // Long Sentences (More than 20 words)
    const longSentences = doc
      .sentences()
      .filter((s) => s.text().split(/\s+/).length > 20).length;

    // Passive Voice Detection
    const passiveVoiceCount = doc.sentences().filter((s) => s.has("#PassiveVoice")).length;
    const activeVoiceCount = sentenceCount - passiveVoiceCount;

    // Tense Analysis
    const pastTenseCount = doc.sentences().filter((s) => s.has("#PastTense")).length;
    const presentTenseCount = doc.sentences().filter((s) => s.has("#PresentTense")).length;

    // Spell Errors Count (Ignoring Proper Nouns)
    const words = studentText.match(/\b\w+\b/g) || [];
    const spellingErrors = words.filter(
        (word) =>
            !dictionary.check(word) &&
            word[0] !== word[0].toUpperCase() // Ignore proper nouns
    ).length;

    // Grammar Errors Count
    const grammaticalErrors = passiveVoiceCount + longSentences / 2;

    // Vocabulary Count
    const basicWords = words.filter((word) => word.length <= 5).length;
    const intermediateWords = words.filter((word) => word.length > 5 && word.length <= 8).length;
    const advancedWords = words.filter((word) => word.length > 8).length;

    const rawData = {
      "Word Count": wordCount,
      "Sentence Count": sentenceCount,
      "Long Sentences": longSentences,
      "Active Voice Sentences": activeVoiceCount,
      "Passive Voice Sentences": passiveVoiceCount,
      "Past Tense Sentences": pastTenseCount,
      "Present Tense Sentences": presentTenseCount,
      "Spelling Errors": spellingErrors,
      "Grammatical Errors": grammaticalErrors,
      "Intermediate Vocabulary Words": intermediateWords,
      "Advanced Vocabulary Words": advancedWords,
    };

     try {
       // Send data to Flask API
       const response = await axios.post(FLASK_API_URL, rawData);
       const score = response.data.score;
       return {
         aiShortFeedback: "Flask API Score",
         aiLongFeedback: "Full Feedback",
         aiMarks: parseInt(score) || 0,
       };
     } catch (error) {
       console.error("Error communicating with Flask API:", error);
       return {
         aiShortFeedback: "AI evaluation failed. ",
         aiLongFeedback:
           "AI evaluation failed. Feedback is manually entered through the admin panel.",
         aiMarks: 0,
       };
     }
};


export default generateAIGrading;


