import React, { useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement
);

const Home = () => {
  // User stats
  const [userStats] = useState({
    username: "Himanshu",
    streak: 12,
    level: "Intermediate",
    points: 1450,
    rank: "Top 15%",
    joinDate: "Jan 2022",
  });

  // Quiz statistics
  const [quizStats] = useState({
    totalAttempts: 42,
    easy: { correct: 18, total: 20 },
    medium: { correct: 15, total: 18 },
    hard: { correct: 9, total: 14 },
    accuracy: 76,
    improvement: 12, // percentage improvement from last month
  });

  // Performance by category
  const [categoryPerformance] = useState([
    { name: "Algorithms", correct: 32, total: 40 },
    { name: "Data Structures", correct: 28, total: 35 },
    { name: "System Design", correct: 15, total: 25 },
    { name: "Problem Solving", correct: 22, total: 30 },
  ]);

  // Upcoming quizzes
  const [upcomingQuizzes] = useState([
    { id: 1, title: "Weekly Challenge", date: "May 5, 2023", difficulty: "Medium", reward: "50 points" },
    { id: 2, title: "Data Structures Special", date: "May 12, 2023", difficulty: "Hard", reward: "75 points" },
    { id: 3, title: "Beginner's Practice", date: "May 19, 2023", difficulty: "Easy", reward: "30 points" },
  ]);

  // Progress data for charts
  const [progressData] = useState({
    monthly: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      attempts: [3, 5, 4, 6, 8, 7, 5, 6, 7, 8, 6, 9],
      accuracy: [65, 68, 72, 70, 75, 78, 76, 77, 80, 82, 79, 81],
    },
    weekly: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      attempts: [8, 10, 9, 12],
      accuracy: [72, 75, 78, 81],
    },
  });

  // Chart options and data
  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  const barChartData = {
    labels: categoryPerformance.map(item => item.name),
    datasets: [
      {
        label: 'Correct Answers',
        data: categoryPerformance.map(item => (item.correct / item.total) * 100),
        backgroundColor: 'rgba(79, 70, 229, 0.7)',
      },
      {
        label: 'Average (All Users)',
        data: categoryPerformance.map(() => 65),
        backgroundColor: 'rgba(209, 213, 219, 0.7)',
      },
    ],
  };

  const lineChartData = {
    labels: progressData.weekly.labels,
    datasets: [
      {
        label: 'Accuracy (%)',
        data: progressData.weekly.accuracy,
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
        tension: 0.3,
      },
      {
        label: 'Attempts',
        data: progressData.weekly.attempts,
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
        yAxisID: 'y1',
        tension: 0.3,
      },
    ],
  };

  const pieChartData = {
    labels: ['Easy', 'Medium', 'Hard'],
    datasets: [
      {
        data: [quizStats.easy.total, quizStats.medium.total, quizStats.hard.total],
        backgroundColor: [
          'rgba(16, 185, 129, 0.7)',
          'rgba(234, 179, 8, 0.7)',
          'rgba(239, 68, 68, 0.7)',
        ],
        borderColor: [
          'rgba(16, 185, 129, 1)',
          'rgba(234, 179, 8, 1)',
          'rgba(239, 68, 68, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, {userStats.username}</h1>
            <p className="text-gray-600 mt-1">Keep up the good work! Here's your progress so far.</p>
          </div>
          <div className="mt-4 md:mt-0 bg-white shadow rounded-lg p-4">
            <div className="flex items-center">
              <div className="bg-indigo-100 p-3 rounded-full mr-3">
                <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Current Level</p>
                <p className="text-lg font-semibold text-gray-900">{userStats.level}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Attempts Card */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Attempts</dt>
                    <dd>
                      <div className="text-2xl font-semibold text-gray-900">{quizStats.totalAttempts}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Accuracy Card */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Accuracy</dt>
                    <dd>
                      <div className="text-2xl font-semibold text-gray-900">{quizStats.accuracy}%</div>
                      <div className={`text-xs mt-1 ${quizStats.improvement >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {quizStats.improvement >= 0 ? '↑' : '↓'} {Math.abs(quizStats.improvement)}% from last month
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Streak Card */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-orange-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Current Streak</dt>
                    <dd>
                      <div className="text-2xl font-semibold text-gray-900">{userStats.streak} days</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Points Card */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Points</dt>
                    <dd>
                      <div className="text-2xl font-semibold text-gray-900">{userStats.points}</div>
                      <div className="text-xs mt-1 text-gray-500">{userStats.rank}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Performance by Category */}
          <div className="bg-white shadow rounded-lg p-6 lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Performance by Category</h2>
            <div className="h-64">
              <Bar data={barChartData} options={barChartOptions} />
            </div>
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
              {categoryPerformance.map((category, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-gray-700">{category.name}</p>
                  <p className="text-lg font-semibold">
                    {Math.round((category.correct / category.total) * 100)}%
                    <span className="text-xs text-gray-500 ml-1">({category.correct}/{category.total})</span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Quiz Distribution */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quiz Distribution</h2>
            <div className="h-64">
              <Pie data={pieChartData} />
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm">Easy</span>
                </div>
                <span className="text-sm font-medium">
                  {Math.round((quizStats.easy.total / quizStats.totalAttempts) * 100)}% ({quizStats.easy.total})
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <span className="text-sm">Medium</span>
                </div>
                <span className="text-sm font-medium">
                  {Math.round((quizStats.medium.total / quizStats.totalAttempts) * 100)}% ({quizStats.medium.total})
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <span className="text-sm">Hard</span>
                </div>
                <span className="text-sm font-medium">
                  {Math.round((quizStats.hard.total / quizStats.totalAttempts) * 100)}% ({quizStats.hard.total})
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Progress and Upcoming Quizzes */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Weekly Progress */}
          <div className="bg-white shadow rounded-lg p-6 lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Weekly Progress</h2>
            <div className="h-64">
              <Line data={lineChartData} options={lineChartOptions} />
            </div>
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm font-medium text-gray-700">This Week</p>
                <p className="text-lg font-semibold">
                  {progressData.weekly.attempts[progressData.weekly.attempts.length - 1]} attempts
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm font-medium text-gray-700">Accuracy</p>
                <p className="text-lg font-semibold">
                  {progressData.weekly.accuracy[progressData.weekly.accuracy.length - 1]}%
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm font-medium text-gray-700">Best Week</p>
                <p className="text-lg font-semibold">
                  {Math.max(...progressData.weekly.attempts)} attempts
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm font-medium text-gray-700">Avg. Weekly</p>
                <p className="text-lg font-semibold">
                  {Math.round(progressData.weekly.attempts.reduce((a, b) => a + b, 0) / progressData.weekly.attempts.length)} attempts
                </p>
              </div>
            </div>
          </div>

          {/* Upcoming Quizzes */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Quizzes</h2>
            <div className="space-y-4">
              {upcomingQuizzes.map((quiz) => (
                <div key={quiz.id} className="border-l-4 border-indigo-500 pl-4 py-2">
                  <h3 className="font-medium text-gray-900">{quiz.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      quiz.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                      quiz.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {quiz.difficulty}
                    </span>
                    <span className="ml-2">{quiz.date}</span>
                  </p>
                  <p className="text-sm text-gray-500 mt-1">Reward: {quiz.reward}</p>
                  <button className="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Set Reminder
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <button className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                View All Quizzes
              </button>
            </div>
          </div>
        </div>

        {/* Recent Activity and Study Plan */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="bg-white shadow rounded-lg p-6 lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {[
                { id: 1, type: 'quiz', difficulty: 'hard', name: 'Advanced Algorithms', date: '2023-05-15', result: '8/10', time: '12 min' },
                { id: 2, type: 'quiz', difficulty: 'medium', name: 'Data Structures', date: '2023-05-14', result: '7/10', time: '9 min' },
                { id: 3, type: 'quiz', difficulty: 'easy', name: 'Basic Concepts', date: '2023-05-12', result: '10/10', time: '5 min' },
                { id: 4, type: 'practice', difficulty: 'medium', name: 'Binary Trees', date: '2023-05-10', result: '6/8', time: '15 min' },
                { id: 5, type: 'quiz', difficulty: 'hard', name: 'Dynamic Programming', date: '2023-05-08', result: '6/10', time: '18 min' },
              ].map((activity) => (
                <div key={activity.id} className="flex items-start pb-4 border-b border-gray-200 last:border-0 last:pb-0">
                  <div className={`flex-shrink-0 rounded-md p-2 ${
                    activity.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                    activity.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {activity.type === 'quiz' ? (
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    )}
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.type === 'quiz' ? 'Completed quiz' : 'Practice session'}: {activity.name}
                      </p>
                      <span className={`text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-full ${
                        activity.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                        activity.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {activity.difficulty}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Score: {activity.result} • Time: {activity.time} • {activity.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                View all activity →
              </button>
            </div>
          </div>

          {/* Study Plan */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Study Plan</h2>
            <div className="bg-indigo-50 rounded-lg p-4 mb-4">
              <h3 className="font-medium text-indigo-800">Current Focus Area</h3>
              <p className="text-indigo-700 mt-1">Dynamic Programming Patterns</p>
              <div className="mt-2 w-full bg-indigo-200 rounded-full h-2.5">
                <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '45%' }}></div>
              </div>
              <p className="text-xs text-indigo-600 mt-1">45% completed</p>
            </div>
            <div className="space-y-3">
              {[
                { id: 1, topic: '0/1 Knapsack', progress: 30, due: '3 days' },
                { id: 2, topic: 'Unbounded Knapsack', progress: 15, due: '5 days' },
                { id: 3, topic: 'Fibonacci Sequence', progress: 80, due: 'Completed' },
                { id: 4, topic: 'Palindromic Subsequence', progress: 10, due: '1 week' },
              ].map((item) => (
                <div key={item.id} className="border-b border-gray-200 pb-3 last:border-0 last:pb-0">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">{item.topic}</span>
                    <span className="text-xs text-gray-500">{item.due}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                    <div 
                      className={`h-1.5 rounded-full ${
                        item.progress < 30 ? 'bg-red-500' :
                        item.progress < 70 ? 'bg-yellow-500' :
                        'bg-green-500'
                      }`} 
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-4 w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Update Study Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;