import Layout from "../components/Layout"
import { useMutation } from '@apollo/react-hooks'
import { LOGIN } from '../lib/schemas'
import { useForm } from '../lib/useForm'
import { withApollo } from "../lib/apollo"
import { setAccessToken } from "../lib/accessTokenFcts"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/dist/client/router"
import { errorStyle } from '../lib/stylesLog'

const Login = () => {
  const router = useRouter()
  const [login, { client, loading, data }] = useMutation(LOGIN)
  const [values, handleChange] = useForm({ username: "", password: "" })
  const handleSubmit = (e) => {
    e.preventDefault()
    login({ variables: { username: values.username, password: values.password } })
      .then(() => {
        console.log("login mutation success")
        client.resetStore()
      })
      .catch((err) => console.log("login mutation failed", err))
  }
  let ErrorComponent
  let [showPassword, setShowPassword] = useState(false)
  if (data && data.login) {
    const { accessToken, errorMsg } = data.login
    if (!errorMsg && accessToken) {
      const { id, username, password, tokenVersion } = data.login.user
      console.log(accessToken)
      setAccessToken(accessToken)
      console.log(accessToken)
      //redirect somewhere
      router.push("/profile")
    } else {
      ErrorComponent = <div style={errorStyle}>Error: {errorMsg}</div>
    }
  }
  return (
    <Layout title={"Log in"}>
      <div className="loginContainer">
        <h1 className="titleLogin">Witty name</h1>
        <form onSubmit={handleSubmit}>
          <div className="usernameContainer">
            <label htmlFor="username" className={`usernameLabel ${values.username && "placeholderUp"}`}>Username</label>
            <input type="text" name="username" className={`usernameBox ${values.username && "userInputDown"}`} onChange={handleChange} />
          </div>
          <div className="passwordContainer">
            <label htmlFor="password" className={`passwordLabel ${values.password && "placeholderUp"}`}>Password</label>
            <input type={`${showPassword ? "text" : "password"}`} name="password" className={`passwordBox ${values.password && "userInputDown"}`} onChange={handleChange} />
            <span className="show" onClick={() => setShowPassword(!showPassword)} style={{ opacity: values.password.length > 0 ? 1 : 0 }}>{showPassword ? "Hide" : "Show"}</span>
          </div>
          <button type="submit" disabled={!values.username || !values.password} className="loginBtn">Log In</button>
        </form>
        <div className="barContainer">
          <div className="barLeft" />
          <div className="orBar">OR</div>
          <div className="barRight" />
        </div>
        <a href="#" className="forgotPassword">Forgot password?</a>
        {ErrorComponent && ErrorComponent}
      </div>
      <div className="logoutContainer">
        <p>Don't have an account?</p><Link href="/signup"><a>Sign up</a></Link>
      </div>
      <style jsx>{`
          .loginContainer, .logoutContainer {
            display: flex;
            width: 100%;
            max-width: 480px;
            margin: 0 auto;
            background: white;
            padding: 2rem;
          }

          .loginContainer {
            flex-flow: column nowrap;
            align-items: center;
            justify-content: center;
          }

          .loginContainer .titleLogin{
            font-family: "zhi";
            letter-spacing: 0.1rem;
            font-size: 2.5rem;
            padding-bottom: 2rem;
          }

          .loginContainer form {
            display: flex;
            width: 100%;
            flex-flow: column nowrap;
            padding: 1rem;
          }
          .loginContainer form {
            padding: 0.5rem;
          }
          
          .usernameContainer, .passwordContainer {
            width: 100%;
            height: 2.25rem;
            position: relative;
            background: rgb(250, 250, 250);
          }
          .usernameContainer {
            margin-bottom: 0.5rem;
          }
          .passwordContainer {
            margin-bottom: 1rem;
          }

          .usernameLabel, .passwordLabel {
            position: absolute;
            font-family: 'Open Sans';
            z-index: 999;
            color: #757575;
            font-size: 0.75rem;  
            width: 100%;
            top: 0.5rem;
            left: 0.5rem;
            border: none;
            transition: all 0.1s linear;
          }

          .placeholderUp {
            top: 0.2rem;
            font-size: 0.65rem;  
          }

          .usernameBox, .passwordBox {
            width: 100%;
            height: 100%;
            position: absolute;
            font-family: Arial, Helvetica, sans-serif;
            background: none;
            font-size: 1rem;
            z-index: 1000;
            padding: 0.5rem;
            font-family: 'Open Sans';
            border: 1px solid #ccc;
            border-radius: 3px;
            transition: all 0.1s linear;
          }

          .usernameBox:focus, .passwordBox:focus {
            border: 1px solid #999;
          }

          .userInputDown {
            font-size: 0.75rem;
            padding: 1rem 0.5rem 0.25rem;
          }

          .show {
            z-index: 1001;
            position: absolute;
            font-size: 0.85rem;
            font-family: Arial, Helvetica, sans-serif;
            font-weight: bold;
            top: 0.5rem;
            right: 0.5rem;
            cursor: pointer;
          }

          .loginBtn {
            padding: 0.5rem;
            border-radius: 4px;
            background: rgb(0, 149, 246);
            color: white;
            font-family: Arial, Helvetica, sans-serif;
            font-weight: bold;
            opacity: 1;
            margin-bottom: 0.5rem;
            cursor: pointer;
            border: none;
            outline: none;
            -webkit-tap-highlight-color: rgba(0,0,0,0);
            -webkit-tap-highlight-color: transparent;
          }

          .loginBtn:disabled {
            cursor: default;
            opacity: 0.3;
          }

          .logoutContainer {
            flex-flow: row nowrap;
            justify-content: center;
          }

          .logoutContainer p, .logoutContainer a{
            font-size: 0.8rem;
            font-family: "Open Sans";
            font-style: italic;
            letter-spacing: 0.005rem;
            color: #222;
          }
          .logoutContainer a{
            padding-left: 5px;
            font-weight: bold;
            letter-spacing: 0.05rem;
            color: rgb(0, 149, 246);
            outline: none;
            text-decoration: none;
          }

          .barContainer {
            display: flex;
            width: 100%;
            flex-flow: row nowrap;
            align-items: center;
            margin-bottom: 1rem;
          }

          .barContainer .barLeft, .barContainer .barRight{
            background: #ccc;
            flex-grow: 1;
            flex-shrink: 1;
            height: 1px;
          }

          .barContainer .barLeft {
            margin-left: 0.5rem;
          }
          .barContainer .barRight {
            margin-right: 0.5rem;
          }

          .barContainer .orBar{
            color: #888;
            text-transform: uppercase;
            font-size: 0.85rem;
            font-family: "Open Sans";
            flex-grow: 0;
            flex-shrink: 0;
            padding: 0 1rem;
          }

          .forgotPassword {
            color: darkblue;
            font-family: 'Open Sans';
            font-size: 0.75rem;
            text-decoration: none;
            margin-bottom: 0.5rem;
          }
          
        `}
      </style>
    </Layout>
  )
}

export default withApollo({ ssr: true })(Login)