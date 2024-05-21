
const BookingWIdget = ({place}) => {
  return (
    <div className="bg-white shadow p-4 rounded-2xl">
        {/* Booking Section */}
        <div className="text-2xl text-center">   
            Price: ${place.price} / per night
        </div>
        <div className="border rounded-2xl mt-4">
            {/* Check in check out */}
            <div className="flex">
                {/* Check in and Check out */}
                <div className="  py-3 px-4 ">
                    <label >Check in:</label>
                    <input type="date" />
                </div>
                <div className="border-l  py-3 px-4 ">
                    <label >Check out:</label>
                    <input type="date" />
                </div>
            </div>
            {/* Max guests */}
            <div className="border-t">
                <div className="border-l  py-3 px-4 ">
                    <label >Number of Guests:</label>
                    <input type="number" value={1} />
                </div>
            </div>
            
        </div>
        <button className="primary mt-4">Book this place</button>
    </div>
  )
}

export default BookingWIdget