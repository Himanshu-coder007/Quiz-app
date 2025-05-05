import React, { useState } from 'react';
import { FiPlus, FiTrash2, FiSave, FiImage } from 'react-icons/fi';

const CreateQuiz = () => {
  const [quizTopic, setQuizTopic] = useState('');
  const [quizCoverPhoto, setQuizCoverPhoto] = useState('');
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: '',
      options: ['', '', '', ''],
      answer: ''
    }
  ]);

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
    
    // Create new quiz object with cover photo
    const newQuiz = {
      [quizTopic]: {
        coverPhoto: quizCoverPhoto,
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
    setQuestions([{
      id: 1,
      question: '',
      options: ['', '', '', ''],
      answer: ''
    }]);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Create New Quiz</h1>
      
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
        <div className="mb-6">
          <label htmlFor="quizTopic" className="block text-sm font-medium text-gray-700 mb-2">
            Quiz Topic
          </label>
          <input
            type="text"
            id="quizTopic"
            value={quizTopic}
            onChange={(e) => setQuizTopic(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., React, JavaScript, etc."
          />
        </div>

        <div className="mb-6">
          <label htmlFor="quizCoverPhoto" className="block text-sm font-medium text-gray-700 mb-2">
            Quiz Cover Photo URL (Optional)
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
              <FiImage className="h-5 w-5" />
            </span>
            <input
              type="url"
              id="quizCoverPhoto"
              value={quizCoverPhoto}
              onChange={(e) => setQuizCoverPhoto(e.target.value)}
              className="flex-1 block w-full rounded-none rounded-r-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://example.com/cover-photo.jpg"
            />
          </div>
          {quizCoverPhoto && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Cover Photo Preview:</p>
              <img 
                src={quizCoverPhoto} 
                alt="Quiz cover preview" 
                className="max-h-60 rounded-md border border-gray-200 object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          )}
        </div>

        <div className="space-y-6">
          {questions.map((question, qIndex) => (
            <div key={question.id} className="border border-gray-200 rounded-lg p-4 relative">
              {questions.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveQuestion(question.id)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                >
                  <FiTrash2 className="h-5 w-5" />
                </button>
              )}

              <div className="mb-4">
                <label htmlFor={`question-${question.id}`} className="block text-sm font-medium text-gray-700 mb-2">
                  Question {qIndex + 1}
                </label>
                <input
                  type="text"
                  id={`question-${question.id}`}
                  value={question.question}
                  onChange={(e) => handleQuestionChange(question.id, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter the question"
                />
              </div>

              <div className="space-y-3 mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Options
                </label>
                {question.options.map((option, oIndex) => (
                  <div key={oIndex} className="flex items-center">
                    <input
                      type="radio"
                      name={`answer-${question.id}`}
                      checked={option === question.answer}
                      onChange={() => handleAnswerChange(question.id, option)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 mr-3"
                    />
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => handleOptionChange(question.id, oIndex, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder={`Option ${oIndex + 1}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-between">
          <button
            type="button"
            onClick={handleAddQuestion}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FiPlus className="mr-2 h-4 w-4" />
            Add Question
          </button>

          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <FiSave className="mr-2 h-4 w-4" />
            Save Quiz
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateQuiz;