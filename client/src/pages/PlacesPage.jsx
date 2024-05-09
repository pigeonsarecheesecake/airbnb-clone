import { Link,useParams } from "react-router-dom";

export default function PlacesPage() {
  // Action is the current subpage
  const {action}= useParams()
  return (
    <div>
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
      {
        action === 'new' && (
          <div className="div">
            <form>
              {/* Title */}
              <h2 className="text-2xl mt-4">Title</h2>
              <p className="text-gray-500 text-sm">Title for your place. Should be short and catchy in advertisement</p>
              <input type='text' placeholder="title, for example: My Lovely apt"/>
              {/* Address */}
              <h2 className="text-2xl mt-4">Address</h2>
              <p className="text-gray-500 text-sm">Address to this place</p>
              <input type='text' placeholder="address"/>
              {/* Photos */}
              <h2 className="text-2xl mt-4">Photos</h2>
              <p className="text-gray-500 text-sm">more = better</p>
              <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                <button onSubmit={()=>{e.preventDefault()}} className="border bg-transparent rounded-2xl p-8 text-2xl text-gray-500">+</button>
              </div>
            </form>
          </div>
        )
      }
    </div>
  )
}

