
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Spotify = () => {
    const handleClick = async (e) => {
        props.deleteWidget(widgetId);
    };
    return (
        <div className="flex flex-col justify-center py-12">
            <div className="relative max-w-xl mx-auto">
                <div className="relative bg-white shadow-lg rounded-3xl p-4 bg-clip-padding bg-opacity-60 border border-gray-100">
                    <div className="absolute top-2 right-1"> <button className="pr-2" onClick={handleClick}><FontAwesomeIcon className="h-3" icon={faTrashAlt}></FontAwesomeIcon></button></div>
                    <div>
                        <h1 className="p-8">Spotify</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Spotify;