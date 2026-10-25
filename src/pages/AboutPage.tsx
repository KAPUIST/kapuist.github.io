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
          <h2>{profile.fullName}</h2>
          <p className="profile-role">{profile.role}</p>
          <div className="profile-contact">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <a href={`tel:${profile.phone.replace(/[^+0-9]/g, '')}`}>{profile.phone}</a>
          </div>
          <div className="profile-links">
            <a href={profile.githubUrl}>GitHub</a>
            <a href={profile.resume.url} download={profile.resume.filename}>이력서 다운로드</a>
          </div>
        </div>
      </div>
      <section className="resume-section" aria-labelledby="experience-title">
        <h2 id="experience-title">경력</h2>
        <div className="experience-list">
          {profile.experience.map(experience => (
            <article className="experience-row" key={experience.company}>
              <p className="experience-period">{experience.period}</p>
              <div>
                <h3>{experience.company}</h3>
                <p className="experience-role">{experience.role}</p>
                <p>{experience.summary}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="resume-section" aria-labelledby="skills-title">
        <h2 id="skills-title">기술</h2>
        <p>{profile.skills}</p>
      </section>
      <section className="resume-section" aria-labelledby="opensource-title">
        <h2 id="opensource-title">오픈소스</h2>
        <p>{profile.openSource}</p>
      </section>
    </section>
  )
}
