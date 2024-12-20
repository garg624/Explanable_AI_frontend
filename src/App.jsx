import Header from './components/Header';
import SideBar from "./components/SideBar.jsx";
import {useEffect, useState} from "react";
import Footer from "./components/Footer.jsx";
import CaptionPage from "./pages/CaptionPage.jsx";
import ComputePage from "./pages/ComputePage.jsx";
import TrainPage from "./pages/TrainPage.jsx";
import TestPage from "./pages/TestPage.jsx";
import GradCamPage from "./pages/GradCamPage.jsx";
import ClassifyPage from "./pages/ClassifyPage.jsx";
import UserPage from "./pages/UserPage.jsx";
import axios from "axios";
import {useServerStore} from "./store/serverStore.js";
import {useFooterStore} from "./store/footerStore.js";
import VqaPage from "./pages/VqaPage.jsx";

function App() {
    const {setIsServerActive} = useServerStore();
    const {setFooterNote} = useFooterStore();
    useEffect(() => {
        const checkServerStatus = async () => {
            try {
                const response = await axios.get("http://localhost:8000");
                if (response.status === 200) {
                    setIsServerActive(true);
                    setFooterNote("Application Startup Complete.")
                } else {
                    setIsServerActive(false);
                    setFooterNote("Unable to connect to server.")
                }
            } catch (error) {
                console.error("Error checking server status:", error);
            }
        };

        checkServerStatus();
    }, []);
    const [currentPage, setCurrentPage] = useState({"Caption": 1});
    const renderer = (pageId) => {
        switch (pageId) {
            case "Caption":
                return <CaptionPage/>
            case "Compute":
                return <ComputePage/>;
            case "Train":
                return <TrainPage/>;
            case "Test":
                return <TestPage/>;
            case "Map":
                return <GradCamPage/>;
            case "Classify":
                return <ClassifyPage/>;
            case "User":
                return <UserPage/>;
            case 'Vqa':
                return  <VqaPage />
            default:
                return <CaptionPage/>
        }
    }

    return (
        <main className='font-inter bg-black/85 h-screen w-screen relative'>
            <Header text="FSL SYSTEM"/>
            <div id={"main-divider"} className={"flex w-screen"}>
                <div id={"left-section"} className={"w-max p-4"}>
                    <SideBar handleChange={setCurrentPage} currentPage={currentPage}/>
                </div>
                <div id={"right-section"} className={"text-white w-full p-4 h-full"}>
                    <div className={"w-full h-full"}>
                        {
                            renderer(Object.keys(currentPage)[0])
                        }
                    </div>
                </div>
            </div>
            <Footer pageId={currentPage}/>
        </main>
    );
}

export default App;
