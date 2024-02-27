import React, { useState } from "react"
import { Link } from "react-router-dom"
import * as components from "../components"

/**
   * Renders a data item component.
   *
   * @component
   * @param {Object} props - The component props.
   * @param {Object} props.data - The data object.
   * @param {number} [props.largeur=window.innerWidth] - The width of the component.
   * @returns {JSX.Element} The rendered DataItem component.
   */
const CardItem = ({ data, largeur = window.innerWidth }) => {
    const [isOpen, setIsOpen] = useState(false)

    let troncature = largeur / 100

    let name =
        data.name.length > (troncature) ? data.name.substring(0, troncature) + "..." : data.name

    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [showDescriptionName, setShowDescriptionName] = useState(false);
    const [showDescriptionLink, setShowDescriptionLink] = useState(false);

    const handleMouseMoveName = (event) => {
        setPosition({ x: event.clientX, y: event.clientY });
        setShowDescriptionName(true);
    };

    const handleMouseMoveLink = (event) => {
        setPosition({ x: event.clientX, y: event.clientY });
        setShowDescriptionLink(true);
    };

    const handleMouseLeave = () => {
        setShowDescriptionName(false);
        setShowDescriptionLink(false);
    };

    return (
        <div
            className="flex flex-col m-2 bg-gray-100 rounded-lg p-4 justify-between items-center"
            id={data.id}
            name={data.link_name}
        >
            <div className="flex flex-col items-center justify-center text-center h-full"
                onMouseMove={handleMouseMoveName} onMouseLeave={handleMouseLeave}>
                {data.thumnail_logo === "test_thumnail" ? (
                    <img src={data.icon_logo} className="h-20" />
                ) : (
                    <img src={data.thumnail_logo} className="max-h-20" />
                )}
                {showDescriptionName && <components.Description data={data.name} style={{ position: 'fixed', top: position.y, left: position.x }} />}
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
                <div className="flex items-center"
                    onMouseMove={handleMouseMoveLink} onMouseLeave={handleMouseLeave}>
                    <img
                        src={data.icon_logo}
                        alt="Tuple"
                        className="w-12 h-12 object-contain"
                    />
                    <Link
                        className="ml-4 font-semibold text-main_color"
                        to={data.link_name}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {name}
                    </Link>
                    {showDescriptionLink && <components.Description data={data.link_name} style={{ position: 'fixed', top: position.y, left: position.x }} />}
                </div>
                <div className="ml-2">
                    <button
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <span>Open options</span>
                        {isOpen && <components.OptionsItem id={data.id} />}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CardItem