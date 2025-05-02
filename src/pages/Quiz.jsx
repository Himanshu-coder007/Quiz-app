// src/pages/Quiz.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import data from '../data/data.json';

const Quiz = () => {
  const { id: topicName } = useParams();
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set());
  const [startTime, setStartTime] = useState(null);
  const [timeTaken, setTimeTaken] = useState(0);

  // Get the questions for the specific topic
  const questions = data.quizzes[topicName] || [];
  const totalQuestions = questions.length;

  useEffect(() => {
    // Set start time when component mounts
    setStartTime(new Date());
    
    // Load any saved progress from localStorage
    const savedProgress = JSON.parse(localStorage.getItem(`quizProgress_${topicName}`));
    if (savedProgress) {
      setCurrentQuestionIndex(savedProgress.currentQuestionIndex);
      setSelectedOptions(savedProgress.selectedOptions);
      setScore(savedProgress.score);
      setAnsweredQuestions(new Set(savedProgress.answeredQuestions));
    }
  }, [topicName]);

  const saveProgress = () => {
    localStorage.setItem(`quizProgress_${topicName}`, JSON.stringify({
      currentQuestionIndex,
      selectedOptions,
      score,
      answeredQuestions: Array.from(answeredQuestions)
    }));
  };

  const handleOptionSelect = (questionId, option) => {
    const currentQuestion = questions.find(q => q.id === questionId);
    const wasPreviouslyAnswered = answeredQuestions.has(questionId);
    const previousSelection = selectedOptions[questionId];
    
    // Update selected option
    const newSelectedOptions = {
      ...selectedOptions,
      [questionId]: option
    };
    setSelectedOptions(newSelectedOptions);
    
    // If this question was previously answered
    if (wasPreviouslyAnswered) {
      // If the previous selection was correct and the new one isn't, decrease score
      if (previousSelection === currentQuestion.answer && option !== currentQuestion.answer) {
        setScore(prev => prev - 1);
      } 
      // If the previous selection was incorrect and the new one is correct, increase score
      else if (previousSelection !== currentQuestion.answer && option === currentQuestion.answer) {
        setScore(prev => prev + 1);
      }
    } 
    // If this question wasn't previously answered and the new selection is correct
    else if (option === currentQuestion.answer) {
      setScore(prev => prev + 1);
    }
    
    // Mark question as answered (or update if already answered)
    setAnsweredQuestions(prev => new Set(prev).add(questionId));
    saveProgress();
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      saveProgress();
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      saveProgress();
    }
  };

  const handleSubmit = () => {
    const endTime = new Date();
    const timeDiff = (endTime - startTime) / 1000; // in seconds
    setTimeTaken(timeDiff);
    setShowResult(true);
    setQuizCompleted(true);
    
    // Save quiz results to history
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      const quizHistory = JSON.parse(localStorage.getItem('quizHistory')) || [];
      const newQuizResult = {
        username: currentUser.username,
        topic: topicName,
        score: score,
        totalQuestions: totalQuestions,
        percentage: Math.round((score / totalQuestions) * 100),
        timeTaken: timeDiff,
        date: new Date().toISOString()
      };
      
      localStorage.setItem('quizHistory', JSON.stringify([...quizHistory, newQuizResult]));
    }
    
    // Clear saved progress
    localStorage.removeItem(`quizProgress_${topicName}`);
  };

  if (questions.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md w-full">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">No Questions Found</h1>
          <p className="text-gray-600 mb-6">There are no questions available for the topic "{topicName}".</p>
          <button
            onClick={() => navigate('/dashboard/quizes')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Quizzes
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
  const percentage = (score / totalQuestions) * 100;
  const passed = percentage >= 70;
  const isAnswered = answeredQuestions.has(currentQuestion.id);
  const selectedOption = selectedOptions[currentQuestion.id];

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header with topic */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
          <div>
            <h1 className="text-2xl font-bold">{topicName} Quiz</h1>
            <p className="text-blue-100">Test your knowledge on {topicName}</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="px-6 pt-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </span>
            {showResult && (
              <span className="text-sm font-medium text-gray-600">
                Score: {score} / {totalQuestions}
              </span>
            )}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
            <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
              style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question area */}
        <div className="px-6 pb-6">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">{currentQuestion.question}</h2>
          <div className="space-y-3 mb-8">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedOption === option;
              let optionClasses = "p-4 border rounded-lg cursor-pointer transition-all";
              
              optionClasses += isSelected 
                ? " border-blue-500 bg-blue-50" 
                : " border-gray-300 hover:bg-gray-50";

              return (
                <div 
                  key={index}
                  className={optionClasses}
                  onClick={() => handleOptionSelect(currentQuestion.id, option)}
                >
                  <div className="flex items-center">
                    <span className="mr-3 font-medium text-gray-700">{String.fromCharCode(65 + index)}.</span>
                    <span>{option}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-between">
            <button
              onClick={handlePrevQuestion}
              disabled={currentQuestionIndex === 0}
              className={`px-5 py-2.5 rounded-lg font-medium ${
                currentQuestionIndex === 0 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              ← Previous
            </button>
            
            {isLastQuestion ? (
              <button
                onClick={handleSubmit}
                disabled={answeredQuestions.size < totalQuestions}
                className={`px-5 py-2.5 rounded-lg font-medium text-white ${
                  answeredQuestions.size < totalQuestions
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                Submit Quiz
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                disabled={!isAnswered}
                className={`px-5 py-2.5 rounded-lg font-medium text-white ${
                  !isAnswered
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                Next Question →
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Result Modal */}
      {showResult && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full shadow-xl">
            <div className="text-center">
              <div className={`mx-auto flex items-center justify-center h-16 w-16 rounded-full ${passed ? 'bg-green-100' : 'bg-red-100'} mb-4`}>
                {passed ? (
                  <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {passed ? 'Congratulations! 🎉' : 'Try Again! 😔'}
              </h2>
              <p className="text-lg text-gray-600 mb-1">
                You scored <span className="font-bold">{score}</span> out of <span className="font-bold">{totalQuestions}</span>
              </p>
              <p className="text-lg text-gray-600 mb-1">
                Time taken: <span className="font-bold">{formatTime(timeTaken)}</span>
              </p>
              <p className={`text-xl font-bold mb-6 ${passed ? 'text-green-600' : 'text-red-600'}`}>
                {Math.round(percentage)}% {passed ? 'Passed' : 'Failed'}
              </p>
              
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
                <div 
                  className={`h-2.5 rounded-full ${passed ? 'bg-green-600' : 'bg-red-600'}`} 
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => {
                    setCurrentQuestionIndex(0);
                    setSelectedOptions({});
                    setScore(0);
                    setShowResult(false);
                    setQuizCompleted(false);
                    setAnsweredQuestions(new Set());
                    setStartTime(new Date());
                  }}
                  className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                >
                  Retry Quiz
                </button>
                <button
                  onClick={() => navigate('/dashboard/quizes')}
                  className="px-5 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
                >
                  Back to Quizzes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;