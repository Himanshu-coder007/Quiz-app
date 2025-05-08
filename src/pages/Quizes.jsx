import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import data from '../data/data.json';

// Import topic images
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
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [customQuizzes, setCustomQuizzes] = useState([]);

  // Theme colors
  const themeColors = {
    primary: '#006FF4',
    secondary: '#EA0001',
    accent1: '#FDBE08',
    accent2: '#8BD30D',
    dark: '#1F2937',
    light: '#F9FAFB'
  };

  // Load custom quizzes from localStorage on component mount
  useEffect(() => {
    const storedQuizzes = JSON.parse(localStorage.getItem('quizzes')) || {};
    const customQuizTopics = Object.keys(storedQuizzes).map(topicName => ({
      name: topicName,
      count: storedQuizzes[topicName].questions.length,
      image: storedQuizzes[topicName].coverPhoto || 'https://via.placeholder.com/300x200?text=Quiz+Cover',
      category: storedQuizzes[topicName].category || 'Others',
      isCustom: true
    }));
    setCustomQuizzes(customQuizTopics);
  }, []);

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

  // Categories for filtering (now includes all possible categories)
  const categories = ['All', 'Programming', 'Computer Science', 'Security', 'Others'];

  // Topic to category mapping for predefined quizzes
  const topicCategories = {
    "React": "Programming",
    "JavaScript": "Programming",
    "C++": "Programming",
    "OOPs": "Computer Science",
    "DBMS": "Computer Science",
    "OS": "Computer Science",
    "Cyber Security": "Security"
  };

  // Function to handle quiz start
  const handleStartQuiz = (topicName, isCustom = false) => {
    navigate(`/quiz/${topicName}`, { state: { isCustom } });
  };

  // Create an array of predefined topics with their details
  const predefinedTopics = Object.keys(data.quizzes).map((topicName) => {
    return {
      name: topicName,
      count: data.quizzes[topicName].length,
      image: topicImages[topicName],
      category: topicCategories[topicName] || 'Others',
      isCustom: false
    };
  });

  // Combine predefined and custom quizzes
  const allTopics = [...predefinedTopics, ...customQuizzes];

  // Filter topics based on search term and selected category
  const filteredTopics = allTopics.filter(topic => {
    const matchesSearch = topic.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || topic.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort topics alphabetically
  const sortedTopics = [...filteredTopics].sort((a, b) => a.name.localeCompare(b.name));

  // Get category color
  const getCategoryColor = (category) => {
    switch(category) {
      case 'Programming': return themeColors.primary;
      case 'Computer Science': return themeColors.accent2;
      case 'Security': return themeColors.secondary;
      case 'Others': return themeColors.accent1;
      default: return themeColors.dark;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Explore <span style={{ color: themeColors.primary }}>Our</span>{' '}
            <span style={{ color: themeColors.secondary }}>Quizzes</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Test your knowledge with our collection of interactive quizzes, including admin-created content.
          </p>
        </div>
        
        {/* Search and Filter Section */}
        <div className="max-w-4xl mx-auto mb-12 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search quizzes by topic..."
              className="block w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ borderColor: themeColors.primary }}
            />
          </div>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
                style={{
                  backgroundColor: selectedCategory === category ? getCategoryColor(category) : '',
                  borderColor: selectedCategory === category ? getCategoryColor(category) : ''
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Section */}
        {sortedTopics.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm max-w-2xl mx-auto border" style={{ borderColor: themeColors.accent1 }}>
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No quizzes found</h3>
            <p className="mt-1 text-gray-500">
              {searchTerm 
                ? `No quizzes match "${searchTerm}" in ${selectedCategory} category`
                : `No quizzes available in ${selectedCategory} category`}
            </p>
            <div className="mt-6">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300"
                style={{ 
                  backgroundColor: themeColors.primary,
                  '&:hover': { backgroundColor: '#0059C7' },
                  focusRingColor: themeColors.primary
                }}
              >
                Clear filters
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedTopics.map((topic) => (
              <div 
                key={topic.name} 
                className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col h-full border border-gray-200"
                style={{ 
                  borderTopColor: getCategoryColor(topic.category),
                  borderTopWidth: '4px'
                }}
              >
                <div className="h-48 w-full overflow-hidden relative flex items-center justify-center p-4">
                  <div 
                    className="absolute top-3 right-3 text-xs font-medium px-2 py-1 rounded-full text-white"
                    style={{ backgroundColor: getCategoryColor(topic.category) }}
                  >
                    {topic.category}
                  </div>
                  <div className="h-full w-full flex items-center justify-center">
                    <img 
                      src={topic.image} 
                      alt={topic.name} 
                      className="object-contain max-h-full max-w-full p-2"
                      onError={(e) => {
                        e.target.onerror = null; 
                        e.target.src = 'https://via.placeholder.com/300x200?text=Quiz+Cover';
                      }}
                    />
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex-grow">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">{topic.name}</h2>
                    <p className="text-gray-600 text-sm mb-4">
                      {topic.count} {topic.count === 1 ? 'question' : 'questions'}
                    </p>
                  </div>
                  <button
                    onClick={() => handleStartQuiz(topic.name, topic.isCustom)}
                    className="w-full mt-4 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-300 text-center flex items-center justify-center hover:shadow-md"
                    style={{ 
                      backgroundColor: themeColors.primary,
                      '&:hover': { backgroundColor: '#0059C7' }
                    }}
                  >
                    Start Quiz
                    <svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats Section */}
        {sortedTopics.length > 0 && (
          <div className="mt-12 bg-white rounded-xl shadow-sm p-6 max-w-4xl mx-auto border" style={{ borderColor: themeColors.accent2 }}>
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Quiz Collection Stats</h3>
              <div className="flex flex-wrap justify-center gap-6">
                <div className="px-4 py-3 rounded-lg border" style={{ borderColor: themeColors.primary }}>
                  <p className="text-sm font-medium text-gray-500">Total Topics</p>
                  <p className="text-2xl font-bold" style={{ color: themeColors.primary }}>{allTopics.length}</p>
                </div>
                <div className="px-4 py-3 rounded-lg border" style={{ borderColor: themeColors.accent2 }}>
                  <p className="text-sm font-medium text-gray-500">Predefined Questions</p>
                  <p className="text-2xl font-bold" style={{ color: themeColors.accent2 }}>
                    {predefinedTopics.reduce((sum, topic) => sum + topic.count, 0)}
                  </p>
                </div>
                <div className="px-4 py-3 rounded-lg border" style={{ borderColor: themeColors.secondary }}>
                  <p className="text-sm font-medium text-gray-500">Custom Quizzes</p>
                  <p className="text-2xl font-bold" style={{ color: themeColors.secondary }}>
                    {customQuizzes.length}
                  </p>
                </div>
                <div className="px-4 py-3 rounded-lg border" style={{ borderColor: themeColors.accent1 }}>
                  <p className="text-sm font-medium text-gray-500">Showing</p>
                  <p className="text-2xl font-bold" style={{ color: themeColors.accent1 }}>
                    {sortedTopics.length} {sortedTopics.length === 1 ? 'topic' : 'topics'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quizes;