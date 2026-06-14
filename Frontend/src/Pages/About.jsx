export default function About() {
  return (
    <div className="bg-gray-950 text-white min-h-screen px-6 py-12">
      <div className="max-w-6xl mx-auto">

        {/* Hero Section */}
        <section className="text-center mb-16 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-400 mb-4">
            About MoodAI
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            MoodAI is an AI-powered web application that detects human emotions
            in real-time using facial recognition technology and suggests personalized songs based on your mood.
          </p>
        </section>

        {/* How It Works */}
        <section className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-indigo-300">
              How It Works
            </h2>
            <p className="text-gray-400 mb-4 leading-relaxed">
              Our system uses advanced AI models like Google FaceLandmarker to
              analyze facial expressions through your webcam in real-time.
            </p>
            <p className="text-gray-400 leading-relaxed">
              It detects key facial landmarks and predicts emotions such as happy,
              sad, angry, surprised, and more. Then, it recommends songs tailored
              to your current emotional state.
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 shadow-lg">
            <ul className="space-y-4 text-gray-300 list-disc list-inside">
              <li>🎯 Real-time face detection</li>
              <li>🧠 Emotion classification with AI</li>
              <li>📷 Seamless webcam integration</li>
              <li>🎵 Personalized song recommendations</li>
              <li>⚡ Fast and accurate AI processing</li>
            </ul>
          </div>
        </section>

        {/* Features */}
        <section className="mb-20">
          <h2 className="text-2xl font-semibold text-center text-indigo-300 mb-10">
            Features
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              title="Real-Time Detection"
              description="Instantly analyze facial expressions using live camera feed."
            />
            <FeatureCard
              title="AI Powered"
              description="Machine learning models for precise emotion prediction."
            />
            <FeatureCard
              title="Mood-Based Music"
              description="Receive song recommendations tailored to your detected emotions."
            />
            <FeatureCard
              title="Secure & Private"
              description="All data processed locally, no personal info stored."
            />
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mb-20">
          <h2 className="text-2xl font-semibold text-center text-indigo-300 mb-10">
            Tech Stack
          </h2>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-300">
            {["MongoDB", "Express.js", "React", "Node.js", "Tailwind CSS", "Google AI Vision"].map((tech) => (
              <span
                key={tech}
                className="bg-gray-800 px-4 py-2 rounded-full border border-indigo-600"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-gray-500 text-sm">
          Built with <span aria-label="heart" role="img">❤️</span> using MERN & AI
        </footer>

      </div>
    </div>
  );
}

function FeatureCard({ title, description }) {
  return (
    <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-indigo-500 transition shadow-md shadow-indigo-900/50">
      <h3 className="text-lg font-semibold mb-3 text-indigo-400">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </div>
  );
}