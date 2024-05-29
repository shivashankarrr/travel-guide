import {ListItem, Image, Heading, Description} from './styledComponents'

const TravelCard = props => {
  const {TravelCardDetails} = props
  const {name, imageUrl, description} = TravelCardDetails
  return (
    <ListItem>
      <Image src={imageUrl} alt={name} />
      <Heading>{name}</Heading>
      <Description>{description}</Description>
    </ListItem>
  )
}
export default TravelCard
