import Layout from "../components/Layout"
import { useMutation } from '@apollo/react-hooks'
import { ADD_USER } from '../lib/schemas'
import { useForm } from '../lib/useForm'
import { withApollo } from "../lib/apollo"
import Link from "next/link"
import { errorStyle } from '../lib/stylesLog'
import { useRouter } from "next/dist/client/router"
import { useState } from "react"

const Signup = () => {
  const router = useRouter()
  const [addUser, { loading, data }] = useMutation(ADD_USER)
  const [values, handleChange] = useForm({ username: "", password: "" })
  const handleSubmit = (e) => {
    e.preventDefault()
    addUser({ variables: { username: values.username, password: values.password } })
      .then(console.log("sign up mutation success"))
      .catch(console.log("sign up mutation failed"))
  }
  let [showPassword, setShowPassword] = useState(false)
  let ErrorComponent
  if (data && data.addUser) {
    //check that sign up worked
    const { errorMsg } = data.addUser
    if (!errorMsg) {
      router.push("/login")
    } else {
      ErrorComponent = <div className="errorMsg" style={errorStyle}>Error: {errorMsg}</div>
    }
  }
  return (
    <Layout title={"Sign up"}>
      <div className="signupContainer">
        <h1 className="titleSignup">Witty name</h1>
        <h3 className="descSignup">Sign up to witty name and... go on living your life.</h3>
        <div className="barContainer">
          <div className="barLeft" />
          <div className="orBar">OR</div>
          <div className="barRight" />
        </div>
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
          <button type="submit" disabled={!values.username || !values.password} className="signupBtn">Sign up</button>
        </form>
        <p className="policy">By signing up, you agree to be unproductive. We don't collect, use or share your data because you're not worth it. We send refresh tokens through a cookie but you won't see it 'coz it's httpOnly.</p>
        {ErrorComponent && ErrorComponent}
      </div>
      <div className="loginContainer">
        <p>Have an account?</p><Link href="/login"><a>Log in</a></Link>
      </div>
      <style jsx>{`
          .signupContainer, .loginContainer {
            display: flex;
            width: 100%;
            max-width: 480px;
            margin: 0 auto;
            background: white;
            padding: 2rem;
          }

          .signupContainer {
            flex-flow: column nowrap;
            align-items: center;
            justify-content: center;
          }

          .signupContainer .titleSignup{
            font-family: "zhi";
            letter-spacing: 0.1rem;
            font-size: 2.5rem;
            padding-bottom: 1.5rem;
          }
          .signupContainer .descSignup{
            letter-spacing: -0.015rem;
            font-size: 1.15rem;
            text-align: center;
            font-weight: 550;
            padding-bottom: 2rem;
            color: #8a8a8a;
          }

          .signupContainer form {
            display: flex;
            width: 100%;
            flex-flow: column nowrap;
            padding: 1rem;
          }
          .signupContainer form {
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

          .signupBtn {
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

          .signupBtn:disabled {
            cursor: default;
            opacity: 0.3;
          }

          .loginContainer {
            flex-flow: row nowrap;
            justify-content: center;
          }

          .loginContainer p, .loginContainer a{
            font-size: 0.8rem;
            font-family: "Open Sans";
            font-style: italic;
            letter-spacing: 0.005rem;
            color: #222;
          }
          .loginContainer a{
            padding-left: 5px;
            font-weight: bold;
            color: rgb(0, 149, 246);
            letter-spacing: 0.05rem;
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
          
          .policy {
            font-size: 0.75rem;
            font-family: "Open Sans";
            text-align: center;
            color: #888;
            padding-bottom: 0.5rem;
          }
        `}
      </style>
    </Layout>
  )
}

export default withApollo({ ssr: true })(Signup)