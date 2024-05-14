import { useState } from "react";
import { Link,useParams } from "react-router-dom";
import Perks from "../components/Perks";
import axios from "axios";


export default function PlacesPage() {
  // Action is the current subpage
  const {action}= useParams()
  const [title,setTitle]=useState()
  const [address,setAddress]=useState()
  const [addedPhotos,setAddedPhotos]=useState([])
  const [photoLink,setPhotoLink]=useState('')
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

  // Add photo helper
  async function addPhotoByLink(ev){
    ev.preventDefault()
    // Data:filename replaces data with filename for variable name
    const {data:filename} = await axios.post('/upload-by-link',{link:photoLink})
    setAddedPhotos(prev=>{
      return [...prev,filename]
    })
    setPhotoLink('');
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
              {/* Important, how to submit pics PHOTOS */}
              <div className="flex gap-2">
                <input  value={photoLink}
                        onChange={ev => setPhotoLink(ev.target.value)} 
                        type="text" 
                        placeholder={'Add using a link ....jpg'} />
                {/* Button that is a primary has the same style, this is better than adding a css */}
                <button onClick={addPhotoByLink} className="bg-gray-200 p-4 rounded-2xl" >Add&nbsp;photo</button>
              </div>
              {/* Upload button */}
              <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {addedPhotos.length>0 && addedPhotos.map(link=>(
                  <div>
                    <img className="rounded-2xl" src={'http://localhost:4000/uploads/'+link} alt="" />
                  </div>
                ))}
                <button className="border bg-transparent items-center rounded-2xl p-2 text-2xl text-gray-500 flex justify-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                  </svg>
                  Upload
                </button>
              </div>
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

