import axios from "axios"
import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"

const PlacePage = () => {
    const {id} = useParams()
    const [place,setPlace] = useState(null)

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
        <div className="mt-4 bg-gray-100 -mx-8 px-8 py-8">
            <h1 className="text-3xl">{place.title}</h1>
            <a className="my-2 block font-semibold underline" target="_blank" href={'https://maps.google.com/?q='+place.address}>{place.address}</a>
            <div className="relative">
                <div className="grid gap-2 grid-cols-[2fr_1fr]">
                    {/* Left Col */}
                    <div className="">
                        {place.photos?.[0] && (
                            <div className="">
                                <img className='aspect-square object-cover'src={'http://localhost:4000/uploads/'+place.photos[0]}/>
                            </div>
                        )}
                    </div>
                    {/* Right Col */}
                    <div className="grid ">
                        {place.photos?.[0] && (
                            <img className='aspect-square object-cover' src={'http://localhost:4000/uploads/'+place.photos[1]}/>
                        )}
                        <div className="overflow-hidden">
                            {place.photos?.[0] && (
                                <img className='aspect-square object-cover relative top-2' src={'http://localhost:4000/uploads/'+place.photos[2]}/>
                            )}
                        </div>
                    </div>
                </div>
                <button className="flex gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow shadow-md shadow-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                    Show more photos
                </button>
            </div>
        </div>
    )
}

export default PlacePage