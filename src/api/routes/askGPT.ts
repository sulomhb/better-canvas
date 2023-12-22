import { OPENAI_API_KEY } from "../env";
import express from "express";
import OpenAI from "openai";

const router = express.Router();

const openai = new OpenAI({
  apiKey: `${OPENAI_API_KEY}`,
});

router.get("/askGPT/:content", async (req, res) => {
  const { content } = req.params;
  try {
    console.log("Running: GPT");
    const params: OpenAI.Chat.ChatCompletionCreateParams = {
      messages: [{ role: "user", content: content }],
      model: "gpt-3.5-turbo",
    };
    const chatCompletion: OpenAI.Chat.ChatCompletion =
      await openai.chat.completions.create(params);
    console.log(chatCompletion.choices[0].message);
    const responseData = chatCompletion.choices[0].message;
    res.status(200).json({ data: responseData });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
