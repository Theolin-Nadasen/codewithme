'use client';

export default function WhatsNewSection() {
  return (
    <section className="my-10 p-6 bg-gray-800 text-white rounded-lg shadow-xl max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-4">What's New! ✨</h2>
      <p className="text-lg text-center mb-6">
        We&apos;ve introduced a brand new AI Assistant to help you with your coding journey!
        Ask questions, get code explanations, and even generate code snippets directly from our chat.
      </p>
      <div className="text-center">
        <button
          onClick={() => {
            // Dispatch event to open chat and send a demo prompt
            window.dispatchEvent(new CustomEvent('open-ai-chat', {
              detail: { prompt: "Write a simple &apos;Hello, World!&apos; program in Python." }
            }));
          }}
          className="bg-green-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-600 transition-colors shadow-md"
        >
          Try AI Now!
        </button>
      </div>
    </section>
  );
}
