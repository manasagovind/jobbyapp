import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import './index.css'

const SpecificJobList = props => {
  const {eachJob} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = eachJob
  const linking = `/jobs/${id}`
  return (
    <Link to={linking}>
      <li className="jobList">
        <div className="jobDett">
          <div className="logoTitleRat">
            <img
              src={companyLogoUrl}
              alt="company logo"
              className="companyLogo"
            />
            <div className="titleRat">
              <h1 className="jobTit">{title}</h1>
              <div className="rattC">
                <FaStar className="startt" />
                <p className="rat">{rating}</p>
              </div>
            </div>
          </div>
          <div className="locTypePack">
            <div className="locTye">
              <div className="loc">
                <p className="locpara">{location}</p>
              </div>
              <div className="type">
                <p className="locpara">{employmentType}</p>
              </div>
            </div>
            <p className="packagee">{packagePerAnnum}</p>
          </div>
        </div>
        <hr />
        <h1 className="desc">Description</h1>
        <p className="desPara">{jobDescription}</p>
      </li>
    </Link>
  )
}
export default SpecificJobList
