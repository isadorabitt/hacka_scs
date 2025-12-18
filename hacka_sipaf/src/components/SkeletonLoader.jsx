// CSS importado centralmente em main.jsx via styles/main.css

function SkeletonLoader({ width = '100%', height = '20px', className = '' }) {
  return (
    <div 
      className={`skeleton-loader ${className}`}
      style={{ width, height }}
    />
  )
}

export default SkeletonLoader

