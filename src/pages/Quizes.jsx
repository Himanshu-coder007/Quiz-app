import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
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

  // Function to handle quiz start using topic name
  const handleStartQuiz = (topicName) => {
    navigate(`/quiz/${topicName}`);
  };

  // Create an array of topics with their names
  const allTopics = Object.keys(data.quizzes).map((topicName) => {
    return {
      name: topicName,
      count: data.quizzes[topicName].length,
      image: topicImages[topicName],
    };
  });

  // Filter topics based on search term
  const filteredTopics = allTopics.filter(topic =>
    topic.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">Choose a Quiz Topic</h1>
        
        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search quizzes..."
              className="w-full py-3 px-4 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              className="absolute right-3 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        {filteredTopics.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No quizzes found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTopics.map((topic) => (
              <div 
                key={topic.name} 
                className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col h-full"
              >
                <div className="h-48 w-full overflow-hidden flex items-center justify-center bg-gray-200 p-4">
                  <img 
                    src={topic.image} 
                    alt={topic.name} 
                    className="object-contain h-full w-full"
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                    }}
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">{topic.name}</h2>
                  <p className="text-gray-600 mb-4">{topic.count} {topic.count === 1 ? 'quiz' : 'quizzes'} available</p>
                  <div className="mt-auto">
                    <button
                      onClick={() => handleStartQuiz(topic.name)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300 text-center"
                    >
                      Start Quiz
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Quizes;