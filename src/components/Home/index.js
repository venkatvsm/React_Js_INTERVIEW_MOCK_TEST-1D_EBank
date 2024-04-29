import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => {
  if (Cookies.get('jwt_token') === undefined) {
    return <Redirect to="/ebank/login" />
  }
  return (
    <div className="HomeContainer">
      <Header />
      <div className="HomeCardContainer">
        <h1 className="homeHeading">Your Flexibility, Our Excellence</h1>
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
          alt="digital card"
          className="homeImage"
        />
      </div>
    </div>
  )
}
export default Home
