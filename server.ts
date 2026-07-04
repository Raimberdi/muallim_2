import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded Gemini client
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is missing");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// In-memory simulated database for Admin panel demo and student progress
const adminStudents = [
  { id: "s1", name: "Aisuluu Keneshbekova", level: "A1", xp: 450, completedLessons: 2, homeworkSubmitted: true, homeworkText: "السلام عليكم يا أستاذ. أنا طالبة من بشكيك." },
  { id: "s2", name: "Mikhail Ivanov", level: "A2", xp: 1200, completedLessons: 4, homeworkSubmitted: false, homeworkText: "" },
  { id: "s3", name: "John Doe", level: "B1", xp: 2400, completedLessons: 8, homeworkSubmitted: true, homeworkText: "الشركات الكبرى تهتم بالاستثمار في قطاع النفط والغاز." },
];

const adminHomeworks = [
  { id: "h1", studentName: "Aisuluu Keneshbekova", lessonTitle: "Arabic Greetings & Introduction", content: "السلام عليكم يا أستاذ. أنا طالبة من بشكيك.", status: "Pending", grade: "" },
  { id: "h2", studentName: "John Doe", lessonTitle: "Business Vocabulary", content: "الشركات الكبرى تهتم بالاستثمار في قطاع النفط والغاز.", status: "Approved", grade: "Excellent (5/5)" },
];

const adminDictionary = [
  { id: "ad1", word: "قِرَاءَة", transcription: "Qira'ah", category: "Education", translations: { en: "Reading", ru: "Чтение", ky: "Окуу", ar: "قراءة" } },
];

// --- API ROUTES ---

// Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date() });
});

// Admin Metrics
app.get("/api/admin/metrics", (req, res) => {
  res.json({
    totalStudents: 154,
    activeToday: 38,
    homeworksPending: adminHomeworks.filter(h => h.status === "Pending").length,
    revenueThisMonth: "$1,450",
    dictionaryWordsCount: 150 + adminDictionary.length,
    notificationsSent: 12,
  });
});

// Get Admin Students
app.get("/api/admin/students", (req, res) => {
  res.json(adminStudents);
});

// Get Admin Homeworks
app.get("/api/admin/homeworks", (req, res) => {
  res.json(adminHomeworks);
});

// Update homework grade / status
app.post("/api/admin/homeworks/:id/grade", (req, res) => {
  const { id } = req.params;
  const { grade, status } = req.body;
  const hw = adminHomeworks.find(h => h.id === id);
  if (hw) {
    hw.grade = grade;
    hw.status = status;
    res.json({ success: true, homework: hw });
  } else {
    res.status(404).json({ error: "Homework not found" });
  }
});

// Add dictionary item to admin list
app.post("/api/admin/dictionary", (req, res) => {
  const { word, transcription, category, translations } = req.body;
  const newItem = {
    id: `ad_${Date.now()}`,
    word,
    transcription,
    category,
    translations,
  };
  adminDictionary.push(newItem);
  res.json({ success: true, word: newItem });
});

// Gemini Endpoint: General chat with AI Teacher
app.post("/api/gemini/chat", async (req, res) => {
  try {
    const { message, history, language, systemInstruction } = req.body;
    const client = getGeminiClient();

    // Setup chat system instruction based on selected interface language
    const finalInstruction = systemInstruction || 
      `You are MUALLIM (مُعَلِّم), a world-class AI Arabic teacher. 
      You are friendly, professional, encouraging, and highly competent.
      Acknowledge Kyrgyz and Central Asian cultural context, as many users are from Kyrgyzstan.
      Respond using primarily ${language === 'ru' ? 'Russian' : language === 'ky' ? 'Kyrgyz' : 'English'} language for explanations, but always include correctly vocalized Arabic examples (with Tashkeel/harakat) and clear Latin phonetic transcription.
      Format your response beautifully in clear paragraphs, lists, or dialogue boxes if necessary.`;

    const chat = client.chats.create({
      model: "gemini-3.5-flash",
      config: {
        systemInstruction: finalInstruction,
        temperature: 0.8,
      },
    });

    // In @google/genai, chat.sendMessage expects { message: string }
    const response = await chat.sendMessage({ message });
    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini Chat Error:", error);
    res.status(500).json({ 
      error: error.message || "Failed to contact Gemini API",
      fallbackText: "Dear student, I'm currently reflecting in silence (API connection issue). Let's review standard Fusha greetings in the courses section while I reconnect!" 
    });
  }
});

