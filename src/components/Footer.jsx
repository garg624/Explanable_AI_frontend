import { useEffect } from "react";
import { pageColors } from "../data/sideOpts.jsx";
import { useServerStore } from "../store/serverStore.js";
import { useFooterStore } from "../store/footerStore.js";
import {TbPlugConnected} from "react-icons/tb";
import axios from "axios";

const Footer = ({ pageId }) => {
    const pageKey = Object.keys(pageId)[0].toUpperCase();
    const pageColorClass = pageColors[pageKey] || "text-white";
    const backendConnected = useServerStore((state) => state.isServerActive);
    const { footerNote, footerNoteColor, setFooterNote } = useFooterStore();
    const {setIsServerActive} = useServerStore();

    useEffect(() => {
        if (footerNote) {
            const timer = setTimeout(() => setFooterNote(""), 5000);
            return () => clearTimeout(timer);
        }
    }, [footerNote, setFooterNote]);

    const handleReconnect = async () => {
        try {
            const response = await axios.get("http://localhost:8000");
            if (response.status === 200) {
                setIsServerActive(true);
                setFooterNote("Reconnected to server.")
            } else {
                setIsServerActive(false);
                setFooterNote("Unable to connect to server.")
            }
        } catch (error) {
            console.error("Error checking server status:", error);
        }
    }

    return (
        <footer className="text-white text-sm flex items-center justify-between p-3 absolute bottom-0 w-full">
            <div className="flex items-center justify-center gap-3">
                <div className={`w-2 h-2 rounded-full ring-4 ${backendConnected ? 'bg-green-700 ring-green-300' : 'bg-red-700 ring-red-400'}`}>
                </div>
                <p>{backendConnected ? 'Running' : 'Not Connected !'}</p>
                <div>{!backendConnected? <button title={"Reconnect"} onClick={handleReconnect}><TbPlugConnected size={20} /></button> : ''}</div>
            </div>
            <p className={` ${footerNote.length > 0 ? 'p-2' : ''} rounded-full bg-${footerNoteColor}-700 hover:scale-125`}>{footerNote}</p>
            <p className={`p-2 ${!backendConnected ? 'bg-gray-500' : pageColorClass}`}>{pageKey}</p>
        </footer>
    );
};

export default Footer;
