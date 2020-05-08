import Head from 'next/head'
import Header from './Header'

const Layout = ({ children, title = "Welcome" }) => {
  return (
    <div>
      <Head>
        <link rel="preload" href="../fonts/OpenSans-Regular.ttf" as="font" crossOrigin="" />
        <link rel="preload" href="../fonts/OpenSans-Light.ttf" as="font" crossOrigin="" />
        <link rel="preload" href="../fonts/OpenSans-Bold.ttf" as="font" crossOrigin="" />
        <link rel="preload" href="../fonts/ZhiMangXing-Regular.ttf" as="font" crossOrigin="" />
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
      </Head>
      <main>
        <Header />
        {children}
      </main>
      <style jsx global>
        {`
          * {
            padding: 0;
            margin: 0;
            box-sizing: border-box;
          }
          main {
            display: block;
            width: 100%;
            height: 100vh;
            background: #fff;
          }
        `}
      </style>
    </div>
  )
}

export default Layout