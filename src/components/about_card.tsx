'use client'

const About_Card = () => {
  return (
    <>
      <div className="relative w-full max-w-sm md:max-w-lg mx-auto rounded-2xl shadow-2xl overflow-hidden">
        {/* Animated Border - using a pseudo-element for the animation */}
        <div className="animated-border-container">
          <div className="animated-border"></div>
        </div>

        {/* Card Content */}
        <div className="relative z-10 flex flex-col gap-6 md:gap-8 p-6 md:p-8 bg-gray-900 rounded-xl m-1">
          <div className="card_title__container">
            <span className="block text-xl md:text-2xl font-bold text-green-300">About Code With Me</span>
            <p className="mt-1 text-sm md:text-base text-gray-100 w-full md:w-4/5">
              Welcome to Code With Me! We teach a wide range of programming languages and frameworks, covering both backend and frontend development, and much more.
            </p>
          </div>

          <hr className="border-gray-700" />

          <ul className="flex flex-col gap-3 md:gap-4">
            <li className="flex items-center gap-3 md:gap-4">
              <span className="flex items-center justify-center w-5 h-5 md:w-6 md:h-6 bg-green-400 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3 md:w-4 md:h-4 text-gray-900">
                  <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" />
                </svg>
              </span>
              <span className="text-base md:text-lg text-gray-100">Comprehensive Programming Tutorials</span>
            </li>
            <li className="flex items-center gap-3 md:gap-4">
              <span className="flex items-center justify-center w-5 h-5 md:w-6 md:h-6 bg-green-400 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3 md:w-4 md:h-4 text-gray-900">
                  <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" />
                </svg>
              </span>
              <span className="text-base md:text-lg text-gray-100">Backend and Frontend Development</span>
            </li>
            <li className="flex items-center gap-3 md:gap-4">
              <span className="flex items-center justify-center w-5 h-5 md:w-6 md:h-6 bg-green-400 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3 md:w-4 md:h-4 text-gray-900">
                  <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" />
                </svg>
              </span>
              <span className="text-base md:text-lg text-gray-100">Diverse Range of Programming Languages & Frameworks</span>
            </li>
            <li className="flex items-center gap-3 md:gap-4">
              <span className="flex items-center justify-center w-5 h-5 md:w-6 md:h-6 bg-green-400 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3 md:w-4 md:h-4 text-gray-900">
                  <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" />
                </svg>
              </span>
              <span className="text-base md:text-lg text-gray-100">YouTube Channel: Code With Me</span>
            </li>
            <li className="flex items-center gap-3 md:gap-4">
              <span className="flex items-center justify-center w-5 h-5 md:w-6 md:h-6 bg-green-400 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3 md:w-4 md:h-4 text-gray-900">
                  <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" />
                </svg>
              </span>
              <span className="text-base md:text-lg text-gray-100">And Much More!</span>
            </li>
          </ul>

          <button className="w-full py-3 md:py-4 text-base md:text-lg font-semibold text-gray-900 bg-green-400 rounded-full shadow-lg hover:bg-green-500 transition-colors duration-300">
            Explore Our Content
          </button>
        </div>
      </div>
      <style jsx>{`
        .animated-border-container {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 1rem; /* same as the card's border-radius */
          overflow: hidden;
        }
        .animated-border {
          position: absolute;
          width: 200%;
          height: 200%;
          top: -50%;
          left: -50%;
          background: conic-gradient(
            from 180deg at 50% 50%,
            rgba(255, 255, 255, 0) 0deg,
            #34d399 360deg
          );
          animation: rotate 4s linear infinite;
        }
        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
}

export default About_Card;