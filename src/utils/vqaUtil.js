import {Client} from "@gradio/client";
import {fetchImageAsBlob} from "./fetchImageAsBlob.js";

export async function generateAnswer(imageUrl, question) {
    const client = await Client.connect("Harzis/Visual_question_answering");

    const imageBlob = await fetchImageAsBlob(imageUrl);

    if (!imageBlob) {
        throw new Error("Failed to fetch image as Blob.");
    }

    const result = await client.predict("/predict", [imageBlob, question.toString()]);

    return {
        answer: result.data
    };
}