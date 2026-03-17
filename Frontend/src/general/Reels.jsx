import { useEffect, useState } from 'react'
import './Reels.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Reels() {
  const navigate = useNavigate()
    const [reels, setReels] = useState([])
    
    useEffect(() => {
 
    axios.get('http://localhost:3000/api/food/', { withCredentials: true })
    .then(res => {
      setReels(res.data.foodItems)
    }) 

    }, [])

  return (
    <div className="reelsContainer">
      {reels.map((reel) => (
        <section key={reel._id} className="reel">
          <video
            src={reel.video}
            muted
            loop
            autoPlay
            playsInline
            controls={false}
            preload='metadata'
          />
          <div className="reelOverlay">
            <h3>{reel.name}</h3>
            <p className="reelDescription">{reel.description}</p>
            <button
              className="reelButton"
              type="button"
              onClick={() => navigate(`/food-partner/${reel.foodPatner}`)}
            >
              Visit Store
            </button>
          </div>
        </section>
      ))}
    </div>
  )
}

export default Reels
