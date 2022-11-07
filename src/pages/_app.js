import { ThemeProvider } from 'next-themes'
import AuthProvider from 'src/contexts/AuthProvider'
import ThemeSwitch from 'src/layouts/ThemeSwitch'
import '../styles/globals.css'
import '../assets/fontawesome/css/all.min.css'
import { useRouter } from 'next/router'
import PublicLayot from 'src/layouts/PublicLayout'
import AdminLayout from 'src/layouts/AdminLayout'

function MyApp({ Component, pageProps }) {
  const router = useRouter();
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
          </Layout>
        </ThemeSwitch>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default MyApp

