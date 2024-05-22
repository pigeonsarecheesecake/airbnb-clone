import axios from "axios"
import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import BookingWidget from "../components/BookingWidget"
import PlaceGallery from "../components/PlaceGallery"
import AddressLink from "../components/AddressLink"
const PlacePage = () => {
    const {id} = useParams()
    const [place,setPlace] = useState(null)
   

    // Get the place info
    useEffect(()=>{
        if(!id){
            return
        }
        axios.get(`/places/${id}`).then(response=>{
            setPlace(response.data)
        })
    },[id])

    if(!place) return '';

    

    return (
        <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
            <h1 className="text-3xl">{place.title}</h1>
            <AddressLink>{place.address}</AddressLink>
            <PlaceGallery place={place}/>
            {/* Description bottom */}
            <div className="mb-4 grid grid-cols-1 md:grid-cols-[2fr_1fr] mt-8 gap-8">
                <div className="">
                    {/* Description */}
                    <div className="my-4">
                        <h2 className="font-semibold text-2xl">Description</h2>
                        {place.description}
                    </div>
                    {/* Check in checkout */}
                    Check-in: {place.checkIn} <br/>
                    Check-out: {place.checkOut} <br/>
                    Max number of guests: {place.maxGuests}
                </div>
                <div className="">
                    <BookingWidget place={place}/>
                </div>
            </div>
            <div className="bg-white -mx-8 px-8 py-8 border-t">
                <div className="">
                    <h2 className="font-semibold text-2xl">Extra Info</h2>
                </div>
                <div className="mb-4 mt-1 text-sm text-gray-700 leading-5">{place.extraInfo}</div>
            </div>
            
        </div>
    )
}

export default PlacePage