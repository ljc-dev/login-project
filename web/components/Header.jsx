import Link from 'next/link'
import { getAccessToken } from '../lib/accessTokenFcts'

const Header = ({ isLogin = false }) => {
  if (getAccessToken()) isLogin = true
  return (
    <nav>
      <div className="leftMenu">
        <Link href="/"><a className="homeMenu">Home</a></Link>
        <Link href="/profile"><a className="profileMenu">Profile</a></Link>
      </div>
      <div className="rightMenu">
        <Link href="/login"><a className="loginMenu" style={{ display: isLogin ? "none" : "block" }}>Log in</a></Link>
        <Link href="/signup"><a className="signupMenu" style={{ display: isLogin ? "none" : "block" }}>Sign up</a></Link>
        <Link href="/logout"><a className="logoutMenu" style={{ display: isLogin ? "block" : "none" }}>Log out</a></Link>
      </div>
      <style jsx>{`
        nav {
          position: relative;
          width: 100%;
          height: 3rem;
          background: black;
        }
        .leftMenu, .rightMenu {
          display: flex;
          flex-flow: row nowrap;
          position: absolute;
          align-items: center;
          top: 0;
          bottom: 0;
        }
        .lefttMenu {
          left: 0;
        }
        .rightMenu {
          right: 0;
        }
        .loginMenu, .signupMenu, .logoutMenu{
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
        .loginMenu {
          background: black;
          color: rgb(0, 149, 246);
          border: 1px solid rgb(0, 149, 246);
        }
        .signupMenu {
          background: rgb(0, 149, 246);
          color: #eee;
          border: 1px solid black;
        }
        .logoutMenu {
          background: rgb(0, 149, 246);
          color: #eee;
          border: 1px solid black;
        }
        .homeMenu, .profileMenu {
          display: block;
          letter-spacing: 0.05rem;
          font-weight: 800;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 0.9rem;
          padding: 0.5rem 1rem 0.35rem;
          margin: 0 0.3rem;
          color: #eee;
        }

        a {
          display: block;
          padding: 5px;
          text-decoration: none;
          outline: none;
        }
        a:hover, a:focus {
          text-decoration: none;
        }
        @font-face {
          font-family: 'Open Sans';
          src: url('/fonts/OpenSans-Regular.ttf'); 
        }
        @font-face {
          font-family: 'Open Sans';
          font-weight: bold;
          src: url('/fonts/OpenSans-Light.ttf'); 
        }
        @font-face {
          font-family: 'Open Sans';
          font-style: italic;
          src: url('/fonts/OpenSans-Light.ttf'); 
        }
        @font-face {
          font-family: 'zhi';
          src: url('/fonts/ZhiMangXing-Regular.ttf'); 
        }
      `}</style>
    </nav>
  )
}

export default Header