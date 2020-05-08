import Layout from "../components/Layout"
import { useMutation } from '@apollo/react-hooks'
import { LOGOUT } from '../lib/schemas'
import { useForm } from '../lib/useForm'
import { withApollo } from "../lib/apollo"
import { setAccessToken } from "../lib/accessTokenFcts"
import { errorStyle, dataStyle } from '../lib/stylesLog'
import { useState } from "react"
import { useRouter } from "next/dist/client/router"

const Logout = () => {
  const [logout, { loading, data, client }] = useMutation(LOGOUT)
  const router = useRouter()
  const handleClick = (e) => {
    e.preventDefault()
    logout({ variables: {} })
      .then(() => {
        console.log("logout mutation success")
        client.resetStore()
        setAccessToken("")
      })
      .catch((err) => console.log("logout mutation failed", err))
  }
  let DataComponent
  if (data && data.logout) {
    console.log(data)
    let { ok, errorMsg } = data.logout
    if (!errorMsg) return router.push("/")
    DataComponent = <div>
      <p>Logout ok: {ok ? "true" : "false"}</p>
      <p>Error message: {errorMsg ? errorMsg : "none"}</p>
    </div>
  }
  let [isMouseOnLogoutBtn, setIsMouseOnLogoutBtn] = useState(false)
  return (
    <Layout title={"Log out"}>
      <div className="homeContainer">
        <h1 className="logoutTitle">Log out</h1>
        <div className="dataStyle">
          {DataComponent && DataComponent}
        </div>
        <button className="logoutBtn"
          onMouseOver={() => setIsMouseOnLogoutBtn(true)}
          onMouseLeave={() => setIsMouseOnLogoutBtn(false)}
          onClick={handleClick}>{isMouseOnLogoutBtn ? "You're a monster..." : "Be mean and click me"}</button>
      </div>
      <style jsx>{`
        
        .homeContainer {
          display: flex;
          position: relative;
          width: 100%;
          height: calc(100% - 3rem);
          margin: 0 auto;
          padding: 2rem;
          flex-flow: column nowrap;
          align-items: center;
        }

        .homeContainer .logoutTitle{
          font-family: "zhi";
          letter-spacing: 0.1rem;
          font-size: 2.5rem;
          padding-bottom: 2rem;
          text-align: center;
        }

        .logoutBtn {
          display: block;
          border-radius: 3rem;
          border: 1px solid red;
          letter-spacing: 0.05rem;
          font-weight: 800;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 0.8rem;
          padding: 0.5rem 1rem 0.35rem;
          margin: 0 0.3rem;
        }
        .logoutBtn {
          background: black;
          color: rgb(0, 149, 246);
          border: 1px solid rgb(0, 149, 246);
          cursor: pointer;
        }

        .logoutBtn:hover {
          background: rgb(0, 0, 0);
          color: #eee;
          border: 1px solid black;
        }

        .dataStyle {
          color: black;
          font-family: "Open Sans";
          font-size: 0.9rem;
          line-height: 1.3rem;
          letter-spacing: -0.005rem;
          margin-bottom: 0.5rem;
          word-wrap: break-word;
        }
      `}
      </style>
    </Layout>
  )
}

export default withApollo({ ssr: true })(Logout)