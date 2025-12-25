interface LoadingProgressProps {
  progress: number
}

export default function LoadingProgress({ progress }: LoadingProgressProps) {
  return (
    <div id="loading-progress-container" className="fixed top-0 left-0 w-full h-1 z-50 bg-transparent pointer-events-none">
      <div 
        id="loading-progress-bar" 
        className="h-full bg-blue-500 transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}