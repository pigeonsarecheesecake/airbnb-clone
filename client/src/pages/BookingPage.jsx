import { useParams } from "react-router-dom"

const BookingPage = () => {
    const {id}=useParams()
  return (
    <div>Single booking:{id}</div>
  )
}

export default BookingPage