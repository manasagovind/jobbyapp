import './index.css'

const SimilarJob = props => {
  const {eachSimi} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = eachSimi
  return (
    <li className="simiList">
      <div className="logoTitratin">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="simiImg"
        />
        <div className="titlRa">
          <h2 className="titlle">{title}</h2>
          <p className="ratingDes">{rating}</p>
        </div>
      </div>
      <h1 className="decHe">Description</h1>
      <p className="desiPara">{jobDescription}</p>
      <div className="locTyp">
        <p className="locate">{location}</p>
        <p className="Typee">{employmentType}</p>
      </div>
    </li>
  )
}
export default SimilarJob
