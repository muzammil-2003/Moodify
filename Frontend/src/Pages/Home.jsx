import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 text-white flex flex-col items-center px-6 py-20">
      
      {/* Hero Section */}
      <section className="text-center max-w-3xl">
        <h1 className="text-5xl font-extrabold text-indigo-400 mb-4">
          MoodAI
        </h1>
        <p className="text-gray-300 text-lg mb-8">
          Detect and understand human emotions in real-time using AI-powered facial expression recognition, 
          then get personalized song recommendations based on your current mood.
          Harness the power of Google FaceLandmarker integrated in a full MERN stack app.
        </p>
        <div className="flex justify-center gap-6">
          <Link
            to="/detect"
            className="px-6 py-3 bg-indigo-500 rounded-lg text-white font-semibold hover:bg-indigo-600 transition"
          >
            Detect Mood Now
          </Link>
          <Link
            to="/about"
            className="px-6 py-3 border border-indigo-500 rounded-lg text-indigo-500 hover:bg-indigo-600 hover:text-white transition"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl w-full">
        <FeatureCard
          icon="🧠"
          title="AI-Powered Detection"
          description="Utilizes advanced Google FaceLandmarker API to analyze facial expressions and detect emotions accurately."
        />
        <FeatureCard
          icon="🎵"
          title="Mood-Based Song Suggestions"
          description="Receive personalized playlists and song recommendations tailored to your detected mood and emotions."
        />
        <FeatureCard
          icon="🔒"
          title="Privacy First"
          description="All processing happens locally in your browser, ensuring your video data never leaves your device."
        />
      </section>

      {/* How it Works Section */}
      <section className="mt-20 max-w-4xl text-center px-4">
        <h2 className="text-3xl font-bold text-indigo-400 mb-6">
          How It Works
        </h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          1. Allow access to your webcam — no video is recorded or sent anywhere.
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          2. The AI model analyzes your facial landmarks and expressions in real-time.
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          3. Based on your detected mood, get personalized song suggestions to enhance or balance your emotions.
        </p>
      </section>

      {/* Call to Action */}
      <section className="mt-16">
        <Link
          to="/detect"
          className="inline-block px-8 py-4 bg-indigo-600 rounded-xl text-white font-semibold text-lg hover:bg-indigo-700 transition"
        >
          Start Detecting Your Mood & Get Songs
        </Link>
      </section>
    </main>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-gray-800 rounded-xl p-6 flex flex-col items-center text-center shadow-md shadow-indigo-900/50">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
}