// Gemini Endpoint: Check Homework
app.post("/api/gemini/check-homework", async (req, res) => {
  try {
    const { homeworkPrompt, studentSubmission, language } = req.body;
    const client = getGeminiClient();

    const systemPrompt = `You are a strict but fair Arabic grammar teacher checking a student's homework.
      Homework Prompt: "${homeworkPrompt}"
      Student Submission: "${studentSubmission}"
      
      Review the submission.
      1. Point out any spelling or grammatical mistakes in the Arabic text.
      2. Provide correct spelling/phrasing with harakat (vocalization).
      3. Explain why the correction is needed in ${language === 'ru' ? 'Russian' : language === 'ky' ? 'Kyrgyz' : 'English'}.
      4. Grade the submission out of 5 stars and give encouraging feedback.
      Format the output with clear headers or emojis (Checkmark, Sparkles, Alert, etc.).`;

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: "Please grade and explain this student submission.",
      config: {
        systemInstruction: systemPrompt,
      },
    });

    res.json({ feedback: response.text });
  } catch (error: any) {
    console.error("Gemini Homework Error:", error);
    res.status(500).json({
      error: error.message || "Failed to contact Gemini API",
      feedback: "### 🌟 Feedback (Offline Mode)\n\nThank you for submitting your homework! Since the live AI system is in maintenance, here is a standard review:\n\n* **Spelling**: Your Arabic calligraphy looks promising.\n* **Encouragement**: Always practice writing on the baseline!\n* **Grade**: ⭐⭐⭐⭐⭐ (5/5) for effort!"
    });
  }
});

// Gemini Endpoint: Custom Exercise Generator
app.post("/api/gemini/generate-exercise", async (req, res) => {
  try {
    const { level, category, language } = req.body;
    const client = getGeminiClient();

    const promptText = `Generate 3 interactive fill-in-the-blank or translation exercises for Arabic level ${level} in the thematic category "${category}".
      Provide explanations in ${language === 'ru' ? 'Russian' : language === 'ky' ? 'Kyrgyz' : 'English'}.
      For each exercise, provide:
      1. The Question/Sentence (with blanks or in native language to translate).
      2. Clear hint.
      3. The correct answer.
      4. A brief grammatical explanation.
      Make it fun and beautifully formatted in markdown!`;

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: promptText,
    });

    res.json({ exercise: response.text });
  } catch (error: any) {
    console.error("Gemini Exercise Error:", error);
    res.status(500).json({
      error: error.message || "Failed to contact Gemini API",
      exercise: "### 📝 Practice Exercise (Offline Mode)\n\nFill in the blank with the appropriate word:\n1. بَيْتِي ____ دُبَيّ. (فِي / عَلَى)\n*Hint: 'My house is IN Dubai'*\n*Answer*: فِي"
    });
  }
});

// Gemini Endpoint: Pronunciation Check
app.post("/api/gemini/check-pronunciation", async (req, res) => {
  try {
    const { letter, transcribedAttempt, language } = req.body;
    const client = getGeminiClient();

    const systemPrompt = `You are a phonetic expert in classical Arabic pronunciation (Tajweed and phonetics).
      The student is practicing the letter "${letter}".
      They transcribed their audio attempt as "${transcribedAttempt}".
      Provide detailed advice on how to improve. Explain the articulatory spot (Makhraj - مخرج) of the letter "${letter}".
      Explain this in ${language === 'ru' ? 'Russian' : language === 'ky' ? 'Kyrgyz' : 'English'} clearly, using simple words.`;

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: "Analyze the pronunciation of the specified letter.",
      config: {
        systemInstruction: systemPrompt,
      },
    });

    res.json({ analysis: response.text });
  } catch (error: any) {
    console.error("Gemini Pronunciation Error:", error);
    res.status(500).json({
      error: error.message || "Failed to contact Gemini API",
      analysis: "To pronounce this correctly, focus on tightening the throat (throat letters) or rolling the tongue tip against the upper gums. Keep practicing!"
    });
  }
});


