import nlp from "compromise";
import Typo from "typo-js";
import axios from "axios";

// Load the English dictionary
const dictionary = new Typo("en_US");

// Flask API URL
const FLASK_API_URL = "http://127.0.0.1:5000/predict";

// Hardcoded long feedback for different subjects
const subjectFeedbacks = {
  Mathematics: [
    "Your approach to solving the mathematical problems is commendable. You have demonstrated a clear understanding of concepts and applied them effectively. However, try to include more detailed steps for better clarity. Explaining each step in a structured manner allows for better comprehension and makes it easier for teachers or evaluators to follow your thought process. Additionally, while your calculations are mostly accurate, always double-check them to avoid minor errors that could impact the final answer. It is also beneficial to incorporate different methods for solving problems, such as alternative approaches that could provide additional insights. Understanding and practicing theorems will further strengthen your skills. If a question involves proofs, ensure that your logical flow is well-connected and backed by valid mathematical reasoning. ",
    "Good job on solving the problems! Your calculations are mostly accurate, but be careful with minor arithmetic mistakes. Revising theorems and formulas could further strengthen your performance. One way to ensure accuracy is to practice mental math alongside written calculations. The ability to simplify calculations mentally will save time during exams and improve overall efficiency. Additionally, focusing on formula derivation rather than rote memorization will deepen your conceptual understanding. Avoid skipping steps, especially in complex calculations, as each part of the solution plays a crucial role in deriving the correct answer. When dealing with geometry problems, using diagrams effectively will assist in visualization and comprehension. Try to create a structured revision plan, where you practice a mix of easy, medium, and difficult problems daily.",
    "You have displayed a strong grasp of mathematical concepts. However, some problems lack step-by-step explanations, which are essential for full marks. Focus on presenting your solutions in a structured way. The clarity in your approach will ensure that even a complex solution remains understandable to the evaluator. If a problem involves multiple steps, numbering them or breaking them down into smaller sub-problems can be a great way to maintain coherence. Additionally, whenever possible, include brief justifications for why a particular step was taken, as this strengthens your answer’s logical flow. Revisiting fundamental concepts, such as algebraic identities, logarithmic properties, and trigonometric functions, will enhance your fluency in problem-solving. Another useful practice is to attempt problems from past question papers to get a better understanding of frequently asked patterns.",
    "While your answers are mostly correct, avoid skipping important intermediary steps. A systematic approach will improve readability and reduce calculation errors. One common mistake students make is jumping to the final answer without clearly explaining the intermediate steps. This may lead to confusion and unnecessary point deductions during evaluations. To ensure clarity, write down all relevant formulas before substitution, and highlight key steps where necessary. If a problem is particularly lengthy, structuring it using bullet points or separate lines can enhance readability. Additionally, always double-check unit conversions, especially in applied mathematics topics such as physics-based calculations. Ensuring the correct usage of significant figures and decimal precision is also essential for accuracy. Learning through real-world examples, such as financial calculations or physics applications, can make abstract mathematical concepts more relatable.",
    "Your problem-solving skills are impressive! However, there are a few conceptual mistakes. Revisiting fundamental principles and practicing more will help refine your accuracy. Understanding the root cause of these errors is crucial for long-term improvement. Sometimes, conceptual errors stem from misunderstanding a definition or applying a formula incorrectly. Identifying these weak areas and dedicating extra time to revising them will significantly enhance your mathematical proficiency. Additionally, practicing questions in increasing difficulty order will build confidence and allow for gradual skill enhancement. One effective way to solidify your understanding is by teaching the concept to someone else. Explaining a problem aloud forces you to structure your thoughts logically, helping to internalize the concept better, or interactive problem-solving apps.",
  ],
  Science: [
    "Your response reflects a good understanding of scientific concepts. However, ensure to include more real-world examples to support your answers and strengthen your argument. Science is not just about theories but also about applications in daily life. Using relevant examples, such as explaining Newton’s laws through practical scenarios, will help solidify your explanations. Additionally, diagrams and labeled illustrations can enhance clarity, particularly in biology and physics. When discussing experimental results, ensure that you mention variables, control groups, and the significance of the data collected. Logical reasoning is a key component in science, so structuring your responses coherently is crucial. Keep practicing, and aim for in-depth explanations to improve further!",
    "Great attempt! Your explanation is mostly correct, but try to be more detailed in describing scientific processes and reasoning. A strong scientific response should not only state facts but also explain the 'why' behind them. For example, if discussing photosynthesis, elaborate on the chemical reactions involved and how environmental factors influence the process. Providing clear distinctions between concepts that are often confused, such as speed and velocity or mitosis and meiosis, will demonstrate deeper understanding. Using scientific terminology accurately is also essential. Engaging with research papers, science documentaries, and practical experiments will refine your ability to explain concepts comprehensively. Keep up the curiosity, and you’ll continue to excel!",
    "You have a solid grasp of the concepts, but some parts of your response lack clarity. Adding diagrams or structured explanations will enhance your answer. Many scientific topics involve complex interactions, and visual aids can simplify these processes for both you and the reader. Additionally, when discussing theories, always refer to supporting evidence or historical experiments that led to their establishment. In chemistry, for example, illustrating molecular structures and reaction mechanisms can make your response more precise. In physics, breaking down formulas and derivations step by step will help demonstrate a strong command of the subject. Keep refining your writing, and strive for thorough, well-supported answers!",
    "Your answers are well-structured, but avoid overgeneralizing scientific phenomena. Precision in explanation will improve your response quality. Science thrives on accuracy, so it is important to be specific rather than vague. Instead of saying 'plants need sunlight to grow,' you could specify that 'plants use sunlight for photosynthesis, where chlorophyll absorbs light energy to convert carbon dioxide and water into glucose and oxygen.' Such precision demonstrates a deeper understanding of the subject. Additionally, ensure that when citing scientific laws, you include their limitations or conditions for applicability. Participating in science quizzes, reading journals, and engaging in discussions will further strengthen your analytical skills. Keep up the good work!",
    "Good effort! However, some of your explanations are too brief. Providing more details and elaboration will make your response more comprehensive. Science is a subject where every detail matters. For example, when explaining genetic inheritance, specifying dominant and recessive traits using Punnett squares can add clarity. Similarly, in physics, clearly defining terms before using them in calculations will help avoid confusion. Relating concepts to real-life examples, such as explaining buoyancy using submarines or explaining electrical circuits using household appliances, makes learning more engaging. Make it a habit to expand on key points, anticipate follow-up questions, and support your claims with data or references. With continuous effort, your scientific reasoning skills will improve tremendously!",
  ],
  English: [
    "Your writing is well-structured and coherent. However, try to enhance your vocabulary and sentence variation to make your writing more engaging. Strong vocabulary and varied sentence structures keep the reader interested and improve the readability of your content. Avoid repetitive words by using synonyms, and experiment with different sentence lengths for better flow. Reading literature, essays, and well-crafted articles can expose you to diverse writing styles and improve your language skills. Also, ensure that your writing maintains a logical progression of ideas. Keep practicing, and your writing will continue to improve!",
    "Good attempt! Your grammar and sentence structure are mostly correct, but be cautious about passive voice usage and ensure clarity in your ideas. While passive voice is sometimes necessary, excessive use can make sentences less direct and harder to understand. Aim for active voice where possible to maintain clarity and engagement. Also, make sure each paragraph has a clear focus, and use transition words to create smooth connections between ideas. Proofreading your work before submission will help eliminate minor errors and enhance readability. Keep refining your writing, and great progress will follow!",
    "Your response is insightful and well-articulated. However, more examples and better paragraph transitions could improve readability. Strong essays and responses require clear, logical flow. Using relevant examples to support your arguments makes your writing more persuasive. Additionally, transition words such as 'furthermore,' 'moreover,' and 'consequently' can help link ideas smoothly. Revisiting well-written essays and analyzing their structure can provide valuable insights for improvement. Keep developing your writing skills, and you will see noticeable progress!",
    "The content is well-developed, but pay attention to grammar and spelling mistakes. Proofreading before submission will help in avoiding these minor errors. While your arguments and points are strong, occasional grammar mistakes can affect readability. Utilize grammar-checking tools or read your work aloud to spot inconsistencies. Also, ensure that your sentence structures are diverse and that your writing maintains a natural flow. Expanding your reading habits to include various writing styles can also be beneficial. Keep practicing, and your writing will become even more polished!",
    "Your writing is impressive, but avoid repetitive phrasing. Using a variety of sentence structures will make your work more compelling. Readers appreciate diversity in sentence construction, which enhances engagement and readability. Try incorporating rhetorical questions, parallelism, and varied punctuation to improve the dynamism of your writing. Avoid redundancy by ensuring each sentence contributes something new to your argument. Studying different writing styles and practicing regularly will help you refine your expression. Keep experimenting with your writing, and you’ll see remarkable improvements!",
  ],
  History: [
    "Your response is insightful, but adding more specific dates and historical figures will strengthen your argument. For example, when discussing the French Revolution, mentioning key events like the Storming of the Bastille (1789) or figures like Robespierre will provide depth. History is built on evidence, so always cite relevant events, treaties, and primary sources when possible. Keep analyzing historical trends, and your responses will become more compelling!",
    "Great job! However, ensure you discuss the long-term impact of historical events. Instead of just stating that World War II ended in 1945, elaborate on its consequences, such as the formation of the United Nations or the beginning of the Cold War. History is about understanding connections between past and present events, so always think critically about how events influenced future developments.",
    "Your essay structure is solid, but improving your use of comparisons will make your response more analytical. For instance, comparing the American and French Revolutions in terms of causes, leadership, and outcomes will demonstrate a deeper level of understanding. Additionally, discussing different perspectives, such as how colonizers and indigenous populations viewed imperialism, can make your analysis more nuanced.",
    "Your historical arguments are well-presented, but consider including more analysis of cause and effect. For example, when discussing the Industrial Revolution, don’t just state that new inventions were created—explain how these inventions changed society, working conditions, and global economies. Using historical maps, charts, and timelines can also help visualize important changes over time.",
    "Your response is detailed, but try to use more primary sources to support your arguments. Quoting speeches, letters, or treaties from historical figures can make your response more authentic. For instance, referencing Abraham Lincoln’s Gettysburg Address when discussing the American Civil War adds credibility. Reading historical documents and analyzing them critically will strengthen your historical interpretation skills.",
  ],
  Geography: [
    "Your understanding of geographical concepts is commendable! However, try to incorporate more examples and case studies to support your explanations. For instance, when discussing climate change, referring to real-world events like rising sea levels in the Maldives or deforestation in the Amazon can strengthen your answer. Additionally, maps and diagrams can enhance clarity, especially when describing landforms, weather patterns, or population distribution. Ensure that you use precise geographical terminology to make your responses more academically sound. Keep refining your answers, and your geographical analysis skills will continue to improve!",
    "Good attempt! Your response covers the key points well, but try to provide more in-depth explanations, especially for processes like plate tectonics, erosion, and urbanization. Instead of just stating facts, explain how they occur and their long-term effects. Additionally, using comparative analysis, such as how different types of climates affect agriculture, will make your answers more comprehensive. Engaging with atlases, satellite images, and geographic case studies can further enhance your spatial awareness. Keep practicing, and your geographical insights will become sharper!",
    "You have a strong grasp of geographical concepts, but some of your answers lack depth. Providing more details and structured explanations will enhance clarity. Geography is an analytical subject, so try to explain cause-and-effect relationships in more detail. For example, when discussing desertification, describe its human and natural causes and suggest mitigation strategies. Additionally, integrating statistics or current events will make your response more impactful. Keep working on elaboration, and your answers will become more refined!",
    "Your responses are well-organized, but avoid generalizations. Providing specific data or case studies will improve the quality of your answers. For instance, instead of stating that deforestation leads to biodiversity loss, mention how the destruction of the Amazon rainforest has affected species like jaguars and macaws. Furthermore, geographical models such as the Demographic Transition Model (DTM) or Von Thünen’s Model can add depth to your arguments. Keep focusing on precision, and your geography answers will stand out!",
    "Good effort! However, try to integrate more geographical perspectives, such as environmental, economic, and social impacts, when analyzing topics. Geography is an interdisciplinary field, so explaining how physical geography affects human activities (and vice versa) will enhance your responses. For example, when discussing urbanization, also consider its environmental consequences, such as pollution and loss of green spaces. Studying diverse geographical sources, including news articles and research papers, will strengthen your understanding. Keep up the great work!",
  ],
  Computer: [
    "Your understanding of computer science fundamentals is strong, but try to focus on writing more efficient and optimized solutions. When solving algorithmic problems, analyze the time and space complexity of your approach. For example, if you use brute force, consider if a greedy or dynamic programming method could improve efficiency. Also, commenting on your code and breaking it into modular functions will enhance readability and maintainability. Keep coding and refining your problem-solving skills!",
    "Great attempt! Your explanation is mostly correct, but ensure you include practical applications to make your response more engaging. For instance, if you discuss databases, provide real-world examples such as how e-commerce websites use SQL or NoSQL databases for managing transactions. Also, try to differentiate between similar concepts, such as HTTP vs. HTTPS or stack vs. queue, to showcase a clear grasp of the topic. Keep practicing, and your technical depth will improve!",
    "Your coding logic is sound, but be careful with syntax errors and edge cases. When writing code, always test with different inputs, including boundary values, to ensure your solution is robust. Additionally, in theoretical topics like computer networks or cybersecurity, refer to real-world case studies such as major data breaches or encryption techniques used in banking. Strengthening your debugging skills and learning best coding practices will greatly benefit you!",
    "Your response is well-structured, but try to use diagrams or flowcharts to explain complex topics. For example, when discussing data structures like trees or graphs, illustrating them visually can help convey your understanding more effectively. Similarly, when explaining sorting algorithms, a step-by-step breakdown with visual representations can enhance clarity. Incorporating graphical representations in your learning will make retention easier and responses more precise.",
    "Good effort! However, avoid memorizing concepts without fully understanding their implementation. Instead of just stating that recursion is useful, explain how it works with a base case and recursive calls. Writing small test programs to see concepts in action can solidify your understanding. Engaging with platforms like LeetCode, CodeChef, or contributing to open-source projects will enhance your practical knowledge. Keep coding and keep exploring!",
  ],
};

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
  const passiveVoiceCount = doc
    .sentences()
    .filter((s) => s.has("#PassiveVoice")).length;
  const activeVoiceCount = sentenceCount - passiveVoiceCount;

  // Tense Analysis
  const pastTenseCount = doc
    .sentences()
    .filter((s) => s.has("#PastTense")).length;
  const presentTenseCount = doc
    .sentences()
    .filter((s) => s.has("#PresentTense")).length;

  // Spell Errors Count (Ignoring Proper Nouns)
  const words = studentText.match(/\b\w+\b/g) || [];
  const spellingErrors = words.filter(
    (word) => !dictionary.check(word) && word[0] !== word[0].toUpperCase() // Ignore proper nouns
  ).length;

  // Grammar Errors Count
  const grammaticalErrors = passiveVoiceCount + longSentences / 2;

  // Vocabulary Count
  const intermediateWords = words.filter(
    (word) => word.length > 5 && word.length <= 8
  ).length;
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

    const finalScore = (score / 12) * assignment.totalMarks;
    const percentage = (finalScore / assignment.totalMarks) * 100;

    const subject = assignment.subject || "General";
    const longFeedbackOptions = subjectFeedbacks[subject] || [
      "Your response is evaluated based on standard academic criteria.",
    ];

    const aiLongFeedback =
      longFeedbackOptions[
        Math.floor(Math.random() * longFeedbackOptions.length)
      ];

    let aiShortFeedback =
      percentage > 90
        ? "Outstanding performance!"
        : percentage > 80
        ? "Great job!"
        : percentage > 70
        ? "Good effort!"
        : percentage > 60
        ? "Decent attempt!"
        : percentage > 50
        ? "Fair work!"
        : "Needs improvement.";

    return {
      aiShortFeedback,
      aiLongFeedback,
      aiMarks: parseInt(finalScore) || 0,
    };
  } catch (error) {
    console.error("Error communicating with Flask API:", error);
    return {
      aiShortFeedback: "AI evaluation failed.",
      aiLongFeedback: "Feedback is manually entered through the admin panel.",
      aiMarks: 0,
    };
  }
};

export default generateAIGrading;
