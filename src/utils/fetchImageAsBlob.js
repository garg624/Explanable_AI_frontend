export async function fetchImageAsBlob(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.error("Failed to fetch image. Status:", response.status);
            return null;
        }
        return await response.blob();
    } catch (error) {
        console.error("Error fetching image as Blob:", error);
        return null;
    }
}