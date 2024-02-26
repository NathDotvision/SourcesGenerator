/**
 * Renders an image card component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the image card.
 * @param {string} props.imagePath - The path to the image.
 * @param {string} props.description - The description of the image card.
 * @returns {JSX.Element} The rendered ImageCard component.
 */
const ImageCard = ({ title, imagePath, description }) => {
  return (
    <div className="card">
      <h2>{title}</h2>
      <img src={imagePath} alt={`${title} logo`} />
      <p>{description}</p>
    </div>
  )
}

export default ImageCard
