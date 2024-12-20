import useUserStore from "../store/userStore.js";
import {MdOutlineCloudSync} from "react-icons/md";
import {LuArrowDown01} from "react-icons/lu";
import useAssetStore from "../store/assetStore.js";
import {useFooterStore} from "../store/footerStore.js";
import axios from "axios";
import {useServerStore} from "../store/serverStore.js";

const UserPage = () => {
    const {username, userid, active_api, total_calls, usageStatus, settingSync, setUserDetails} = useUserStore();
    const {setFooterNote} = useFooterStore();
    const {resetAssets} = useAssetStore();
    const {setIsServerActive} = useServerStore();
    const handleAssetClearing = () => {
        resetAssets();
        setFooterNote("Assets cleared", "red");
    }
    const handleReconnect = async () => {
        try {
            const response = await axios.get("http://localhost:8000");
            if (response.status === 200) {
                setIsServerActive(true);
                setFooterNote("Reconnected to server.", "blue")
            } else {
                setIsServerActive(false);
                setFooterNote("Unable to connect to server.", "red")
            }
        } catch (error) {
            console.error("Error checking server status:", error);
        }
    }
    return (
        <div id={"main-wrapper"} className={"w-full select-none"}>
            <div id={"user-info-wrapper"} className={"w-1/2 text-xl leading-loose shadow-sm p-2 shadow-black"}>
                <div className="flex justify-between">
                    <p>Username:</p>
                    <p>{username}</p>
                </div>
                <div className="flex justify-between">
                    <p>Userid:</p>
                    <p>{userid.slice(25, 36)}</p>
                </div>
                <div className="flex justify-between">
                    <p title={"Active API Services chosen by the user."}>Active API:</p>
                    <p>{active_api}</p>
                </div>
                <div className="flex justify-between">
                    <p title={"Total API calls made by the users (both hit and fault)."}>Total Calls:</p>
                    <p>{total_calls}</p>
                </div>
                <div className={`flex justify-between p-2 ${
                    !usageStatus
                        ? 'bg-gradient-to-r from-red-400 to-transparent'
                        : 'bg-gradient-to-r from-green-400 to-transparent'
                }`}>
                    <p title={"User status of the API usage, not using the API's for 10 days can make the status InActive."}
                       className={"text-white"}>Usage Status:</p>
                    <div className={"flex items-center gap-2"}><p
                        className={"text-white"}>{usageStatus ? 'Active' : "InActive"}</p>
                        {
                            !usageStatus && <button onClick={() => setUserDetails({usageStatus: true})}>
                                <LuArrowDown01
                                    title={"Force Activate"}
                                    className={"p-1 rounded-full bg-black/30 cursor-pointer hover:bg-gradient-to-r hover:from-lime-400 hover:to-gray-800 hover:scale-110"}
                                    size={30}
                                />
                            </button>
                        }
                    </div>
                </div>
                <div className={"flex items-center gap-3 justify-between"}>
                    <p>Syncing:</p>
                    <div className={"flex items-center gap-2"}>
                        <p>{settingSync ? 'ON' : 'OFF'}</p>
                        <MdOutlineCloudSync
                            title={"Sync Now"}
                            className={
                                "p-1 rounded-full bg-black/30 cursor-pointer hover:bg-gradient-to-r hover:from-orange-400 hover:to-gray-800 hover:scale-110"
                            }
                            size={30}
                        />
                    </div>
                </div>
            </div>
            <button className={"p-2 bg-gradient-to-br from-red-400 to-transparent rounded-sm"}
                    onClick={handleAssetClearing}>Clear Assets
            </button>
            <button className={"p-2 bg-gradient-to-br from-teal-400 to-transparent rounded-sm"}
                    onClick={handleReconnect}
            >
                Force Reconnect
            </button>
        </div>

    )
}

export default UserPage;