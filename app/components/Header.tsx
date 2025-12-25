interface HeaderProps {
  siteName: string
}

export default function Header({ siteName }: HeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 id="page-header" className="text-3xl font-bold tracking-tight text-slate-900">
          {siteName || 'AcoFork 的 EdgeOne 监控大屏'}
        </h1>
        <p className="text-muted-foreground mt-1">EdgeOne 站点流量与请求量分析</p>
      </div>
    </div>
  )
}