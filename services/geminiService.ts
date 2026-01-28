
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeTenderDocument = async (text: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `请作为资深的电网招投标专家，分析以下招标文件内容，并提取关键信息。
    内容：${text}
    要求：总结招标重点、核心技术要求、潜在风险点、建议的竞争策略。`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING },
          requirements: { type: Type.ARRAY, items: { type: Type.STRING } },
          risks: { type: Type.ARRAY, items: { type: Type.STRING } },
          winningStrategy: { type: Type.STRING }
        },
        required: ["summary", "requirements", "risks", "winningStrategy"]
      }
    }
  });
  return JSON.parse(response.text);
};

export const generateProposalSection = async (sectionTitle: string, context: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `请为电网投标项目撰写“${sectionTitle}”部分。
    背景信息：${context}
    要求：专业、严谨，符合国家电网/南方电网的公文规范和技术标准。`,
    config: {
      temperature: 0.7,
      topP: 0.95
    }
  });
  return response.text;
};

export const chatWithExpert = async (message: string, history: any[]) => {
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: '你是一名电网招投标专家（GridBid Expert）。你精通电力系统、输变电工程规范、以及国网南网的招投标流程。你的回答应当专业、客观，并提供实操性的建议。'
    }
  });
  
  // Note: For simplicity in this prototype, we're not rebuilding full history here,
  // but just sending the latest message. In a real app, you'd feed previous turns.
  const response = await chat.sendMessage({ message });
  return response.text;
};
