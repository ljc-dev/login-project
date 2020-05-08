import Layout from "../components/Layout"
import { useQuery } from '@apollo/react-hooks'
import { GET_USER } from '../lib/schemas'
import { useForm } from '../lib/useForm'
import { withApollo } from "../lib/apollo"
import { errorStyle, dataStyle } from '../lib/stylesLog'

const Profile = () => {
  const { loading, data, error } = useQuery(GET_USER)
  if (loading || !data) return <h1>Loading...</h1>
  let DataComponent, UserData
  if (data && data.getUser) {
    console.log(data)
    if (data.getUser.user) {
      let { id, username, password, tokenVersion } = data.getUser.user
      UserData = (
        <div>
          <p>User id: {id}</p>
          <p>User username: {username}</p>
          <p>User password: {password}</p>
          <p>User token version: {tokenVersion}</p>
        </div>
      )
    }
    const { errorMsg } = data.getUser
    DataComponent = <div style={dataStyle}>
      {UserData && UserData}
      <p>Error message: {errorMsg ? errorMsg : "none"}</p>
    </div>
  }
  return (
    <Layout title={"Profile"}>
      <div className="homeContainer">
        <h1 className="titleHome">Profile</h1>
        {DataComponent && DataComponent}
      </div>
      <style jsx>{`
          .homeContainer {
            display: flex;
            width: 100%;
            max-width: 480px;
            margin: 0 auto;
            background: white;
            padding: 2rem;
            flex-flow: column nowrap;
            justify-content: center;
          }

          .homeContainer .titleHome{
            font-family: "zhi";
            letter-spacing: 0.1rem;
            font-size: 2.5rem;
            padding-bottom: 2rem;
          }

          .dataStyle {
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

export default withApollo({ ssr: true })(Profile)