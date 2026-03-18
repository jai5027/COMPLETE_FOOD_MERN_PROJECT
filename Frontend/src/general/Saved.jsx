import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Saved.css'

export default function Saved() {
  const navigate = useNavigate()
  const [savedVideos, setSavedVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
        axios.get("http://localhost:3000/api/food/save", { withCredentials: true })
            .then(response => {
                const savedFoods = response.data.savedFoods.map((item) => ({
                    _id: item.food._id,
                    video: item.food.video,
                    description: item.food.description,
                    likeCount: item.food.likeCount,
                    savesCount: item.food.savesCount,
                    commentsCount: item.food.commentsCount,
                    foodPartner: item.food.foodPartner,
                }))
                setSavedVideos(savedFoods)
            })
    }, [])


  return (
    <main className="savedPage">
      <header className="savedHeader">
        <div>
          <h1 className="savedTitle">Saved Videos</h1>
          <p className="savedSubtitle">Here are the videos you saved for later.</p>
        </div>
        <button type="button" className="backButton" onClick={() => navigate('/reels')}>
          ← Back
        </button>
      </header>

      {loading ? (
        <div className="emptyState">
          <h2>Loading…</h2>
        </div>
      ) : error ? (
        <div className="emptyState">
          <h2>Something went wrong</h2>
          <p>{error}</p>
        </div>
      ) : savedVideos.length === 0 ? (
        <div className="emptyState">
          <h2>No saved videos yet</h2>
          <p>Tap the bookmark icon on a video to save it for later.</p>
        </div>
      ) : (
        <section className="savedList">
          {savedVideos.map((video) => (
            <article key={video._id} className="savedCard">
              <video
                src={video.video}
                controls
                muted
                loop
                preload="metadata"
              />
              <div className="savedCardBody">
                <h2 className="savedCardTitle">{video.name}</h2>
                <p className="savedCardDescription">{video.description}</p>

                <div className="savedCardMeta">
                  <span>Likes: {video.likeCount ?? 0}</span>
                  <span>Saved: {video.saveCount ?? 0}</span>
                </div>

                <div className="savedCardActions">
                  <button
                    type="button"
                    className="actionButton"
                    onClick={() => toggleLike(video)}
                  >
                    {video.isLiked ? '❤️' : '🤍'} Like
                  </button>
                  <button
                    type="button"
                    className="actionButton"
                    onClick={() => toggleSave(video)}
                  >
                    🔖 Unsave
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  )
}
