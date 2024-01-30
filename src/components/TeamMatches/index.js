// Write your code here
import {Component} from 'react'
import './index.css'

const bgColors = [
  'red',
  'blue',
  'pink',
  'orange',
  'brown',
  'yellow',
  'lightblue',
  'black',
][Math.ceil(Math.random() * 7)]

class TeamMatches extends Component {
  state = {teamData: [], isLoading: true}

  componentDidMount() {
    this.getTeamDetailsData()
  }

  getTeamDetailsData = async () => {
    const {match} = this.props

    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()
    console.log(data)
    const updatedData = {
      teamBannerUrl: data.team_banner_url,
      latestMatchDetails: data.latest_match_details,
      recentMatches: data.recent_matches,
    }

    this.setState({teamData: updatedData})
  }

  render() {
    const {teamData} = this.state
    const {teamBannerUrl, latestMatchDetails, recentMatches} = teamData

    console.log(teamBannerUrl)
    console.log(latestMatchDetails)

    return (
      <div className={`bg-container ${bgColors}`}>
        <img src={teamBannerUrl} alt="team banner" />
      </div>
    )
  }
}
export default TeamMatches