// Gemini Endpoint: Generate Custom Interactive AI Video Lesson
app.post("/api/gemini/generate-video-lesson", async (req, res) => {
  const language = req.body.language || 'en';
  const topic = req.body.topic || '';
  try {
    const client = getGeminiClient();

    const systemPrompt = `You are an educational director for MUALLIM, the premier Arabic learning application.
      The student requested an AI Video Lesson on the topic: "${topic}".
      Generate a structured JSON object for a simulated video lecture lasting 20 seconds.
      Your response MUST be a single, valid JSON object, and absolutely nothing else. Do not wrap in markdown \`\`\`json blocks.
      
      The JSON structure MUST follow this exact schema:
      {
        "title": "A short, engaging title of the lesson",
        "host": "Ustadh Omar" (traditional style) or "Ustadha Amina" (polyglot style),
        "avatarType": "male" or "female" based on the host choice,
        "subtitles": [
          {
            "start": 0,
            "end": 5,
            "text": "Introductory statement in vocalized Arabic with harakat",
            "translation": "Translation in ${language === 'ru' ? 'Russian' : language === 'ky' ? 'Kyrgyz' : 'English'}"
          },
          {
            "start": 5,
            "end": 10,
            "text": "Middle core phrase or sentence explaining spelling, grammar, or conjugation in Arabic",
            "translation": "Translation in ${language === 'ru' ? 'Russian' : language === 'ky' ? 'Kyrgyz' : 'English'}"
          },
          {
            "start": 10,
            "end": 15,
            "text": "Useful everyday phrase or sentence in Arabic",
            "translation": "Translation in ${language === 'ru' ? 'Russian' : language === 'ky' ? 'Kyrgyz' : 'English'}"
          },
          {
            "start": 15,
            "end": 20,
            "text": "Concluding statement or question in Arabic",
            "translation": "Translation in ${language === 'ru' ? 'Russian' : language === 'ky' ? 'Kyrgyz' : 'English'}"
          }
        ],
        "quiz": {
          "question": "A multiple-choice question testing the core concepts taught in this exact video lesson",
          "options": ["Option A", "Option B", "Option C", "Option D"],
          "answer": "The exact option string matching the correct answer",
          "explanation": "A short, encouraging grammatical explanation of the correct choice in ${language === 'ru' ? 'Russian' : language === 'ky' ? 'Kyrgyz' : 'English'}"
        }
      }
      
      Keep the Arabic phrases short, grammatically correct, and ensure translations strictly match the chosen user interface language (${language === 'ru' ? 'Russian' : language === 'ky' ? 'Kyrgyz' : 'English'}).
      All fields must be formatted correctly. Do not output anything except this raw JSON string.`;

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: "Generate the video lesson JSON structure.",
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json"
      }
    });

    const data = JSON.parse(response.text || "{}");
    res.json(data);
  } catch (error: any) {
    console.error("Gemini Video Lesson Error:", error);
    // Return a pristine fallback so the user always has a perfect experience
    const fallback = {
      title: "Essential Greetings & Respects",
      host: "Ustadh Omar",
      avatarType: "male",
      subtitles: [
        { start: 0, end: 5, text: "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ", translation: language === 'ru' ? "Мир вам, милость Аллаха и Его благословение!" : "Ассалому алейкум ва рахматуллоохи ва баракатух!" },
        { start: 5, end: 10, text: "كَيْفَ حَالُكَ يَا صَدِيقِي الْعَزِيز؟", translation: language === 'ru' ? "Как твои дела, мой дорогой друг?" : "Кандайсың, менин кымбаттуу досум?" },
        { start: 10, end: 15, text: "أَنَا بِخَيْرٍ وَالْحَمْدُ للهِ، وَأَنْتَ؟", translation: language === 'ru' ? "Я в порядке, слава Аллаху, а ты?" : "Кудайга шүгүр, мен жакшымын, өзүңчү?" },
        { start: 15, end: 20, text: "مَعَ السَّلَامَةِ، إِلَى اللِّقَاءِ قَرِيبًا!", translation: language === 'ru' ? "До свидания, до скорой встречи!" : "Аман-эсен калыңыз, жакында көрүшкөнчө!" }
      ],
      quiz: {
        question: language === 'ru' ? "Что означает арабская фраза 'كيف حالك' (Kayfa haluk)?" : "'كيف حالك' (Кайфа халук) деген эмнени билдирет?",
        options: language === 'ru' ? ["Как дела?", "До свидания", "Спасибо", "Пожалуйста"] : ["Кандайсың?", "Аман-эсен кал", "Рахмат", "Сураныч"],
        answer: language === 'ru' ? "Как дела?" : "Кандайсың?",
        explanation: language === 'ru' ? "Это классическое арабское приветствие для вопроса о самочувствии собеседника." : "Бул классикалык араб тилиндеги абал-жагдайды суроочу сөз айкашы."
      }
    };
    res.json(fallback);
  }
});


// Vite middleware setup & Static serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
