import { useEffect, useState } from 'react'
import './Reels.css'
import axios from 'axios'
import { useNavigate} from 'react-router-dom'

function Reels() {
  const navigate = useNavigate()
  const [reels, setReels] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/api/food/', { withCredentials: true }).then(res => {
      setReels(res.data.foodItems)
    })
  }, [])

  async function likeVideo(item){
  const res = await axios.post(
    'http://localhost:3000/api/food/like',
    { foodId: item._id },
    { withCredentials: true }
  )

  setReels((prev) =>
    prev.map((v) =>
      v._id === item._id
        ? {
            ...v,
            isLiked: res.data.like,
            likeCount: res.data.likeCount
          }
        : v
    )
  )
}

async function saveVideo(item){
  const res = await axios.post(
    'http://localhost:3000/api/food/save',
    { foodId: item._id },
    { withCredentials: true }
  )

  setReels((prev) =>
    prev.map((v) =>
      v._id === item._id
        ? {
            ...v,
            isSaved: res.data.save,
            saveCount: res.data.saveCount
          }
        : v
    )
  )
}

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
            controls
            preload="none"
          />

          <div className="reelOverlay">
            <div className="reelOverlayContent">
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

            <div className="reelActions">
              <button className="reelAction" type="button" onClick={() => likeVideo(reel)}>
                <span className="reelActionIcon" aria-hidden="true">
                    {reel.isLiked ? '❤️' : '🤍'}
                </span>
                <span className="reelActionText">{reel.likeCount ?? 0}</span>
              </button>

              <button className="reelAction" type="button" onClick={() => saveVideo(reel)}>
                <span className="reelActionIcon" aria-hidden="true">
                  🔖
                </span>
                <span className="reelActionText">{reel.saveCount ?? 0}</span>
              </button>

              <button className="reelAction" type="button">
                <span className="reelActionIcon" aria-hidden="true">
                  💬
                </span>
                <span className="reelActionText">{reel.commentCount}</span>
              </button>
            </div>
          </div>
        </section>
      ))}

      <nav className="bottomNav">
        <button
          type="button"
          className="navItem"
        
        >
          <span className="navIcon" aria-hidden="true">
            🏠
          </span>
          <span className="navLabel">home</span>
        </button>

        <button
          type="button"
          className="navItem"
          onClick={() => navigate('/saved')}
        >
          <span className="navIcon" aria-hidden="true">
            🔖
          </span>
          <span className="navLabel">saved</span>
        </button>
      </nav>
    </div>
  )
}

export default Reels
