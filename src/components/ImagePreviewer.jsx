import useAssetStore from "../store/assetStore.js";
import {GoUnlink} from "react-icons/go";
import {PiImageBrokenDuotone, PiImagesSquareDuotone} from "react-icons/pi";

const ImagePreviewer = ({ imageurl }) => {
    const { setCurrentImage } = useAssetStore();

    const handleClearPreview = () => {
        setCurrentImage(null);
    };

    return (
        <div className={"flex items-center justify-center w-[55vw] h-[65vh]"}>
            {imageurl ? (
                <div className={"w-full h-full space-y-2"}>
                    <img src={imageurl} className={"w-full h-full"} alt="uploaded image" title="Uploaded Image" />
                    <button className={"flex items-center justify-center gap-2 rounded-sm p-2 bg-gradient-to-r from-red-600 to-red-400"} onClick={handleClearPreview}>
                        <GoUnlink />
                        <span>Clear Preview</span>
                    </button>
                </div>
            ) : (
                <div className={"w-full h-full rounded-md bg-gradient-to-br from-gray-700 to-transparent flex items-center justify-center"}>
                <PiImagesSquareDuotone size={200}/>
                </div>
            )}
        </div>
    );
};

export default ImagePreviewer;
