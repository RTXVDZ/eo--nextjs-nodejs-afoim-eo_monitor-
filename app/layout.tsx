import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AcoFork 的 EdgeOne 监控大屏',
  description: 'EdgeOne 站点流量与请求量分析',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="https://q2.qlogo.cn/headimg_dl?dst_uin=2726730791&spec=0" />
        <Script src="https://cdn.jsdelivr.net/npm/echarts@5.4.3/dist/echarts.min.js" strategy="beforeInteractive" />
        <Script src="https://cdn.jsdelivr.net/npm/echarts@4.9.0/map/js/world.js" strategy="beforeInteractive" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}