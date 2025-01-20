// 'use client'

// import React from 'react'
// import { Provider as FSClinicalsProvider } from 'react-redux'
// import { fsclinicalsStore } from '@/store/fsclinicalsStore'

// export default function ClientRoot({ children }: { children: React.ReactNode }) {
//   return <FSClinicalsProvider store={fsclinicalsStore}>{children}</FSClinicalsProvider>
// }

'use client'

import React, { useEffect } from 'react'
import { Provider as FSClinicalsProvider } from 'react-redux'
import { fsclinicalsStore } from '@/store/fsclinicalsStore'
import { useSelector, useDispatch } from 'react-redux'
import { FSClinicalsRootState } from '@/store/fsclinicalsStore'
import { fsclinicalsSetDarkMode } from '@/store/slices/fsclinicalsThemeSlice'

function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const isDarkMode = useSelector((state: FSClinicalsRootState) => state.theme.fsclinicalsIsDarkMode)
  const dispatch = useDispatch()

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      dispatch(fsclinicalsSetDarkMode(e.matches))
    }

    dispatch(fsclinicalsSetDarkMode(darkModeMediaQuery.matches))
    darkModeMediaQuery.addListener(handleChange)

    return () => darkModeMediaQuery.removeListener(handleChange)
  }, [dispatch])
  
  return (
    <div className={isDarkMode ? 'dark' : 'light'}>
      {children}
    </div>
  )
}

export default function FSClinicalsClientRoot({ children }: { children: React.ReactNode }) {
  return (
    <FSClinicalsProvider store={fsclinicalsStore}>
      <ThemeWrapper>{children}</ThemeWrapper>
    </FSClinicalsProvider>
  )
}