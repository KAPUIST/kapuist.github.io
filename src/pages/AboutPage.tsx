import PageTitle from '../components/PageTitle'
import portrait from '../assets/profile.png'
import { profile } from '../profile'

export default function AboutPage() {
  return (
    <section className="about-page">
      <PageTitle title="About Me" />
      <h1>About Me</h1>
      <div className="profile">
        <img src={portrait} alt={`${profile.name} 프로필 사진`} width="160" height="160" />
        <div>
          <h2>{profile.name}</h2>
          {profile.bio && <p>{profile.bio}</p>}
          {profile.githubUrl && <a href={profile.githubUrl}>GitHub</a>}
        </div>
      </div>
    </section>
  )
}
