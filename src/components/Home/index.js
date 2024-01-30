// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TeamCard from '../TeamCard'
import './index.css'

class Home extends Component {
  state = {
    eachFranchise: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getTeamsData()
  }

  getTeamsData = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()

    const updatedData = data.teams.map(eachTeam => ({
      id: eachTeam.id,
      name: eachTeam.name,
      teamImageUrl: eachTeam.team_image_url,
    }))
    this.setState({eachFranchise: updatedData, isLoading: false})
  }

  bannerSection = () => {
    const {eachFranchise} = this.state
    return (
      <>
        <div className="heading-logo-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            alt="ipl logo"
            className="ipl-logo"
          />
          <h1 className="ipl-heading">IPL Dashboard</h1>
        </div>
        <ul className="teams-list-container">
          {eachFranchise.map(eachTeamDetails => (
            <TeamCard
              eachTeamDetails={eachTeamDetails}
              key={eachTeamDetails.id}
            />
          ))}
        </ul>
      </>
    )
  }

  loader = () => {
    return (
      <div testid="loader">
        <Loader type="Oval" color="#ffffff" height={50} width={50} />
      </div>
    )
  }

  render() {
    const {eachFranchise, isLoading} = this.state
    return (
      <div className="ipl-bg-container">
        {isLoading ? this.loader() : this.bannerSection()}
      </div>
    )
  }
}
export default Home
