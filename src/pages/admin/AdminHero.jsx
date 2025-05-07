import React, { useState, useEffect } from 'react';
import { FiUsers, FiBook, FiClock, FiAward, FiMail, FiUser, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const AdminHero = () => {
  const [users, setUsers] = useState([]);
  const [quizHistory, setQuizHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [totalQuizzes, setTotalQuizzes] = useState(7);

  // Theme colors
  const colors = {
    blue: '#006FF4',
    red: '#EA0001',
    yellow: '#FDBE08',
    green: '#8BD30D',
    dark: '#1F2937',
    light: '#F9FAFB'
  };

  useEffect(() => {
    // Load data from localStorage
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const storedHistory = JSON.parse(localStorage.getItem('quizHistory')) || [];
    const quizzesCollection = JSON.parse(localStorage.getItem('quizzes')) || {};
    
    // Count the quizzes in quizzes collection
    const quizzesCount = Object.keys(quizzesCollection).length;
    // Update total quizzes (default 7 + quizzes in collection)
    setTotalQuizzes(7 + quizzesCount);
    
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
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold" style={{ color: colors.dark }}>Admin Dashboard</h1>
        </div>
        
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            icon={<FiUsers className="text-2xl" />}
            title="Total Users"
            value={totalUsers}
            color={colors.blue}
          />
          <StatCard 
            icon={<FiBook className="text-2xl" />}
            title="Total Quizzes"
            value={totalQuizzes}
            color={colors.red}
          />
          <StatCard 
            icon={<FiClock className="text-2xl" />}
            title="Total Attempts"
            value={totalAttempts}
            color={colors.yellow}
          />
          <StatCard 
            icon={<FiAward className="text-2xl" />}
            title="Average Score"
            value={`${averageScore}%`}
            color={colors.green}
          />
        </div>

        {/* Users Section */}
        <SectionTitle title="Users" color={colors.dark} />
        {loading ? (
          <LoadingSpinner color={colors.blue} />
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8 border border-gray-100">
            <div className="relative">
              {/* Navigation Arrows */}
              {users.length > 3 && (
                <>
                  <button 
                    onClick={prevUsers}
                    disabled={currentUserIndex === 0}
                    className={`absolute left-2 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all ${currentUserIndex === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-50'}`}
                    style={{ color: colors.blue }}
                  >
                    <FiChevronLeft className="text-xl" />
                  </button>
                  <button 
                    onClick={nextUsers}
                    disabled={currentUserIndex + 3 >= users.length}
                    className={`absolute right-2 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all ${currentUserIndex + 3 >= users.length ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-50'}`}
                    style={{ color: colors.blue }}
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
                      <TableHeader color={colors.dark}>Username</TableHeader>
                      <TableHeader color={colors.dark}>Email</TableHeader>
                      <TableHeader color={colors.dark}>Quizzes Taken</TableHeader>
                      <TableHeader color={colors.dark}>Average Score</TableHeader>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {visibleUsers.map(user => {
                      const { quizzesTaken, averageScore } = getUserStats(user);
                      return (
                        <tr key={user.email} className="hover:bg-gray-50 transition-colors">
                          <TableCell>
                            <div className="flex items-center">
                              <FiUser className="flex-shrink-0 mr-2" style={{ color: colors.blue }} />
                              <span className="font-medium" style={{ color: colors.dark }}>{user.username}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <FiMail className="flex-shrink-0 mr-2" style={{ color: colors.red }} />
                              <span style={{ color: colors.dark }}>{user.email}</span>
                            </div>
                          </TableCell>
                          <TableCell style={{ color: colors.dark }}>{quizzesTaken}</TableCell>
                          <TableCell>
                            <span style={{ 
                              color: quizzesTaken > 0 ? 
                                (parseFloat(averageScore) >= 70 ? colors.green : 
                                 parseFloat(averageScore) >= 50 ? colors.yellow : colors.red) : 
                                colors.dark
                            }}>
                              {quizzesTaken > 0 ? `${averageScore}%` : 'N/A'}
                            </span>
                          </TableCell>
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
                <span className="text-sm" style={{ color: colors.dark }}>
                  Showing {currentUserIndex + 1}-{Math.min(currentUserIndex + 3, users.length)} of {users.length} users
                </span>
              </div>
            )}
          </div>
        )}

        {/* Quiz History Section */}
        <SectionTitle title="Recent Quiz Attempts" color={colors.dark} />
        {loading ? (
          <LoadingSpinner color={colors.blue} />
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
            <div className="relative">
              {/* Navigation Arrows */}
              {quizHistory.length > 3 && (
                <>
                  <button 
                    onClick={prevQuizzes}
                    disabled={currentQuizIndex === 0}
                    className={`absolute left-2 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all ${currentQuizIndex === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-50'}`}
                    style={{ color: colors.blue }}
                  >
                    <FiChevronLeft className="text-xl" />
                  </button>
                  <button 
                    onClick={nextQuizzes}
                    disabled={currentQuizIndex + 3 >= quizHistory.length}
                    className={`absolute right-2 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all ${currentQuizIndex + 3 >= quizHistory.length ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-50'}`}
                    style={{ color: colors.blue }}
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
                      <TableHeader color={colors.dark}>Username</TableHeader>
                      <TableHeader color={colors.dark}>Topic</TableHeader>
                      <TableHeader color={colors.dark}>Score</TableHeader>
                      <TableHeader color={colors.dark}>Percentage</TableHeader>
                      <TableHeader color={colors.dark}>Time Taken</TableHeader>
                      <TableHeader color={colors.dark}>Date</TableHeader>
                      <TableHeader color={colors.dark}>Time</TableHeader>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {visibleQuizzes.map((attempt, index) => (
                      <tr key={`${attempt.username}-${attempt.date}-${index}`} className="hover:bg-gray-50 transition-colors">
                        <TableCell style={{ color: colors.dark }}>{attempt.username}</TableCell>
                        <TableCell style={{ color: colors.dark }}>{attempt.topic}</TableCell>
                        <TableCell style={{ color: colors.dark }}>{attempt.score}/{attempt.totalQuestions}</TableCell>
                        <TableCell>
                          <span style={{ 
                            color: attempt.percentage >= 70 ? colors.green : 
                                  attempt.percentage >= 50 ? colors.yellow : colors.red
                          }}>
                            {attempt.percentage}%
                          </span>
                        </TableCell>
                        <TableCell style={{ color: colors.dark }}>{attempt.timeTaken.toFixed(2)}s</TableCell>
                        <TableCell style={{ color: colors.dark }}>{formatDate(attempt.date)}</TableCell>
                        <TableCell style={{ color: colors.dark }}>{formatTime(attempt.date)}</TableCell>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination Indicator */}
            {quizHistory.length > 3 && (
              <div className="flex justify-center items-center py-4 bg-gray-50">
                <span className="text-sm" style={{ color: colors.dark }}>
                  Showing {currentQuizIndex + 1}-{Math.min(currentQuizIndex + 3, quizHistory.length)} of {quizHistory.length} attempts
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Reusable components
const StatCard = ({ icon, title, value, color }) => (
  <div 
    className="p-6 rounded-xl shadow-md hover:shadow-lg transition-all cursor-default"
    style={{ 
      backgroundColor: 'white',
      borderLeft: `4px solid ${color}`
    }}
  >
    <div className="flex items-center">
      <div 
        className="p-3 rounded-full mr-4"
        style={{ backgroundColor: `${color}20`, color: color }}
      >
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p 
          className="text-2xl font-semibold"
          style={{ color: color }}
        >
          {value}
        </p>
      </div>
    </div>
  </div>
);

const SectionTitle = ({ title, color }) => (
  <h2 
    className="text-xl font-semibold mb-4 flex items-center"
    style={{ color }}
  >
    <span className="w-1 h-6 mr-2 rounded-full" style={{ backgroundColor: color }}></span>
    {title}
  </h2>
);

const TableHeader = ({ children, color }) => (
  <th 
    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
    style={{ color, backgroundColor: `${color}10` }}
  >
    {children}
  </th>
);

const TableCell = ({ children }) => (
  <td className="px-6 py-4 whitespace-nowrap text-sm">
    {children}
  </td>
);

const LoadingSpinner = ({ color }) => (
  <div className="flex justify-center items-center py-12">
    <div 
      className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2"
      style={{ borderColor: color }}
    ></div>
  </div>
);

export default AdminHero;