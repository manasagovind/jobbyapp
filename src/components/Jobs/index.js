import {Component} from 'react'

import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import Profile from '../Profile'

import Checkboxess from '../Checkboxess'
import SalaryRange from '../SalaryRange'
import SpecificJobList from '../SpecificJobList'
import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}
const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]
const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]
class Jobs extends Component {
  state = {
    apiStatus: apiStatusConstant.initial,
    jobs: [],
    activeCheckboxes: [],
    activesalaryRange: '',
    searchInput: '',
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({apiStatus: apiStatusConstant.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {activeCheckboxes, activesalaryRange, searchInput} = this.state
    const employmentType = activeCheckboxes.join(',')

    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${activesalaryRange}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = data.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({apiStatus: apiStatusConstant.success, jobs: updatedData})
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  changeEmployee = employmentTypeId => {
    const {activeCheckboxes} = this.state
    let updatedemployee
    if (activeCheckboxes.includes(employmentTypeId)) {
      updatedemployee = activeCheckboxes.filter(
        each => each !== employmentTypeId,
      )
    } else {
      updatedemployee = activeCheckboxes.push(employmentTypeId)
    }
    this.setState({activeCheckboxes: updatedemployee}, this.getJobs)
  }

  onChangeid = id => {
    this.setState({activesalaryRange: id}, this.getJobs)
  }

  changesearch = event => {
    this.setState({searchInput: event.target.value})
  }

  searchingDet = () => {
    this.getJobs()
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderfailureView = () => (
    <div className="failCont">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failImg"
      />
      <h1 className="failhead">Oops! Something Went Wrong</h1>
      <p className="failPara">
        We cannot seem to find the page you are looking for
      </p>
      <button type="button" className="retrybutt">
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {jobs} = this.state
    if (jobs.length === 0) {
      return (
        <div className="noJobCont">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
            className="noJobImg"
          />
          <h1 className="noJobHead">No Jobs Found</h1>
          <p className="noJobPara">
            We could not find any jobs. Try other filters
          </p>
        </div>
      )
    }
    return (
      <div className="jobCont">
        <ul className="jobun">
          {jobs.map(eachJob => (
            <SpecificJobList eachJob={eachJob} key={eachJob.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderjobs = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.inProgress:
        return this.renderLoadingView()
      case apiStatusConstant.success:
        return this.renderSuccessView()
      case apiStatusConstant.failure:
        return this.renderfailureView()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state
    return (
      <div className="jobCont">
        <Header />
        <div className="jobContent2">
          <input
            type="search"
            placeholder="Search"
            value={searchInput}
            onChange={this.changesearch}
          />
          {/* eslint-disable-next-line */}
          <button
            type="button"
            data-testid="searchButton"
            onClick={this.searchingDet}
            className="searchbutt"
          >
            <BsSearch color="#64748b" className="search-icon" />
          </button>
        </div>
        <div className="totalDet">
          <div className="jobContent4">
            <div className="profileContent">
              <Profile />
            </div>
            <hr />
            <div>
              <h1 className="beckHead">Type of Employment</h1>
              <ul>
                {employmentTypesList.map(eachType => (
                  <Checkboxess
                    eachType={eachType}
                    key={eachType.employmentTypeId}
                    changeEmployee={this.changeEmployee}
                  />
                ))}
              </ul>
            </div>
            <hr />
            <div>
              <h1 className="beckHead">Salary Range</h1>
              <ul>
                {salaryRangesList.map(eachType => (
                  <SalaryRange
                    eachType={eachType}
                    key={eachType.salaryRangeId}
                    onChangeid={this.onChangeid}
                  />
                ))}
              </ul>
            </div>
            <hr />
          </div>
          <div>
            <div className="jobContent3">
              <input
                type="search"
                placeholder="Search"
                value={searchInput}
                onChange={this.changesearch}
                className="inputSearch"
              />
              {/* eslint-disable-next-line */}
              <button
                type="button"
                data-testid="searchButton"
                onClick={this.searchingDet}
                className="searchbutt"
              >
                <BsSearch color="#64748b" className="search-icon" />
              </button>
            </div>
            {this.renderjobs()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
