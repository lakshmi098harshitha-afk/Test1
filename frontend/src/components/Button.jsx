export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const baseStyle = 'px-4 py-2 rounded-lg font-medium transition-all'
  const variants = {
    primary: 'bg-gradient-to-r from-sky-600 to-sky-500 text-white hover:from-sky-700 hover:to-sky-600',
    secondary: 'bg-white text-sky-900 border-2 border-sky-200 hover:border-sky-400',
    outline: 'border-2 border-sky-600 text-sky-600 hover:bg-sky-50',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  }

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}