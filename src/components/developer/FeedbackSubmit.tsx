import React, { useState } from 'react';
import { MessageSquare, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { storageService } from '../../utils/storage';

export function FeedbackSubmit() {
  const [sessionId, setSessionId] = useState('');
  const [developerName, setDeveloperName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const sessions = storageService.getSessions();

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!sessionId || !developerName || !comment.trim()) {
      setError('Please fill in all fields');
      return;
    }

    const session = storageService.getSessionById(sessionId);
    if (!session) {
      setError('Session not found');
      return;
    }

    storageService.addFeedback({
      sessionId,
      developerId: `dev_${Date.now()}`,
      developerName,
      rating,
      comment,
      timestamp: new Date().toISOString(),
    });

    setSubmitted(true);
    setSessionId('');
    setDeveloperName('');
    setRating(5);
    setComment('');
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Submit Feedback</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <MessageSquare size={24} />
            Share Your Feedback
          </h3>

          <form onSubmit={handleSubmitFeedback} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Session
              </label>
              <select
                value={sessionId}
                onChange={e => setSessionId(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a session...</option>
                {sessions.map(session => (
                  <option key={session.id} value={session.id}>
                    {session.name} - {session.date}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Name
              </label>
              <input
                type="text"
                value={developerName}
                onChange={e => setDeveloperName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Rating
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="focus:outline-none transition-transform hover:scale-110"
                  >
                    <span
                      className={`text-4xl ${
                        star <= rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    >
                      ★
                    </span>
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-2">Selected: {rating}/5 stars</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Feedback
              </label>
              <textarea
                value={comment}
                onChange={e => setComment(e.target.value)}
                placeholder="Share your thoughts about the session..."
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
              <p className="text-xs text-gray-500 mt-1">{comment.length} characters</p>
            </div>

            {error && (
              <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {submitted && (
              <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-green-700">Feedback submitted successfully!</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
            >
              <Send size={18} />
              Submit Feedback
            </button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Why Your Feedback Matters</h3>
          <div className="space-y-4 text-gray-700">
            <p>
              Your feedback helps us improve future sessions and understand what works best for the team.
            </p>
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
              <p className="font-medium text-blue-900 mb-2">Rating Guidelines:</p>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>★☆☆☆☆ - Needs improvement</li>
                <li>★★☆☆☆ - Below average</li>
                <li>★★★☆☆ - Average</li>
                <li>★★★★☆ - Good</li>
                <li>★★★★★ - Excellent</li>
              </ul>
            </div>
            <p className="text-sm text-gray-600">
              Be specific in your feedback! Tell us what went well and what could be improved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
