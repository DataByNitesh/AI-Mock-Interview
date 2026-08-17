import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config()

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const askGemini = async (prompt) => {
  const response = await ai.interactions.create({
    model: "gemini-3.6-flash",
    input: prompt,

    response_format: {
      type: "text",
      mime_type: "application/json",

      schema: {
        type: "array",
        items: {
          type: "object",
          properties: {
            question: {
              type: "string",
            },
          },
          required: ["question"],
        },
      },
    },
  });

  return JSON.parse(response.output_text);
};

export const evaluateInterview = async (evaluationData) => {
  const response = await ai.interactions.create({
    model: "gemini-3.6-flash",

    input: `
Evaluate the following interview questions and candidate answers.

Score each answer from 0 to 10.
Then provide an overall score from 0 to 10.
Provide overall feedback.

Return the result using exactly this structure:
{
  "evaluations": [
    {
      "questionIndex": 0,
      "score": 0
    }
  ],
  "overallScore": 0,
  "overallFeedback": ""
}

Interview data:
${JSON.stringify(evaluationData)}
`,

    response_format: {
      type: "text",
      mime_type: "application/json",
      schema: {
        type: "object",

        properties: {
          evaluations: {
            type: "array",
            items: {
              type: "object",
              properties: {
                questionIndex: {
                  type: "number",
                },
                score: {
                  type: "number",
                },
              },
              required: ["questionIndex", "score"],
            },
          },

          overallScore: {
            type: "number",
          },

          overallFeedback: {
            type: "string",
          },
        },

        required: ["evaluations", "overallScore", "overallFeedback"],
      },
    },
  });

  return JSON.parse(response.output_text);
};

export default ai;