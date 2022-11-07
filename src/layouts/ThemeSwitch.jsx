import { useState, useEffect, useContext } from 'react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import Image from 'next/image'
import { AuthContext } from 'src/contexts/AuthProvider'

const ThemeSwitch = ({ children }) => {
  const themes = [
    { id: 1, icon: 'sun', label: 'light' },
    { id: 2, icon: 'moon', label: 'dark' },
    { id: 3, icon: 'cog', label: 'system' },
  ]
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const [currentTheme, setCurrentTheme] = useState(themes.find(t => t.label === theme))
  const [openOptions, setOpenOptions] = useState(false)

  const { user } = useContext(AuthContext)

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }
  console.log(currentTheme)

  return (
    <div className='h-screen relative w-screen overflow-hidden'>
      <div className='flex justify-between w-full h-10 items-center px-2'>
        <Link
          className='block dark:hidden'
          href="/"
        >
          <Image
            src="/images/logo.png"
            width="100"
            height="50"
            alt="SweetCode"
          />
        </Link>
        <Link
          className='hidden dark:block'
          href="/"
        >
          <Image
            src="/images/dark-logo.png"
            width="100"
            height="50"
            alt="SweetCode"
          />
        </Link>

        <div className='flex justify-center items-center'>
          {user !== null && <div className='mr-2'>
            <Link
              href={`/admin/${user.id}`}
            >
              <i className='far fa-user'></i>
            </Link>
          </div>}
          <div className='w-24 m-1 relative'>

            <button
              className='border-2 dark:border-gray-600 border-gray-200 px-3 py-1 w-full uppercase text-[10px] font-bold'
              onClick={() => setOpenOptions(openOptions ? false : true)}
            >
              <i
                className={`far fa-${currentTheme.icon} mr-2`}></i>
              {currentTheme.label}
            </button>
            {openOptions && <div className='w-full bg-gray-50 dark:bg-gray-500 p-1 absolute top-full shadow-md'>
              {themes.map(theme => (
                <button
                  key={theme.id} onClick={() => {
                    setTheme(theme.label)
                    setCurrentTheme(theme)
                    setOpenOptions(false)
                  }}
                  className='border-2 dark:border-gray-700 border-gray-200 px-3 py-1 my-1 bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-800 hover:bg-gray-200 transition-colors duration-700 uppercase text-[10px] font-bold block w-full'
                ><i className={`far fa-${theme.icon} mr-2`}></i>{theme.label}</button>
              ))}
            </div>}
          </div>
        </div>
      </div>
      <div style={{ height: 'calc(100vh - 40px)' }}>
        {children}
      </div>
    </div>
  )
}

export default ThemeSwitch