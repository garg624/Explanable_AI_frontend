import {GiBurningEye} from "react-icons/gi";

const GradCamPage = () => {

    const notebookUrl = 'https://colab.research.google.com/drive/12xF3zv74gH3Kiah4S6E8mQAKL57CqH3J?usp=sharing'
    return (
        <div id={"main-wrapper"}>
            <p className={"text-xl font-semibold"}>GradCam : Visual attention map</p>
            <button>
                <div style={{padding: '20px', textAlign: 'center'}}>
                    <div
                        className="bg-gradient-to-br from-orange-400 to-transparent  items-center justify-center flex gap-2 py-2 text-xl px-1">
                        <GiBurningEye size={25}/>
                        <a
                            href={notebookUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Open in Google Colab
                        </a>
                    </div>
                </div>
            </button>
        </div>
    )
}

export default GradCamPage;