import React, { useEffect } from 'react'
import { useState } from 'react'
import PhotosUploader from '../components/PhotosUploader'
import Perks from '../components/Perks'
import AccountNav from '../AccountNav'
import axios from 'axios'
import { Navigate, useParams } from 'react-router-dom'


function PlacesFormPage() {
    // State
    const {id} = useParams()
    console.log(id)
    const [title,setTitle]=useState()
    const [address,setAddress]=useState()
    const [addedPhotos,setAddedPhotos]=useState([])
    const [description, setDescription] = useState('')
    const [perks, setPerks] = useState('')
    const [extraInfo, setExtraInfo]=useState('')
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut]=useState('')
    const [maxGuests,setMaxGuests]=useState(1)
    const [price,setPrice] = useState(100)
    const[redirect,setRedirect]=useState(false)
    
    // Effects
    useEffect(()=>{
        if(!id){
            return;
        }
        axios.get('/places/'+id).then(response=>{
            const {data}=response;
            setTitle(data.title)
            setAddress(data.address)
            setAddedPhotos(data.photos)
            setDescription(data.description)
            setPerks(data.perks)
            setExtraInfo(data.extraInfo)
            setCheckIn(data.checkIn)
            setCheckOut(data.checkOut)
            setMaxGuests(data.maxGuests),
            setPrice(data.price)
        })
    },[id])

    // Function
    function inputHeader(text){
        return(
        <h2 className="text-2xl mt-4">{text}</h2>
        )
    }

    function inputDescription(text){
        return(
        <p className="text-gray-500 text-sm">{text}</p>
        )
    }

    function preInput(header,description){
        return(
        <>
            {inputHeader(header)}
            {inputDescription(description)}
        </>
        )
    }

    // On Submit
    async function savePlace(ev){
        // If place id exists, that means its a put or edit
        // If place id does not exist, that means it's new place
        // Only user with the correct owner id can edit a place
        if(id){
            ev.preventDefault()
            const placeData={
                title, address, addedPhotos, 
                description, perks, extraInfo,
                checkIn, checkOut, maxGuests, price
            }
            // Data is going to be labeled as a variable response data
            await axios.put('/places',{
                id, ...placeData
            })
            setRedirect(true)
        }else{
            ev.preventDefault()
            const placeData={
                title, address, addedPhotos, 
                description, perks, extraInfo,
                checkIn, checkOut, maxGuests, price
            }
            // Data is going to be labeled as a variable response data
            await axios.post('/places',placeData)
            setRedirect(true)
        }
    }

    // If redirect is true, redirect to account places
    if(redirect){
        return <Navigate to={'/account/places'}/>
    }

    return (
        <div >
            <AccountNav/>
            <form onSubmit={savePlace}>
            {/* Title */}
            {preInput('Title','Title for your place. Should be short and catchy in advertisement')}
            <input  type='text' 
                    value={title} 
                    onChange={ev => setTitle(ev.target.value)} 
                    placeholder="title, for example: My Lovely apt"/>
            {/* Address */}
            {preInput('Address','Address to this place')}
            <input  type='text' 
                    value={address} 
                    onChange={ev =>setAddress(ev.target.value)} 
                    placeholder="address"/>
            {/* Photos */}
            {preInput('Photos','more = better')}
            <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>
            {/* Description */}
            {preInput('Description','Description of the place')}
            <textarea   value={description} 
                        onChange={ev=>setDescription(ev.target.value)} 
                        ></textarea>
            {/* Perks */}
            {preInput('Perks','Select the perks of your perk')}
            <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                <Perks selected={perks} onChange={setPerks} />
            </div>
            {/* Extra Info */}
            {preInput('Extra Info','House Rules, etc')}
            <textarea value={extraInfo} 
                        onChange={ev=>setExtraInfo(ev.target.value)} />
            {/* Check in check out times */}
            {preInput('Check in and Check out times','add check in and out')}
            {/* Input Boxes for extra info */}
            <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
                <div>
                    <h3 className="mt-2 -mb-1">Check in time</h3>
                    <input  type="text"
                            value={checkIn} 
                            onChange={ev=>setCheckIn(ev.target.value)} 
                            placeholder="14"/>
                </div>
                <div>
                    <h3 className="mt-2 -mb-1">Check out time</h3>
                    <input  type="text" 
                            value={checkOut} 
                            onChange={ev=>setCheckOut(ev.target.value)} 
                            placeholder="11"/>
                </div>
                <div>
                    <h3 className="mt-2 -mb-1">Max Number of Guests</h3>
                    <input  type="number" 
                            value={maxGuests} 
                            onChange={ev=>setMaxGuests(ev.target.value)}/>
                </div>
                <div>
                    <h3 className="mt-2 -mb-1">Price per Night</h3>
                    <input  type="number"
                            value={price} 
                            onChange={ev=>setPrice(ev.target.value)} 
                            placeholder="14"/>
                </div>
            </div>
            <button className="primary my-4">Save</button>
            </form>
        </div>
    )
}

export default PlacesFormPage