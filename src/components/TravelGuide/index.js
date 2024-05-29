import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TravelCard from '../TravelCard'
import {
  MainContainer,
  MainHeading,
  TravelContainer,
  LoadContainer,
} from './styledComponents'

const apiStatusConstants = {
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
}

class TravelGuide extends Component {
  state = {packages: [], apiStatus: apiStatusConstants.inProgress}

  componentDidMount() {
    this.makingApiCall()
  }

  renderLoadingView = () => (
    <LoadContainer data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </LoadContainer>
  )

  makingApiCall = async () => {
    const apiUrl = 'https://apis.ccbp.in/tg/packages'
    const response = await fetch(apiUrl)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.packages.map(each => ({
        id: each.id,
        name: each.name,
        imageUrl: each.image_url,
        description: each.description,
      }))
      this.setState({
        packages: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  render() {
    const {apiStatus, packages} = this.state

    return (
      <MainContainer>
        <MainHeading>Travel Guide</MainHeading>
        <TravelContainer>
          {apiStatus === apiStatusConstants.inProgress
            ? this.renderLoadingView
            : packages.map(each => (
                <TravelCard key={each.id} TravelCardDetails={each} />
              ))}
        </TravelContainer>
      </MainContainer>
    )
  }
}
export default TravelGuide
