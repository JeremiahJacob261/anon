import './globals.css'

import {Poppins} from 'next/font/google'
    const pops = Poppins({ subsets: ['latin'],weight:'300' })
export const metadata = {
  title: 'Anon - Your Trusted Anonymous Message App',
  description: 'Built for NACOS',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={pops.className}>{children}</body>
    </html>
  )
}
