import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import './CreateFood.css'

function CreateFood() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [videoFile, setVideoFile] = useState(null)
  const [status, setStatus] = useState({ loading: false, error: '', success: '' })

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus({ loading: true, error: '', success: '' })

    if (!name.trim() || !description.trim() || !videoFile) {
      setStatus({ loading: false, error: 'Please fill out all fields and select a video.', success: '' })
      return
    }

    try {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('description', description)
      formData.append('video', videoFile)

      await axios.post('http://localhost:3000/api/food/', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      setStatus({ loading: false, error: '', success: 'Food item created successfully!' })
      setName('')
      setDescription('')
      setVideoFile(null)
      // Redirect after a short delay for better UX
      setTimeout(() => navigate('/reels'), 1200)
    } catch (error) {
      const message = error?.response?.data?.message || error.message || 'Something went wrong'
      setStatus({ loading: false, error: message, success: '' })
    }
  }

  return (
    <div className="create-food">
      <div className="create-food__card">
        <h1 className="create-food__header">Create Food Item</h1>
        <form className="create-food__form" onSubmit={handleSubmit}>
          <div className="create-food__field">
            <label htmlFor="food-name">Food Title</label>
            <input
              id="food-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="E.g. Mango Smoothie"
              autoComplete="off"
            />
          </div>

          <div className="create-food__field">
            <label htmlFor="food-description">Food Description</label>
            <textarea
              id="food-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell users what makes this dish special..."
            />
          </div>

          <div className="create-food__field">
            <label htmlFor="food-video">Food Video</label>
            <input
              id="food-video"
              type="file"
              accept="video/*"
              onChange={(e) => setVideoFile(e.target.files?.[0] ?? null)}
            />
          </div>

          {videoFile && (
            <div className="create-food__preview">
              <video src={URL.createObjectURL(videoFile)} controls preload="metadata" />
            </div>
          )}

          {status.error && <p className="create-food__secondary">{status.error}</p>}
          {status.success && <p className="create-food__secondary">{status.success}</p>}

          <div className="create-food__actions">
            <button className="create-food__button" type="submit" disabled={status.loading}>
              {status.loading ? 'Creating…' : 'Create Food'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateFood
