import axios from 'axios'
import React, { useState } from 'react'

function PhotosUploader({addedPhotos,onChange}) {
    const [photoLink,setPhotoLink]=useState('')
     // Add photo helper
    async function addPhotoByLink(ev){
    ev.preventDefault()
    // Data:filename replaces data with filename for variable name
    const {data:filename} = await axios.post('/upload-by-link',{link:photoLink})
    onChange(prev=>{
      return [...prev,filename]
    })
    setPhotoLink('');
  }

  // Upload Photo (needs to study this)
    function uploadPhoto(ev){
    const files = ev.target.files
    const data = new FormData()
    for (let i=0;i<files.length;i++){
      data.append('photos', files[i])
    }
    axios.post('/upload',data,{
      headers: {'Content-Type':'multipart/form-data'}
    }).then(response =>{
      const {data:filenames} = response;
      onChange(prev => {
        return [...prev,...filenames]
      })
    })
  }
  return (
    <>
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
                <div className="h-32 flex" key={link}>
                <img className="rounded-2xl w-full object-cover " src={'http://localhost:4000/uploads/'+link} alt="" />
                </div>
            ))}
            <label className="h-32 border bg-transparent items-center rounded-2xl p-2 text-2xl text-gray-500 flex justify-center gap-1">
                {/* Tutorial hides the input box for the sake of nesting the input element in the label */}
                <input type="file" multiple className="hidden" onChange={uploadPhoto}/>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                </svg>
                Upload
            </label>
        </div>
    </>
  )
}

export default PhotosUploader