"use server"

import { authOptions } from "@/app/auth";
import { getServerSession } from "next-auth";
import { AzureOpenAI } from "openai";
import postNote from "../user/postNote";

const prompt : string = `You are a transcript summarizer. Given a full audio transcript, return a structured and concise summary that represents the key points from the perspective of the transcript itself. Your response must follow this exact format, using the delimiter TITLE::: for the title and SUMMARY::: for the summary, so it can be easily parsed in JavaScript.

Example format:
TITLE::: [Insert concise title here]
SUMMARY::: [Insert brief summary here]

Use a tone that sounds like the transcript is telling the story of what was said. Keep the summary informative and reflective of the most important or interesting moments.

Return only the formatted response — no introductions, explanations, or closing remarks.

Example input:
"Today’s episode focused on the future of remote work. It began with insights from Jason, a tech CEO who transitioned his 500-person company to fully remote. He discussed how productivity actually increased after the shift. Later, Dr. Mei, a behavioral economist, shared research on the psychological impacts of remote work and how companies can support team well-being in distributed environments."

Expected output:
TITLE::: Rethinking the Remote Office
SUMMARY::: Captured a deep dive into how remote work is reshaping business. Jason, a tech CEO, talked about moving his entire company online and the surprising rise in productivity. Then Dr. Mei explored the mental health side of remote work, offering insights into how companies can adapt to support their teams.

Some considerations:
- Make sure the summary doesn't uneccassarily use more words. Be like Paul Graham, only say what you need to say.
- Be consise and brief without losing the crux of what's going on.
- The summary takes on the same persepective as that of the transcipt, for instance, do not summarize the script in third person if the script is writtern in first person
- Make sure you maintain the tense of the transcript as well.        
- if the transcript is empty, return title as "NO INPUT." and summary as "NO INPUT PROVIDED."
`


interface stateType {
    sender: string,
    response: string, 
    date: string
}

export default async function transcript(prevState: any, formData: FormData):Promise<stateType> {
    
    const session = await getServerSession(authOptions);
    

    const file = formData.get("audio") as File;
    if (file.size === 0) {
        return {
            sender: "",
            response: "No audio file provided",
            date: ""
        };
    }

    // Convert audio file to required format
    const arrayBuffer = await file.arrayBuffer();
    const audioFile = new File([arrayBuffer], "transcript.webm", { type: "audio/webm"});

 
    // Initialize Azure OpenAI client
    const whisperClient = new AzureOpenAI({
        deployment: process.env.AZURE_WHISPER_DEPLOYMENT_NAME,
        endpoint: process.env.AZURE_WHISPER_ENDPOINT,
        apiVersion: "2024-02-01", // Use a stable API version
        apiKey: process.env.AZURE_WHISPER_API_KEY
    });


    const gptClient = new AzureOpenAI({
        deployment: process.env.AZURE_GPT_DEPLOYMENT_NAME,
        apiVersion: "2024-12-01-preview",
        apiKey: process.env.AZURE_GPT_API_KEY,
        endpoint: process.env.AZURE_GPT_ENDPOINT
        
    })

    try {
        const transcription = await whisperClient.audio.transcriptions.create({
            model: "whisper",
            file: audioFile,
        });

        console.log("Transcription Complete.")


        const response = await gptClient.chat.completions.create({
            messages: [
              { role:"system", content: prompt },
              { role:"user", content: transcription.text}
            ],
            max_tokens: 4096,
              temperature: 1,
              top_p: 1,
              model: "gpt-4.1"
          });

        console.log("Summarizing Complete.");

        if(session?.user){
            const transcriptArray =     response.choices[0].message.content?.split("\n");
            const transcriptTitle =     transcriptArray?.[0].split(":::")[1] ;
            const transcriptSummary =   transcriptArray?.[1].split(":::")[1];
            const title   = transcriptTitle || "Oops!"
            const summary = transcriptSummary || "Something went wrong.Please try again."
            await postNote({
                title: title,
                summary: summary
            })
        }




          return  {
            sender: "",
            response: response.choices[0].message.content || "",
            date: String(new Date())
          }

    } catch (error) {
        console.error("Failed:", error);
        return {
            sender:"",
            response: "Error processing audio/summary",
            date: ""
        };
    }
}