export default function AskAiIcon() {
  return (
    <div className="relative w-28 h-14">
      <div className="absolute inset-0 bg-black rounded-full"></div>
      <div className="absolute inset-0 border-2 border-green-400 rounded-full animate-pulse-green"></div>
      <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg">
        Ask AI
      </div>
    </div>
  );
}
