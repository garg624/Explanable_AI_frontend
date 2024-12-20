import {useEffect, useRef, useState} from "react";
import useAssetStore from "../store/assetStore.js";
import {BiCloudLightning} from "react-icons/bi";
import {CiLink} from "react-icons/ci";
import {BsSendArrowUp} from "react-icons/bs";
import {useServerStore} from "../store/serverStore.js";

const Uploader = () => {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    const {addAsset, asset_public_url, setCurrentImage} = useAssetStore();
    const [isLinkOpened, setIsLinkOpened] = useState(false);
    const [linkInp, setLinkInp] = useState("");
    const {isServerActive} = useServerStore();

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget(
            {
                cloudName: "dsmd5zmhq",
                uploadPreset: "FSLXAI",
            },
            (error, result) => {
                if (!error && result && result.event === "success") {
                    const url = result.info.secure_url.toString();
                    addAsset(url);
                    setCurrentImage(url);
                }
            }
        );
    }, [addAsset, setCurrentImage]);

    const handleUseLastImage = () => {
        const lastUploadedUrl = asset_public_url[asset_public_url.length - 1];
        if (lastUploadedUrl) setCurrentImage(lastUploadedUrl);
        console.log(lastUploadedUrl);
    };

    const handleLinkSubmit = () => {
        if (linkInp.trim()) {
            addAsset(linkInp);
            setCurrentImage(linkInp);
            setLinkInp("");
            setIsLinkOpened(false);
        }
    };

    return (
        <div className={"flex items-center gap-4"}>
            <button
                aria-label={"image upload button"}
                title={"Click to upload your images."}
                className={`p-3 text-lg bg-gradient-to-br ${isServerActive? 'from-teal-300' :'from-gray-300'} to-transparent rounded-sm`}
                onClick={() => widgetRef.current.open()}
                disabled={!isServerActive}
            >
                Upload Image
            </button>
            {isLinkOpened ? (
                <div className={"flex items-center gap-2"}>
                    <input
                        type="text"
                        value={linkInp}
                        onChange={(e) => setLinkInp(e.target.value)}
                        placeholder="Enter image URL"
                        className={"p-3 border outline-none text-black"}
                    />
                    <BsSendArrowUp
                        className={"w-max bg-gradient-to-r from-lime-700 to-lime-300 cursor-pointer p-2 rounded-full"}
                        onClick={handleLinkSubmit} size={43}/>
                </div>
            ) : (
                <CiLink className={"w-max bg-gradient-to-r from-lime-700 to-lime-300 cursor-pointer p-2 rounded-full"}
                        onClick={() => setIsLinkOpened(true)} size={43}/>
            )}
            {asset_public_url.length > 0 && (
                <button
                    onClick={handleUseLastImage}
                    className={"w-max bg-gradient-to-r from-lime-700 to-lime-300 cursor-pointer p-2 rounded-full"}
                    title={"Use the last uploaded image"}
                >
                    <BiCloudLightning size={27}/>
                </button>
            )}
        </div>
    );
};

export default Uploader;
