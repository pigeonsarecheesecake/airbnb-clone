import axios from "axios"
import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import BookingWidget from "../components/BookingWidget"
const PlacePage = () => {
    const {id} = useParams()
    const [place,setPlace] = useState(null)
    const [showAllPhotos, setShowAllPhotos] = useState(false)

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

    if(showAllPhotos){
        return(
            <div className="absolute inset-0 text-white min-h-screen">
                <div className="bg-black p-8 grid gap-4">
                    <div className="">
                        <h2 className="text-3xl mr-48">Photos of {place.title}</h2>
                        <button onClick={()=> setShowAllPhotos(false)} className="fixed flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black right-16 top-8 bg-white text-black">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                            Close Photos
                        </button>
                    </div>
                    {place?.photos?.length > 0 && place.photos.map(photo=>(
                        <div className="">
                            <img className="w-full object-cover" src={'http://localhost:4000/uploads/'+photo} alt="" />
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
            <h1 className="text-3xl">{place.title}</h1>
            <a className="flex gap-1 my-3 block font-semibold underline" target="_blank" href={'https://maps.google.com/?q='+place.address}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                {place.address}
            </a>
            {/* Pictures section */}
            <div className="relative">
                {/* Pictures */}
                <div className="grid gap-2 grid-cols-[2fr_1fr] overflow-hidden rounded-3xl">
                    {/* Left Col */}
                    <div className="">
                        {place.photos?.[0] && (
                            <div className="">
                                <img onClick={()=>setShowAllPhotos(true)} className='cursor-pointer aspect-square object-cover'src={'http://localhost:4000/uploads/'+place.photos[0]}/>
                            </div>
                        )}
                    </div>
                    {/* Right Col */}
                    <div className="grid ">
                        {place.photos?.[0] && (
                            <img onClick={()=>setShowAllPhotos(true)} className='cursor-pointer aspect-square object-cover' src={'http://localhost:4000/uploads/'+place.photos[1]}/>
                        )}
                        <div className="overflow-hidden">
                            {place.photos?.[0] && (
                                <img onClick={()=>setShowAllPhotos(true)} className='cursor-pointer aspect-square object-cover relative top-2' src={'http://localhost:4000/uploads/'+place.photos[2]}/>
                            )}
                        </div>
                    </div>
                </div>
                {/* Show more photos button */}
                <button onClick={()=>setShowAllPhotos(true)} className="flex gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow shadow-md shadow-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                    Show more photos
                </button>
            </div>
            
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