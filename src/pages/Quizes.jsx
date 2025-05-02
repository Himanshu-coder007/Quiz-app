import React from 'react';
import { Link } from 'react-router-dom';
import data from '../data/data.json';

// Import topic images (make sure these exist in your assets)
import reactImage from '../assets/react.png';
import javascriptImage from '../assets/javascript.png';
import cppImage from '../assets/cpp.png';
import oopsImage from '../assets/oops.png';
import dbmsImage from '../assets/dbms.png';
import osImage from '../assets/os.png';
import cybersecurityImage from '../assets/cybersecurity.png';

const Quizes = () => {
  // Map topic names to their images
  const topicImages = {
    "React": reactImage,
    "JavaScript": javascriptImage,
    "C++": cppImage,
    "OOPs": oopsImage,
    "DBMS": dbmsImage,
    "OS": osImage,
    "Cyber Security": cybersecurityImage
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-12">Choose a Quiz Topic</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(data.quizzes).map(([topic, quizzes]) => (
            <div 
              key={topic} 
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col h-full"
            >
              <div className="h-48 w-full overflow-hidden flex items-center justify-center bg-gray-200 p-4">
                <img 
                  src={topicImages[topic]} 
                  alt={topic} 
                  className="object-contain h-full w-full"
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                  }}
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{topic}</h2>
                <p className="text-gray-600 mb-4">{quizzes.length} {quizzes.length === 1 ? 'question' : 'questions'}</p>
                <div className="mt-auto">
                  <Link
                    to={`/quiz/${topic.toLowerCase().replace(/\s+/g, '-')}`}
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300 w-full text-center"
                  >
                    Start Quiz
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quizes;