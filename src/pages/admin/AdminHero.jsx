import React, { useState, useEffect } from 'react';
import { FiUsers, FiBook, FiClock, FiAward, FiMail, FiUser, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const AdminHero = () => {
  const [users, setUsers] = useState([]);
  const [quizHistory, setQuizHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);

  useEffect(() => {
    // Load data from localStorage
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const storedHistory = JSON.parse(localStorage.getItem('quizHistory')) || [];
    
    // Sort quiz history by date in descending order (newest first)
    const sortedHistory = [...storedHistory].sort((a, b) => 
      new Date(b.date) - new Date(a.date)
    );
    
    setUsers(storedUsers);
    setQuizHistory(sortedHistory);
    setLoading(false);
  }, []);

  // Format date to dd/mm/yyyy
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Format time to hh:mm:ss AM/PM
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  // Calculate statistics
  const totalUsers = users.length;
  const totalQuizzes = 7; // Assuming 7 quizzes as per requirement
  const totalAttempts = quizHistory.length;
  const averageScore = quizHistory.length > 0 
    ? (quizHistory.reduce((sum, attempt) => sum + attempt.percentage, 0) / quizHistory.length).toFixed(2)
    : 0;

  // Get current 3 quiz attempts to display
  const visibleQuizzes = quizHistory.slice(currentQuizIndex, currentQuizIndex + 3);
  
  // Get current 3 users to display
  const visibleUsers = users.slice(currentUserIndex, currentUserIndex + 3);

  // Navigation handlers for quizzes
  const nextQuizzes = () => {
    if (currentQuizIndex + 3 < quizHistory.length) {
      setCurrentQuizIndex(currentQuizIndex + 1);
    }
  };

  const prevQuizzes = () => {
    if (currentQuizIndex > 0) {
      setCurrentQuizIndex(currentQuizIndex - 1);
    }
  };

  // Navigation handlers for users
  const nextUsers = () => {
    if (currentUserIndex + 3 < users.length) {
      setCurrentUserIndex(currentUserIndex + 1);
    }
  };

  const prevUsers = () => {
    if (currentUserIndex > 0) {
      setCurrentUserIndex(currentUserIndex - 1);
    }
  };

  // Calculate user statistics
  const getUserStats = (user) => {
    const userAttempts = quizHistory.filter(attempt => attempt.username === user.username);
    const quizzesTaken = userAttempts.length;
    const averageScore = quizzesTaken > 0 
      ? (userAttempts.reduce((sum, attempt) => sum + attempt.percentage, 0) / quizzesTaken).toFixed(2)
      : 0;
    return { quizzesTaken, averageScore };
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          icon={<FiUsers className="text-blue-500 text-2xl" />}
          title="Total Users"
          value={totalUsers}
        />
        <StatCard 
          icon={<FiBook className="text-green-500 text-2xl" />}
          title="Total Quizzes"
          value={totalQuizzes}
        />
        <StatCard 
          icon={<FiClock className="text-purple-500 text-2xl" />}
          title="Total Attempts"
          value={totalAttempts}
        />
        <StatCard 
          icon={<FiAward className="text-yellow-500 text-2xl" />}
          title="Average Score"
          value={`${averageScore}%`}
        />
      </div>

      {/* Users Section - Now as a slider */}
      <SectionTitle title="Users" />
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
          <div className="relative">
            {/* Navigation Arrows */}
            {users.length > 3 && (
              <>
                <button 
                  onClick={prevUsers}
                  disabled={currentUserIndex === 0}
                  className={`absolute left-2 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-md ${currentUserIndex === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  <FiChevronLeft className="text-xl" />
                </button>
                <button 
                  onClick={nextUsers}
                  disabled={currentUserIndex + 3 >= users.length}
                  className={`absolute right-2 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-md ${currentUserIndex + 3 >= users.length ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  <FiChevronRight className="text-xl" />
                </button>
              </>
            )}

            {/* Users Slider */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <TableHeader>Username</TableHeader>
                    <TableHeader>Email</TableHeader>
                    <TableHeader>Quizzes Taken</TableHeader>
                    <TableHeader>Average Score</TableHeader>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {visibleUsers.map(user => {
                    const { quizzesTaken, averageScore } = getUserStats(user);
                    return (
                      <tr key={user.email}>
                        <TableCell>
                          <div className="flex items-center">
                            <FiUser className="flex-shrink-0 mr-2 text-gray-400" />
                            {user.username}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <FiMail className="flex-shrink-0 mr-2 text-gray-400" />
                            {user.email}
                          </div>
                        </TableCell>
                        <TableCell>{quizzesTaken}</TableCell>
                        <TableCell>{quizzesTaken > 0 ? `${averageScore}%` : 'N/A'}</TableCell>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination Indicator */}
          {users.length > 3 && (
            <div className="flex justify-center items-center py-4 bg-gray-50">
              <span className="text-sm text-gray-600">
                Showing {currentUserIndex + 1}-{Math.min(currentUserIndex + 3, users.length)} of {users.length} users
              </span>
            </div>
          )}
        </div>
      )}

      {/* Quiz History Section */}
      <SectionTitle title="Recent Quiz Attempts" />
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="relative">
            {/* Navigation Arrows */}
            {quizHistory.length > 3 && (
              <>
                <button 
                  onClick={prevQuizzes}
                  disabled={currentQuizIndex === 0}
                  className={`absolute left-2 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-md ${currentQuizIndex === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  <FiChevronLeft className="text-xl" />
                </button>
                <button 
                  onClick={nextQuizzes}
                  disabled={currentQuizIndex + 3 >= quizHistory.length}
                  className={`absolute right-2 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-md ${currentQuizIndex + 3 >= quizHistory.length ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  <FiChevronRight className="text-xl" />
                </button>
              </>
            )}

            {/* Scrollable Quiz Container */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <TableHeader>Username</TableHeader>
                    <TableHeader>Topic</TableHeader>
                    <TableHeader>Score</TableHeader>
                    <TableHeader>Percentage</TableHeader>
                    <TableHeader>Time Taken</TableHeader>
                    <TableHeader>Date</TableHeader>
                    <TableHeader>Time</TableHeader>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {visibleQuizzes.map((attempt, index) => (
                    <tr key={`${attempt.username}-${attempt.date}-${index}`}>
                      <TableCell>{attempt.username}</TableCell>
                      <TableCell>{attempt.topic}</TableCell>
                      <TableCell>{attempt.score}/{attempt.totalQuestions}</TableCell>
                      <TableCell>{attempt.percentage}%</TableCell>
                      <TableCell>{attempt.timeTaken.toFixed(2)}s</TableCell>
                      <TableCell>{formatDate(attempt.date)}</TableCell>
                      <TableCell>{formatTime(attempt.date)}</TableCell>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination Indicator */}
          {quizHistory.length > 3 && (
            <div className="flex justify-center items-center py-4 bg-gray-50">
              <span className="text-sm text-gray-600">
                Showing {currentQuizIndex + 1}-{Math.min(currentQuizIndex + 3, quizHistory.length)} of {quizHistory.length} attempts
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Reusable components
const StatCard = ({ icon, title, value }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <div className="flex items-center">
      <div className="p-3 rounded-full bg-gray-100 mr-4">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  </div>
);

const SectionTitle = ({ title }) => (
  <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
);

const TableHeader = ({ children }) => (
  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    {children}
  </th>
);

const TableCell = ({ children }) => (
  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
    {children}
  </td>
);

const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-12">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

export default AdminHero;