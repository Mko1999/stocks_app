import Link from 'next/link';
import Image from 'next/image';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
        <div className="mb-8">
          <Image
            src="/assets/icons/logo.svg"
            alt="Signalist logo"
            width={200}
            height={200}
            className="h-auto w-auto"
            priority
          />
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#0FEDBE] to-[#2962FF] bg-clip-text text-transparent">
          Track Stocks Smarter
        </h1>

        <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mb-10">
          Get real-time stock prices, set personalized price alerts, and explore
          detailed company insights - all in one place.
        </p>

        <div className="flex gap-4">
          <Link
            href="/sign-up"
            className="px-8 py-4 bg-[#0FEDBE] text-black font-semibold rounded-lg hover:bg-[#0cd9a8] transition-colors"
          >
            Get Started Free
          </Link>
          <Link
            href="/sign-in"
            className="px-8 py-4 border border-gray-600 text-white font-semibold rounded-lg hover:border-[#0FEDBE] hover:text-[#0FEDBE] transition-colors"
          >
            Sign In
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-[#0F0F0F]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Everything You Need to Trade Smarter
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 rounded-xl bg-[#1A1A1A] border border-gray-800">
              <div className="w-12 h-12 bg-[#0FEDBE]/10 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-[#0FEDBE]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-Time Data</h3>
              <p className="text-gray-400">
                Track live stock prices, market trends, and comprehensive
                financial data for thousands of companies.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-xl bg-[#1A1A1A] border border-gray-800">
              <div className="w-12 h-12 bg-[#2962FF]/10 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-[#2962FF]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Price Alerts</h3>
              <p className="text-gray-400">
                Set custom price alerts and get notified instantly when stocks
                hit your target prices.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-xl bg-[#1A1A1A] border border-gray-800">
              <div className="w-12 h-12 bg-[#0FEDBE]/10 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-[#0FEDBE]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Personalized Watchlist
              </h3>
              <p className="text-gray-400">
                Build your own watchlist and track your favorite stocks with
                detailed metrics and analysis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">How It Works</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#0FEDBE]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-[#0FEDBE]">
                1
              </div>
              <h3 className="text-lg font-semibold mb-2">Create Account</h3>
              <p className="text-gray-400">Sign up for free in seconds</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#2962FF]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-[#2962FF]">
                2
              </div>
              <h3 className="text-lg font-semibold mb-2">Build Watchlist</h3>
              <p className="text-gray-400">Add stocks you want to track</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#0FEDBE]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-[#0FEDBE]">
                3
              </div>
              <h3 className="text-lg font-semibold mb-2">Stay Informed</h3>
              <p className="text-gray-400">Get alerts and insights</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center text-gray-500">
          <p>© 2026 Signalist. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
