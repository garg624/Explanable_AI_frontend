import {sidebarOpt} from "../data/sideOpts.jsx";

const SideBar = ({handleChange, currentPage}) => {
    return (
        <div className={"text-white flex flex-col gap-4"}>
            {
                sidebarOpt.map((option, index) => (
                    <button
                        aria-label={option.ttl}
                        key={index}
                        onClick={() => handleChange({[option.ttl]: option.id})}
                        title={option.ttl}
                        className={` ${option.ttl.toLowerCase() === Object.keys(currentPage)[0].toLowerCase() ? 'bg-gradient-to-r from-teal-400 to-gray-800' : ''} p-3 cursor-pointer w-min rounded-full bg-black/30 hover:bg-gradient-to-r hover:from-teal-400 hover:to-gray-800 hover:text-white`}
                    >
                        {option.icn}
                    </button>

                ))
            }
        </div>
    )
}

export default SideBar;