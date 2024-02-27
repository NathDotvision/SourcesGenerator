/**
 * Renders a description component.
 *
 * @param {Object} props - The component props.
 * @param {string} props.data - The description data.
 * @param {Object} props.style - The inline style for the description to change position.
 * @returns {JSX.Element} The rendered description component.
 */
const Description = ({ data, style }) => {
    return (
        <div style={style} className="bg-secondary_color_light rounded-md px-3 py-2 text-sm text-black shadow-sm">
            <p>{data}</p>
        </div>
    )
}

export default Description;