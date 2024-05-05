import {Component} from 'react'
import {FaStar} from 'react-icons/fa'

import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import Skill from '../Skill'
import SimilarJob from '../SimilarJob'
import './index.css'

const apistatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'INPROGRESS',
  failure: 'FAILURE',
}
class JobItemDetails extends Component {
  state = {
    apiStatus: apistatusConstant.initial,
    jobddetails: {},
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiStatus: apistatusConstant.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const jobDetails = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        skills: data.job_details.skills.map(each => ({
          name: each.name,
          imageUrl: each.image_url,
        })),
        lifeAtCompany: {
          description: data.job_details.life_at_company.description,
          imageUrl: data.job_details.life_at_company.image_url,
        },
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
      }
      const similarJobs = data.similar_jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))
      const updatedData = {
        jobDetails,
        similarJobs,
      }
      this.setState({
        apiStatus: apistatusConstant.success,
        jobddetails: updatedData,
      })
    } else {
      this.setState({apiStatus: apistatusConstant.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  retry=()=>{
    this.getJobDetails()
  }

  renderFailureView = () => (
    <div className="failCont">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failImg"
      />
      <h1 className="failhead">Oops! Something Went Wrong</h1>
      <p className="failPara">
        We cannot seem to find the page you are looking for{' '}
      </p>
      <button type="button" onClick={this.retry} className="retrybutt">
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {jobddetails} = this.state
    const {jobDetails, similarJobs} = jobddetails
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,

      jobDescription,
      skills,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
    } = jobDetails
    const {description, imageUrl} = lifeAtCompany
    return (
      <div className="totalJobsec">
        <div className="specificjobdetCont">
          <div className="logoRating">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="logoImg"
            />
            <div className="ratingCont">
              <FaStar className="startt" />
              <p className="ratDes">{rating}</p>
            </div>
          </div>
          <div className="locTypePack">
            <div className="locTyp">
              <p className="locDes">{location}</p>
              <p className="typeDes">{employmentType}</p>
            </div>
            <p className="pacDesc">{packagePerAnnum}</p>
          </div>
          <hr />
          <div className="desHeadWeb">
            <h1 className="desH">Description</h1>
            <a href={companyWebsiteUrl}>Visit</a>
          </div>
          <p className="descTe">{jobDescription}</p>
          <h1 className="skillHe">Skills</h1>
          <ul className="skillUnOrder">
            {skills.map(eachSkill => (
              <Skill eachSkill={eachSkill} key={eachSkill.name} />
            ))}
          </ul>
          <h1 className="descTe">Life at Company</h1>
          <div className="lifeDe">
            <p className="desPara">{description}</p>
            <img src={imageUrl} alt="life at company" className="lifeImg" />
          </div>
        </div>
        <h1 className="simiHead">Similar Jobs</h1>
        <ul className="simiUnOrder">
          {similarJobs.map(eachSimi => (
            <SimilarJob eachSimi={eachSimi} key={eachSimi.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderDet = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apistatusConstant.success:
        return this.renderSuccessView()
      case apistatusConstant.failure:
        return this.renderFailureView()
      case apistatusConstant.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="detailedCont">
        <Header />
        {this.renderDet()}
      </div>
    )
  }
}
export default JobItemDetails
