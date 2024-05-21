
// remember index=0 means if there is no value passed, index is 0 by default
const PlaceImg = ({place,index=0,className=null}) => {
    if(!place.photos?.length){
        return ''
    }
    if(!className){
        className = 'object-cover'
    }
  return (
    <img className={className} src={'http://localhost:4000/uploads/'+place.photos[index]} alt="" />
  )
}

export default PlaceImg