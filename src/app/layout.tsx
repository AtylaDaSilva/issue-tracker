import type { Metadata } from 'next'
import '@/css/bootstrap/bootstrap.css';
import '@/css/globals.css';

import Sidebar from '@/components/toolbars/Sidebar';

export const metadata: Metadata = {
  title: 'Issue Tracker',
  description: 'Ticketing app. Made by CountDarcula2000.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='vh-100 vw-100 d-flex flex-row' data-bs-theme='dark'>
        <Sidebar />
        {children}
      </body>
    </html>
  )
}
