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
