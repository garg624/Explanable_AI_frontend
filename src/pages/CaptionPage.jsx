import {useState} from "react";
import Uploader from "../components/Uploader.jsx";
import ImagePreviewer from "../components/ImagePreviewer.jsx";
import useAssetStore from "../store/assetStore.js";
import {LuPenTool} from "react-icons/lu";
import {generateCaption} from "../utils/captionGenerator.js";
import {useServerStore} from "../store/serverStore.js";

const CaptionPage = () => {
    const {currentImageUrl} = useAssetStore();
    const [caption, setCaption] = useState("");
    const [loading, setLoading] = useState(false);
    const {isServerActive} = useServerStore();

    const handleGenerateCaption = async () => {
        setLoading(true);
        try {
            const {generatedCaption} = await generateCaption(currentImageUrl);
            setCaption(generatedCaption);
        } catch (error) {
            console.error("Error generating caption:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-between gap-2 h-full">
            <div id="left-section" className="space-y-4">
                <Uploader/>
                <ImagePreviewer imageurl={currentImageUrl}/>
            </div>
            <div id="right-section" className="p-2 h-[55vh] flex flex-col items-start">
                <button
                    title={isServerActive ? 'Generate Caption' : 'Server Down'}
                    className={`flex items-center justify-center gap-2 p-2 bg-gradient-to-br ${isServerActive ? 'from-lime-400' : 'from-gray-400'} to-transparent`}
                    onClick={handleGenerateCaption}
                    disabled={loading || !isServerActive || !currentImageUrl}
                >
                    <span>{loading ? "Generating..." : "Generate Caption"}</span>
                    <LuPenTool/>
                </button>
                {loading && (
                    <div className="mt-4 text-center">
                        <p>Loading caption...</p>
                    </div>
                )}
                {!loading && caption && (
                    <div className="mt-4 w-full">
                        <p><strong>Generated Caption:</strong> {caption}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CaptionPage;
