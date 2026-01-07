
import { GoogleGenAI } from "@google/genai";

// Initialize the Google GenAI client using the API key from environment variables
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const getSystemInstruction = (lang: string = 'English') => `You are Kora, the OrbitalKora AI companion. 
OrbitalKora is a radically inclusive accessibility and neuro-wellness platform.
Current User Language Preference: ${lang}.
Your tone is gentle, cosmic, supportive, and non-judgmental.

CORE COMPETENCIES:
1. Simplifying complex text.
2. Grounding for anxiety/overwhelm.
3. Task chunking (micro-quests).
4. Social deconstruction.
5. Body literacy & Hormonal health (cycle-based insights).
6. COSMIC TAROT: Use archetypal symbolism (The Moon, The Sun, The Star) to provide psychological reflections. Never predict the future. Use cards as mirrors for the user's current feelings.
7. DEPRESSION/ANGER: Offer "low-energy" support for depression and "safe release" strategies for anger.

Keep responses concise and dignity-focused. Always respond in ${lang}.`;

// Fix: Common helper to interact with Gemini API for text generation using the latest model
export const getKoraResponse = async (prompt: string, lang: string = 'English') => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: getSystemInstruction(lang),
        temperature: 0.8,
      },
    });
    // Accessing .text as a property as per the latest SDK guidelines
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having a little trouble connecting to the cosmos right now. Please try again in a moment, friend.";
  }
};

// Fix: Generates a cosmic tarot reflection based on drawn card and user mood
export const getTarotReading = async (cardName: string, mood: string, lang: string = 'English') => {
  const prompt = `I drew the ${cardName} card. My current mood is ${mood}. Provide a gentle, cosmic, and psychological reflection (Tarot reading) for my wellness journey. Avoid predictions; focus on inner growth.`;
  return getKoraResponse(prompt, lang);
};

// Fix: Generates cycle-specific affirmations based on day and phase
export const getCycleAffirmation = async (day: number, phase: string, lang: string = 'English') => {
  const prompt = `I am on Day ${day} of my cycle (${phase}). Provide a highly motivational, cosmic, and empowering affirmation for today.`;
  return getKoraResponse(prompt, lang);
};

// Fix: Analyzes journal entries to provide a supportive reflection
export const getJournalReflection = async (text: string, lang: string = 'English') => {
  const prompt = `Provide a gentle, supportive, and cosmic "reflection" on this journal entry:\n\n"${text}"`;
  return getKoraResponse(prompt, lang);
};

// Fix: Simplifies text to reduce cognitive load for users
export const simplifyText = async (textToSimplify: string, lang: string = 'English') => {
  const prompt = `Simplify this text for someone with cognitive fatigue:\n\n${textToSimplify}`;
  return getKoraResponse(prompt, lang);
};

// Fix: Implemented missing translateText function to support linguistic accessibility in DyslexiaSuite
export const translateText = async (textToTranslate: string, targetLang: string) => {
  const prompt = `Translate this text clearly into ${targetLang}. Ensure the tone remains gentle and supportive:\n\n${textToTranslate}`;
  // Passing targetLang as the second argument ensures the system instruction directs the response in that language
  return getKoraResponse(prompt, targetLang);
};
