import { ThemeProvider } from 'next-themes'
import AuthProvider from 'src/contexts/AuthProvider'
import ThemeSwitch from 'src/layouts/ThemeSwitch'
import '../styles/globals.css'
import '../assets/fontawesome/css/all.min.css'
import { useRouter } from 'next/router'
import PublicLayot from 'src/layouts/PublicLayout'
import AdminLayout from 'src/layouts/AdminLayout'
import { useEffect } from 'react'

import * as gtag from 'src/lib/gtag'
import Analytics from 'src/components/geral/Analytics'

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
  if(router.pathname.startsWith('/admin')){
    Layout = AdminLayout;
  }
  else if(router.pathname.startsWith('/')){
    Layout = PublicLayot;
  }
return (
  <ThemeProvider attribute='class'>
    <AuthProvider>
      <ThemeSwitch>
        <Layout>
          <Component {...pageProps} />
          <Analytics/>
        </Layout>
      </ThemeSwitch>
    </AuthProvider>
  </ThemeProvider>
)
}

export default App

