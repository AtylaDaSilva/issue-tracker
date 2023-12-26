import type { Metadata } from 'next'
import '@/css/bootstrap/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
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
      <body data-bs-theme='dark'>
        <Sidebar />
        {children}
      </body>
    </html>
  )
}
