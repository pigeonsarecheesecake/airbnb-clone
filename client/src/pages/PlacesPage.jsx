import { useState } from "react";
import { Link,useParams } from "react-router-dom";
import Perks from "../components/Perks";
import axios from "axios";
import PhotosUploader from "../components/PhotosUploader";


export default function PlacesPage() {
  // Action is the current subpage
  const {action}= useParams()
  const [title,setTitle]=useState()
  const [address,setAddress]=useState()
  const [addedPhotos,setAddedPhotos]=useState([])
  
  const [description, setDescription] = useState([])
  const [perks, setPerks] = useState('')
  const [extraInfo, setExtraInfo]=useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut]=useState('')
  const [maxGuests,setMaxGuests]=useState(1)

  // Header and Description helper functions
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


  return (
    <div>
      {/* If action parameter is not new, display the button */}
      {action !== 'new' && (
          <div className="text-center">
          {/* Link */}
          <Link className='bg-cherry text-white py-2 px-4 rounded-full inline-flex gap-1' to={'/account/places/new'}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add new place
          </Link>
        </div>
      )}
      {/* If action parameter is new, display places to add */}
      {
        action === 'new' && (
          <div className="div">
            <form>
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
              <div className="grid gap-2 sm:grid-cols-3">
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
              </div>
              <button className="primary my-4">Save</button>
            </form>
          </div>
        )
      }
    </div>
  )
}

