import {Component} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}
class Profile extends Component {
  state = {apiStatus: apiStatusConstant.initial, profileDet: {}}

  componentDidMount() {
    this.getProfile()
  }

  getProfile = async () => {
    this.setState({apiStatus: apiStatusConstant.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        apiStatus: apiStatusConstant.success,
        profileDet: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  retry=()=>{
    this.getProfile()
  }

  renderfailureView = () => (
    <div className="faill">
      <button type="button" onClick={this.retry} className="retrybutt">
        Retry
      </button>
    </div>
  )

  rendersuccessView = () => {
    const {profileDet} = this.state
    const {name, profileImageUrl, shortBio} = profileDet
    return (
      <div className="profileCont">
        <img src={profileImageUrl} alt="profile" className="profileimg" />
        <h1 className="profHead">{name}</h1>
        <p className="profPara">{shortBio}</p>
      </div>
    )
  }

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.rendersuccessView()
      case apiStatusConstant.failure:
        return this.renderfailureView()
      case apiStatusConstant.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}
export default Profile
