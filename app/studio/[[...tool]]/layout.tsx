export const metadata = {
  title: 'Sanity Studio',
  robots: { index: false, follow: false },
}

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="el">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  )
}
