import Layout from "../components/Layout"
import { withApollo } from "../lib/apollo"

const Index = () => {
  return (
    <Layout title={"Home"}>
      <div className="homeContainer">
        <h1 className="titleHome">Witty name</h1>
        <div className="centerDiv">
          <div className="coverImgDiv">
            <img className="coverImg" src="/landingCover.png" alt="" />
          </div>
          <p className="coverCaption">Quick image made in Inkscape following <a className="ytLink" href="https://www.youtube.com/watch?v=QbxunFvEHYY&list=PLynG8gQD-n8BMplEVZVsoYlaRgqzG1qc4&index=19">logos By Nick tutorial</a></p>
        </div>
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

          .homeContainer .titleHome{
            font-family: "zhi";
            letter-spacing: 0.1rem;
            font-size: 2.5rem;
            padding-bottom: 2rem;
          }

          .centerDiv {
            position: relative;
            width: min(100%, 480px);
            margin: 0 auto;
            display: flex;
            flex-flow: column nowrap;
            justify-content: center;
          }

          .coverImgDiv {
            display: block;
            text-align: center;
          }

          .coverImg {
            width: min(250px, 100%);
          }
          
          .coverCaption {
            display: block;
            font-family: "Open Sans";
            align-self: center;
            line-height: 1.9rem;
            text-align: center;
          }

          .ytLink {
            color: black;
            outline: none;
            text-decoration: none;
            text-decoration: underline;
          }
          @media (min-width: 800px) {
            .centerDiv {
              flex-flow: row nowrap;
              width: min(100%, 800px);
              justify-content: space-around;
            }

            .coverImg {
              width: min(450px, 100%);
            }
          }
        `}
      </style>
    </Layout>
  )
}

export default withApollo({ ssr: true })(Index)