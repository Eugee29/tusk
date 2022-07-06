import { useNavigate } from 'react-router-dom'

import { FaGithubSquare, FaLinkedin } from 'react-icons/fa'

import hero from '../assets/imgs/hero.png'
import demo from '../assets/imgs/demo.jpg'

export const HomePage = () => {
  const navigate = useNavigate()

  return (
    <main className="home-page">
      <div className="layout home-page-layout">
        <section className="hero">
          <section className="hero-message">
            <h1>Tusk helps teams move work forward.</h1>
            <p>
              Collaborate, manage projects, and reach new productivity peaks. &nbsp; From high rises to the home office,
              the way your team works is unique—accomplish it all with Tusk.
            </p>
            <form>
              <button type="button" className="start-demo" onClick={() => navigate('/workspace')}>
                Start demo
              </button>
            </form>
          </section>
          <div className="hero-img">
            <img src={hero} alt="hero.png" />
          </div>
        </section>
        <section className="app-info">
          <h2 className="introduction-header">It's more than work. It's a way of working together.</h2>
          <p className="introduction">
            Start with a Tusk board, lists, and cards. Customize and expand with more features as your teamwork grows.
            Manage projects, organize tasks, and build team spirit—all in one place.
          </p>
          <div className="demo-img-container">
            <img src={demo} alt="demo" />
          </div>
        </section>
        <footer className="home-page-footer">
          <div className="credit">
            <h3 className="name">Uri Gruda</h3>
            <div className="icons-wrapper">
              <a
                href="https://www.linkedin.com/in/uri-gruda-70b36b22b/"
                target="_blank"
                rel="noopener noreferrer"
                className="icon-container"
              >
                <FaLinkedin />
              </a>
              <a href="https://github.com/Eugee29" target="_blank" rel="noopener noreferrer" className="icon-container">
                <FaGithubSquare />
              </a>
            </div>
          </div>
          <div className="credit">
            <h3 className="name">Eran Avichzer</h3>
            <div className="icons-wrapper">
              <a
                href="https://www.linkedin.com/in/eran-avichzer/"
                target="_blank"
                rel="noopener noreferrer"
                className="icon-container"
              >
                <FaLinkedin />
              </a>
              <a href="https://github.com/EranAAA" target="_blank" rel="noopener noreferrer" className="icon-container">
                <FaGithubSquare />
              </a>
            </div>
          </div>
          <div className="credit">
            <h3 className="name">Tal Ofer</h3>
            <div className="icons-wrapper">
              <a
                href="https://www.linkedin.com/in/tal-ofer-9408b9242/"
                target="_blank"
                rel="noopener noreferrer"
                className="icon-container"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://github.com/TalAOfer"
                target="_blank"
                rel="noopener noreferrer"
                className="icon-container"
              >
                <FaGithubSquare />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  )
}
