import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onLogoutbtn = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/ebank/login')
  }

  return (
    <div className="HeaderContainer">
      <img
        src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
        alt="website logo"
        className="HomeImage"
      />
      <button className="Logoutbtn" type="button" onClick={onLogoutbtn}>
        Logout
      </button>
    </div>
  )
}
export default withRouter(Header)
