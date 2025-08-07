import React from "react";
import Link from "next/link";

const AboutContact = () => (
  <div className="mt-16 text-center fade-in-element">
    <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl p-8 border border-gray-600">
      <h3 className="text-2xl font-bold text-white mb-4">
        Ready to work together?
      </h3>
      <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
        I am always excited to take on new challenges and collaborate on
        innovative projects. Let us discuss how we can bring your ideas to life.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/#contact"
          className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25"
        >
          <span>Get In Touch</span>
          <svg
            className="ml-2 w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </Link>
        <Link
          href="/projects"
          className="inline-flex items-center px-8 py-3 bg-transparent border-2 border-gray-600 text-gray-300 font-semibold rounded-lg hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300"
        >
          <span>View My Work</span>
          <svg
            className="ml-2 w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </div>
  </div>
);

export default AboutContact;
