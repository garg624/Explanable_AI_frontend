import useAssetStore from "../store/assetStore.js";
import Uploader from "../components/Uploader.jsx";
import ImagePreviewer from "../components/ImagePreviewer.jsx";
import { useServerStore } from "../store/serverStore.js";
import { LuBrainCircuit } from "react-icons/lu";
import { useState } from "react";
import axios from "axios";

const ComputePage = () => {
    const { currentImageUrl } = useAssetStore();
    const { isServerActive } = useServerStore();
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleComputeClass = async () => {
        if (!currentImageUrl) return;

        setLoading(true);
        setResult(null);

        try {
            const response = await axios.post("http://localhost:8000/zero-shot/", {
                image_url: currentImageUrl
            });

            if (response.data.error) {
                console.error("API Error:", response.data.error);
                setResult({ error: response.data.error });
            } else {
                setResult(response.data);
            }
        } catch (error) {
            console.error("Request Error:", error);
            setResult({ error: "Failed to fetch classification results." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center gap-2 h-full">
            <div className="space-y-4">
                <Uploader />
                <ImagePreviewer imageurl={currentImageUrl} />
            </div>
            <div className="w-full h-[55vh] p-2 space-y-4">
                <p className="text-xl font-bold">ZSL COMPUTED CLASS</p>
                <button
                    title={isServerActive ? 'Compute Class' : 'Server Down'}
                    className={`flex items-center justify-center gap-2 p-2 bg-gradient-to-br ${isServerActive ? 'from-lime-400' : 'from-gray-400'} to-transparent`}
                    onClick={handleComputeClass}
                    disabled={loading || !isServerActive || !currentImageUrl}
                >
                    <span>{loading ? "Generating..." : "Compute Class"}</span>
                    <LuBrainCircuit />
                </button>

                {result && (
                    <div className="mt-4">
                        {result.error ? (
                            <p className="text-red-500">{result.error}</p>
                        ) : (
                            <div>
                                <p><strong>Caption:</strong> {result.image_caption}</p>
                                <p><strong>Detected Objects:</strong></p>
                                <ul>
                                    {result.detected_objects.map((obj, index) => (
                                        <li key={index}>
                                            {obj.label} - Confidence: {obj.confidence.toFixed(2)}
                                        </li>
                                    ))}
                                </ul>
                                <p><strong>CLIP Similarities:</strong> {result.clip_similarities.join(", ")}</p>
                                <p><strong>Labels:</strong> {result.labels.join(", ")}</p>
                                {/*<p><strong>SHAP Values:</strong> {JSON.stringify(result.shap_values)}</p>*/}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ComputePage;
