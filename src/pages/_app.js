import { ThemeProvider } from 'next-themes'
import AuthProvider from 'src/contexts/AuthProvider'
import ThemeSwitch from 'src/layouts/ThemeSwitch'
import '../styles/globals.css'
import '../assets/fontawesome/css/all.min.css'
import Router, { useRouter } from 'next/router'
import PublicLayot from 'src/layouts/PublicLayout'
import AdminLayout from 'src/layouts/AdminLayout'
import NextNProgress from 'nextjs-progressbar';
import NProgress from "nprogress"
import { useEffect } from 'react'
Router.onRouteChangeStart = url => {
  NProgress.start()
}
Router.onRouteChangeComplete = () => NProgress.done()

Router.onRouteChangeError = () => NProgress.done()

import * as gtag from 'src/lib/gtag'
import Analytics from 'src/components/geral/Analytics'
import LayoutAdmin from 'src/layouts/admin'

function App({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = url => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  let Layout;
  if (router.pathname.startsWith('/admin')) {
    Layout = AdminLayout;
  }
  else if (router.pathname.startsWith('/')) {
    Layout = PublicLayot;
  }
  return (
    <ThemeProvider attribute='class'>
      <AuthProvider>
        <ThemeSwitch>
          <Layout>
            <>
              <NextNProgress color="#dc4672"/>
              <Component {...pageProps} />
            </>
            <Analytics />
          </Layout>
        </ThemeSwitch>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App

