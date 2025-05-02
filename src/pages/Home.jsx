// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [quizHistory, setQuizHistory] = useState([]);
  const [stats, setStats] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Load current user from localStorage
    const user = JSON.parse(localStorage.getItem('currentUser'));
    setCurrentUser(user);

    // Load quiz history from localStorage
    const history = JSON.parse(localStorage.getItem('quizHistory')) || [];
    
    // Filter history for current user if logged in
    const userHistory = user ? history.filter(item => item.username === user.username) : [];
    setQuizHistory(userHistory);

    // Calculate stats
    if (userHistory.length > 0) {
      const totalTests = userHistory.length;
      const totalCorrect = userHistory.reduce((sum, item) => sum + item.score, 0);
      const totalQuestions = userHistory.reduce((sum, item) => sum + item.totalQuestions, 0);
      const totalTime = userHistory.reduce((sum, item) => sum + item.timeTaken, 0);
      
      setStats({
        totalTests,
        accuracy: Math.round((totalCorrect / totalQuestions) * 100),
        averageScore: Math.round((totalCorrect / totalQuestions) * 100),
        averageTime: Math.round(totalTime / totalTests)
      });
    }
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Quiz Dashboard</h1>
        
        {currentUser ? (
          <>
            {/* Stats Cards */}
            {stats && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-medium text-gray-500">Total Tests Taken</h3>
                  <p className="text-3xl font-bold text-blue-600">{stats.totalTests}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-medium text-gray-500">Average Accuracy</h3>
                  <p className="text-3xl font-bold text-green-600">{stats.accuracy}%</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-medium text-gray-500">Avg. Time per Test</h3>
                  <p className="text-3xl font-bold text-purple-600">{formatTime(stats.averageTime)}</p>
                </div>
              </div>
            )}

            {/* Quiz History */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">Your Quiz History</h2>
              </div>
              {quizHistory.length > 0 ? (
                <div className="divide-y divide-gray-200">
                  {quizHistory.map((quiz, index) => (
                    <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div className="mb-4 sm:mb-0">
                          <h3 className="text-lg font-medium text-gray-900">{quiz.topic}</h3>
                          <p className="text-sm text-gray-500">Taken on {formatDate(quiz.date)}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-center">
                            <p className="text-sm text-gray-500">Score</p>
                            <p className={`text-lg font-bold ${
                              quiz.percentage >= 70 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {quiz.score}/{quiz.totalQuestions}
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-gray-500">Time</p>
                            <p className="text-lg font-bold text-gray-900">{formatTime(quiz.timeTaken)}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-gray-500">Result</p>
                            <p className={`text-lg font-bold ${
                              quiz.percentage >= 70 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {quiz.percentage >= 70 ? 'Passed' : 'Failed'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center">
                  <p className="text-gray-500">No quiz history available. Take a quiz to see your results here!</p>
                  <button
                    onClick={() => navigate('/dashboard/quizes')}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Take a Quiz
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Welcome to Quiz App</h2>
            <p className="text-gray-600 mb-6">Please login to view your quiz history and statistics.</p>
            <button
              onClick={() => navigate('/login')}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;