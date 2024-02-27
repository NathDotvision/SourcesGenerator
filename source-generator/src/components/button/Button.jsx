/**
   * ButtonItem component.
   *
   * @component
   * @param {Object} data - The data object containing the button information.
   * @param {Function} data.action - The action to be performed when the button is clicked.
   * @param {string} data.name - The name of the button.
   * @returns {JSX.Element} The rendered ButtonItem component.
   */
const ButtonItem = ({ data }) => (
    <button
        onClick={data.action}
        className="rounded-md bg-main_color px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-main_color_light hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
        {data.name}
    </button>
)

export default ButtonItem