import {useState} from "react";
import {BsFillPatchQuestionFill} from "react-icons/bs";
import Uploader from "../components/Uploader.jsx";
import ImagePreviewer from "../components/ImagePreviewer.jsx";
import useAssetStore from "../store/assetStore.js";
import {generateAnswer} from "../utils/vqaUtil.js";
import {useServerStore} from "../store/serverStore.js";

const VqaPage = () => {
    const [question, setQuestion] = useState("");
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const {currentImageUrl} = useAssetStore();
    const {isServerActive} = useServerStore();

    const handleAskQuestion = async () => {
        setLoading(true);
        try {
            const {answer} = await generateAnswer(currentImageUrl, question);
            setResponse(answer);
        }catch (error) {
            console.log(`Error generating answer: ${error}`);
        }
        finally {
            setLoading(false);
        }
    };


    return (
        <div className="flex items-center justify-center gap-2 h-full">
            <div className={"space-y-4"}>
                <Uploader />
                <ImagePreviewer imageurl={currentImageUrl}/>
            </div>
            <div className="w-full max-w-lg p-4 space-y-4">
                <p className="text-xl font-bold">Ask a Question</p>
                <textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Type your question here..."
                    className="w-full p-2 border border-gray-300 rounded text-black"
                    rows="4"
                />
                <button
                    title={isServerActive ? 'Ask Question' : 'Server Down'}
                    className={`cursor-pointer flex items-center justify-center gap-2 p-2 bg-gradient-to-br ${!isServerActive ? 'from-gray-400' : 'from-lime-400'} to-transparent`}
                    onClick={handleAskQuestion}
                    disabled={loading || !question.trim()}
                >
                    {
                        isServerActive ?
                            <span>{loading ? "Asking..." : "Ask Question"}</span> :
                            <span>Ask Question</span>
                    }
                    <BsFillPatchQuestionFill/>
                </button>

                {response && (
                    <div className="mt-4">
                        {response.error ? (
                            <p className="text-red-500">{response.error}</p>
                        ) : (
                            <p><strong>Answer:</strong> {response}</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default VqaPage;
