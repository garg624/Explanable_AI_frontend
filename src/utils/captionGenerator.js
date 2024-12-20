import {Client} from "@gradio/client";
import {fetchImageAsBlob} from "./fetchImageAsBlob.js";

export async function generateCaption(imageUrl) {
    const client = await Client.connect("fancyfeast/joy-caption-alpha-two");

    const imageBlob = await fetchImageAsBlob(imageUrl);

    if (!imageBlob) {
        throw new Error("Failed to fetch image as Blob.");
    }

    const result = await client.predict("/stream_chat", {
        input_image: imageBlob,
        caption_type: "Descriptive",
        caption_length: "short",
        extra_options: [],
        name_input: "",
        custom_prompt: ""
    });

    return {
        promptUsed: result.data[0],
        generatedCaption: result.data[1]
    };
}

