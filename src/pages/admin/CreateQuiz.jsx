import React, { useState } from 'react';
import { FiPlus, FiTrash2, FiSave, FiImage, FiChevronDown } from 'react-icons/fi';

const CreateQuiz = () => {
  const [quizTopic, setQuizTopic] = useState('');
  const [quizCoverPhoto, setQuizCoverPhoto] = useState('');
  const [quizCategory, setQuizCategory] = useState('Others');
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: '',
      options: ['', '', '', ''],
      answer: ''
    }
  ]);

  const categories = ['Programming', 'Computer Science', 'Security', 'Others'];

  const handleAddQuestion = () => {
    const newId = questions.length > 0 ? Math.max(...questions.map(q => q.id)) + 1 : 1;
    setQuestions([
      ...questions,
      {
        id: newId,
        question: '',
        options: ['', '', '', ''],
        answer: ''
      }
    ]);
  };

  const handleRemoveQuestion = (id) => {
    if (questions.length > 1) {
      setQuestions(questions.filter(question => question.id !== id));
    }
  };

  const handleQuestionChange = (id, value) => {
    setQuestions(questions.map(question => 
      question.id === id ? { ...question, question: value } : question
    ));
  };

  const handleOptionChange = (questionId, optionIndex, value) => {
    setQuestions(questions.map(question => {
      if (question.id === questionId) {
        const newOptions = [...question.options];
        newOptions[optionIndex] = value;
        return { ...question, options: newOptions };
      }
      return question;
    }));
  };

  const handleAnswerChange = (questionId, answer) => {
    setQuestions(questions.map(question => 
      question.id === questionId ? { ...question, answer } : question
    ));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!quizTopic.trim()) {
      alert('Please enter a quiz topic');
      return;
    }

    for (const question of questions) {
      if (!question.question.trim()) {
        alert('Please enter all questions');
        return;
      }
      
      for (const option of question.options) {
        if (!option.trim()) {
          alert('Please fill in all options');
          return;
        }
      }
      
      if (!question.answer.trim()) {
        alert('Please select an answer for each question');
        return;
      }
    }

    // Get existing quizzes from localStorage
    const existingQuizzes = JSON.parse(localStorage.getItem('quizzes')) || {};
    
    // Create new quiz object with cover photo and category
    const newQuiz = {
      [quizTopic]: {
        coverPhoto: quizCoverPhoto,
        category: quizCategory,
        questions: questions.map(q => ({
          id: q.id,
          question: q.question,
          options: q.options,
          answer: q.answer
        }))
      }
    };

    // Merge with existing quizzes
    const updatedQuizzes = { ...existingQuizzes, ...newQuiz };
    
    // Save to localStorage
    localStorage.setItem('quizzes', JSON.stringify(updatedQuizzes));
    
    alert('Quiz saved successfully!');
    setQuizTopic('');
    setQuizCoverPhoto('');
    setQuizCategory('Others');
    setQuestions([{
      id: 1,
      question: '',
      options: ['', '', '', ''],
      answer: ''
    }]);
  };

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-green-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Create New Quiz</h1>
        <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-green-500 mb-6 rounded-full"></div>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="mb-6">
            <label htmlFor="quizTopic" className="block text-sm font-semibold text-gray-700 mb-2">
              Quiz Topic <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="quizTopic"
              value={quizTopic}
              onChange={(e) => setQuizTopic(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., React Fundamentals, JavaScript Basics, etc."
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="quizCategory" className="block text-sm font-semibold text-gray-700 mb-2">
                Quiz Category <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  id="quizCategory"
                  value={quizCategory}
                  onChange={(e) => setQuizCategory(e.target.value)}
                  className="appearance-none w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <FiChevronDown className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="quizCoverPhoto" className="block text-sm font-semibold text-gray-700 mb-2">
                Quiz Cover Photo URL
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                  <FiImage className="h-5 w-5" />
                </span>
                <input
                  type="url"
                  id="quizCoverPhoto"
                  value={quizCoverPhoto}
                  onChange={(e) => setQuizCoverPhoto(e.target.value)}
                  className="flex-1 block w-full rounded-r-lg px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://example.com/cover-photo.jpg"
                />
              </div>
            </div>
          </div>

          {quizCoverPhoto && (
            <div className="mb-6">
              <p className="text-sm font-semibold text-gray-700 mb-2">Cover Photo Preview:</p>
              <img 
                src={quizCoverPhoto} 
                alt="Quiz cover preview" 
                className="max-h-60 rounded-lg border-2 border-gray-200 object-cover w-full"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          )}

          <div className="space-y-6 mb-8">
            {questions.map((question, qIndex) => (
              <div key={question.id} className="border-2 border-gray-100 rounded-xl p-5 relative bg-gray-50">
                {questions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveQuestion(question.id)}
                    className="absolute top-4 right-4 text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors"
                    aria-label="Remove question"
                  >
                    <FiTrash2 className="h-5 w-5" />
                  </button>
                )}

                <div className="mb-5">
                  <label htmlFor={`question-${question.id}`} className="block text-sm font-semibold text-gray-700 mb-2">
                    Question {qIndex + 1} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id={`question-${question.id}`}
                    value={question.question}
                    onChange={(e) => handleQuestionChange(question.id, e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter the question"
                    required
                  />
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Options <span className="text-red-500">*</span>
                  </label>
                  {question.options.map((option, oIndex) => (
                    <div key={oIndex} className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name={`answer-${question.id}`}
                        checked={option === question.answer}
                        onChange={() => handleAnswerChange(question.id, option)}
                        className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                        required
                      />
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(question.id, oIndex, e.target.value)}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder={`Option ${oIndex + 1}`}
                        required
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <button
              type="button"
              onClick={handleAddQuestion}
              className="flex items-center justify-center px-6 py-3 border border-transparent text-sm font-semibold rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <FiPlus className="mr-2 h-4 w-4" />
              Add Question
            </button>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="reset"
                className="px-6 py-3 border border-gray-300 text-sm font-semibold rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Reset Form
              </button>
              <button
                type="submit"
                className="flex items-center justify-center px-6 py-3 border border-transparent text-sm font-semibold rounded-lg shadow-sm text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
              >
                <FiSave className="mr-2 h-4 w-4" />
                Save Quiz
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateQuiz;