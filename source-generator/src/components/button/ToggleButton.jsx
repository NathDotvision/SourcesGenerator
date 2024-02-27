import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline"

/**
 * ToggleButton component.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.show - Flag indicating whether the button is currently showing.
 * @param {function} props.setShow - Function to toggle the show state of the button.
 * @param {string} props.title - The title of the button.
 * @returns {JSX.Element} - The ToggleButton component.
 */
const ToggleButton = ({ show, setShow, title }) => (
    <button
        className="text-xl font-bold tracking-tight text-main_color_light sm:text-2xl flex jutify-center items-center"
        onClick={() => setShow(!show)}
    >
        <h1>{title}</h1>
        {show ? (
            <ChevronDownIcon className="ml-2 block h-6 w-6 flex" />
        ) : (
            <ChevronUpIcon className="ml-2 block h-6 w-6 flex" />
        )}
    </button>
);

export default ToggleButton;