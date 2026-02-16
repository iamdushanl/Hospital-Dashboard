import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: 'Hospital Analytics Dashboard',
    description: 'Advanced data insights powered by large tabular ML models',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}
