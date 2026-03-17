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
    axios
      .get('http://localhost:3000/api/food/saved', { withCredentials: true })
      .then((res) => {
        setSavedVideos(res.data.savedFoods || [])
      })
      .catch(() => {
        setError('Unable to load saved videos. Please try again.')
      })
      .finally(() => setLoading(false))
  }, [])

  async function toggleLike(item) {
    try {
      const res = await axios.post(
        'http://localhost:3000/api/food/like',
        { foodId: item._id },
        { withCredentials: true }
      )

      setSavedVideos((prev) =>
        prev.map((v) =>
          v._id === item._id
            ? { ...v, isLiked: res.data.like, likeCount: res.data.likeCount }
            : v
        )
      )
    } catch {
      // ignore for now
    }
  }

  async function toggleSave(item) {
    try {
      const res = await axios.post(
        'http://localhost:3000/api/food/save',
        { foodId: item._id },
        { withCredentials: true }
      )

      if (!res.data.save) {
        setSavedVideos((prev) => prev.filter((v) => v._id !== item._id))
        return
      }

      setSavedVideos((prev) =>
        prev.map((v) =>
          v._id === item._id ? { ...v, saveCount: res.data.saveCount } : v
        )
      )
    } catch {
      // ignore for now
    }
  }

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
