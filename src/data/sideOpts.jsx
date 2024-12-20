import {GiBurningEye} from "react-icons/gi";
import {LuBrainCircuit, LuGroup, LuPenTool} from "react-icons/lu";
import {MdOutlineModelTraining} from "react-icons/md";
import {GrTest} from "react-icons/gr";
import {FaUserCog} from "react-icons/fa";
import {BsFillPatchQuestionFill} from "react-icons/bs";

const sidebarOpt = [
    {
        name: "caption",
        icn: <LuPenTool size={25}/>,
        ttl: "Caption",
        id: 1,
    },
    {
        name: "compute",
        icn: <LuBrainCircuit size={25}/>,
        ttl: "Compute",
        id: 2,
    },
    {
        name: "classify",
        icn: <LuGroup size={25}/>,
        ttl: "Classify",
        id: 3,
    },
    {
        name: "train",
        icn: <MdOutlineModelTraining size={25}/>,
        ttl: "Train",
        id: 4,
    },
    {
        name: "test",
        icn: <GrTest size={25}/>,
        ttl: "Test",
        id: 5,
    },
    {
        name: "map",
        icn: <GiBurningEye size={25}/>,
        ttl: "Map",
        id: 6,
    },
    {
        name:'vqa',
        icn:<BsFillPatchQuestionFill  size={25}/>,
        ttl:'Vqa',
        id: 7,
    },
    {
        name: "user",
        icn: <FaUserCog size={25}/>,
        ttl: "User",
        id: 8,
    },

];

const pageColors = {
    CAPTION: "bg-blue-500",
    COMPUTE: "bg-purple-500",
    CLASSIFY: "bg-yellow-500",
    TRAIN: "bg-pink-500",
    TEST: "bg-orange-500",
    MAP: "bg-teal-500",
    VQA: "bg-red-500",
    USER: "bg-lime-500"
};

export {sidebarOpt, pageColors};