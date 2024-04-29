import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: '', showError: false}

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangeUserPin = event => {
    this.setState({password: event.target.value})
  }

  renderSubmitForm = async event => {
    event.preventDefault()
    this.setState({showError: false})
    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/ebank/login'
    const userDetails = {user_id: username, pin: password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const {history} = this.props
      Cookies.set('jwt_token', data.jwt_token, {
        path: '/',
        expires: 30,
      })
      history.replace('/')
    } else {
      console.log(data)
      this.setState({
        errorMsg: data.error_msg,
        showError: true,
        username: '',
        password: '',
      })
    }
  }

  render() {
    if (Cookies.get('jwt_token') !== undefined) {
      return <Redirect to="/" />
    }
    const {showError, errorMsg, username, password} = this.state
    return (
      <div className="LoginContainer">
        <div className="CardContainer">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            className="loginImage"
            alt="website login"
          />
          <form className="form_Container" onSubmit={this.renderSubmitForm}>
            <h1 className="form_Container_Heading">Welcome Back</h1>
            <label htmlFor="userid" className="label">
              User ID
            </label>
            <input
              id="userid"
              type="text"
              value={username}
              className="inputField"
              placeholder="Enter User ID"
              onChange={this.onChangeUserName}
            />
            <label className="label" htmlFor="pin">
              PIN
            </label>
            <input
              id="pin"
              type="password"
              value={password}
              className="inputField"
              placeholder="Enter PIN"
              onChange={this.onChangeUserPin}
            />
            <button type="submit" className="submitBtn">
              Login
            </button>
            {showError && <p className="errorMsg">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
