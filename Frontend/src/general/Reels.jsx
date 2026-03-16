import { useCallback } from 'react'
import './Reels.css'

const reels = [
  {
    id: '1',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    description: 'Check out this amazing store collection — you can get fresh meals delivered fast. Tap to visit the store and browse the full menu!',
    storeName: 'QuickBites'
  },
  {
    id: '2',
    videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    description: 'Looking for something healthy? This store has vegan options, chef specials, and daily discounts — grab a deal before it runs out.',
    storeName: 'GreenTable'
  },
  {
    id: '3',
    videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/sea.mp4',
    description: 'Late night cravings? This store delivers 24/7 with special combo offers today — tap below to explore.',
    storeName: 'NightBites'
  }
]

function Reels() {
  const handleVisitStore = useCallback((storeName) => {
    // TODO: hook this up to real store navigation when routes are available
    window.alert(`Visit store: ${storeName}`)
  }, [])

  return (
    <div className="reelsContainer">
      {reels.map((reel) => (
        <section key={reel.id} className="reel">
          <video
            src={reel.videoUrl}
            muted
            loop
            autoPlay
            playsInline
            controls={false}
          />
          <div className="reelOverlay">
            <p className="reelDescription">{reel.description}</p>
            <button
              className="reelButton"
              onClick={() => handleVisitStore(reel.storeName)}
              type="button"
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
