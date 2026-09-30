import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-sky-100/50 to-blue-50/50"></div>
          <div className="max-w-7xl mx-auto relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="inline-block bg-gradient-to-r from-sky-500 to-sky-400 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  AI-Powered Fashion Stylist
                </div>
                <h1 className="text-5xl lg:text-7xl font-bold text-sky-900 leading-tight">
                  Discover Your <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-sky-400">
                    Perfect Style
                  </span>
                </h1>
                <p className="text-xl text-sky-800/80 max-w-lg">
                  Get personalized outfit recommendations powered by AI. Build your digital wardrobe and never wonder what to wear again.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/register"
                    className="bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-700 hover:to-sky-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-lg shadow-sky-500/30 transform hover:scale-105"
                  >
                    Get Started Free
                  </Link>
                  <Link
                    to="/login"
                    className="bg-white hover:bg-sky-50 text-sky-900 border-2 border-sky-100 px-8 py-4 rounded-xl font-semibold text-lg transition-all"
                  >
                    Log In
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-sky-400 to-blue-300 rounded-3xl transform rotate-3 opacity-20"></div>
                <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80"
                    alt="Fashion"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold text-sky-900 mb-4">Why Choose FitStylist?</h2>
              <p className="text-xl text-sky-800/80">
                Our AI-powered platform helps you look your best every day
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'AI Recommendations',
                  description: 'Get personalized outfit suggestions based on your preferences and occasion',
                  icon: '✨',
                },
                {
                  title: 'Digital Wardrobe',
                  description: 'Organize your clothing items and never lose track of what you own',
                  icon: '👗',
                },
                {
                  title: 'Style Suggestions',
                  description: 'Get expert styling advice tailored to your body type and preferences',
                  icon: '🎨',
                },
                {
                  title: 'Seasonal Advice',
                  description: 'Stay stylish year-round with season-appropriate recommendations',
                  icon: '☀️',
                },
                {
                  title: 'Budget Friendly',
                  description: 'Get outfit ideas that fit your budget and shopping habits',
                  icon: '💰',
                },
                {
                  title: 'Save Favorites',
                  description: 'Save your favorite outfits for quick reference and re-wearing',
                  icon: '⭐',
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-sky-50/50 hover:bg-sky-50 p-8 rounded-2xl transition-all duration-300 border border-sky-100 hover:border-sky-200"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-sky-900 mb-3">{feature.title}</h3>
                  <p className="text-sky-800/70">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-sky-100 to-sky-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold text-sky-900 mb-4">How It Works</h2>
              <p className="text-xl text-sky-800/80">
                Three simple steps to discover your perfect style
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: '01',
                  title: 'Create Profile',
                  description: 'Tell us about your style preferences, body type, and occasion needs',
                },
                {
                  step: '02',
                  title: 'Build Wardrobe',
                  description: 'Add your clothing items to create your digital wardrobe',
                },
                {
                  step: '03',
                  title: 'Get Recommendations',
                  description: 'Receive personalized outfit suggestions tailored for you',
                },
              ].map((item, index) => (
                <div key={index} className="relative">
                  <div className="text-6xl font-bold text-sky-200 absolute -top-4 -left-4 opacity-50">
                    {item.step}
                  </div>
                  <div className="relative bg-white p-8 rounded-2xl shadow-lg border border-sky-100">
                    <h3 className="text-2xl font-bold text-sky-900 mb-4">{item.title}</h3>
                    <p className="text-sky-800/70">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto bg-gradient-to-r from-sky-600 to-sky-500 rounded-3xl p-12 text-center text-white shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Style Your Life?</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of users who have discovered their perfect style with AI FitStylist
            </p>
            <Link
              to="/register"
              className="bg-white text-sky-900 px-10 py-4 rounded-xl font-bold text-lg hover:bg-sky-50 transition-colors inline-block shadow-xl"
            >
              Start Your Journey Today
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}