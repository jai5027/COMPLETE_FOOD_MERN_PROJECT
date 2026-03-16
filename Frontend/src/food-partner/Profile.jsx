import React from 'react'
import './Profile.css'

const Profile = () => {
  const business = {
    name: 'Business Name',
    address: '123 Main St',
    totalMeals: 43,
    served: '15K',
    media: Array.from({ length: 9 }, (_, i) => ({ id: i + 1 })),
  }

  return (
    <div className="profile">
      <header className="profile__header">
        <div className="profile__avatar">BP</div>

        <div className="profile__meta">
          <div>
            <div className="profile__meta-label">Business name</div>
            <div className="profile__meta-value">{business.name}</div>
          </div>
          <div>
            <div className="profile__meta-label">Address</div>
            <div className="profile__meta-value">{business.address}</div>
          </div>
        </div>
      </header>

      <section className="profile__stats">
        <div className="profile__stat">
          <div className="profile__stat-value">{business.totalMeals}</div>
          <div className="profile__stat-label">Total meals</div>
        </div>
        <div className="profile__stat">
          <div className="profile__stat-value">{business.served}</div>
          <div className="profile__stat-label">Customer serve</div>
        </div>
      </section>

      <section className="profile__grid">
        {business.media.map((item) => (
          <div key={item.id} className="profile__tile">
            video
          </div>
        ))}
      </section>
    </div>
  )
}

export default Profile
