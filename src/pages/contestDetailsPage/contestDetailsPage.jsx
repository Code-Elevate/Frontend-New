import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ContestDetailsPage = () => {
  const { contestId } = useParams(); // Extracting the contestId from the URL params
  const [contestDetails, setContestDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContestDetails = async () => {
      try {
        const response = await axios.get(
          `https://code-elevate.onrender.com/api/contests/${contestId}`
        ); // Use the contestId from the URL to fetch specific contest details
        setContestDetails(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchContestDetails();
  }, [contestId]); // Re-run effect whenever contestId changes

  // Check if contest is past
  const isPastContest = new Date() > new Date(contestDetails.endTime);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      {contestDetails && (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded shadow-md">
          <h2 className="text-2xl font-bold mb-4 gradient-text"> Contest: {contestDetails.title}</h2>
          <p className="mb-4">Description: {contestDetails.description}</p>
          <p>Status: {contestDetails.status}</p>
          <p>Start Time: {contestDetails.startTime}</p>
          <p>End Time: {contestDetails.endTime}</p>
          <p>Max Team Size: {contestDetails.maxTeamSize}</p>
          <p>Duration: {contestDetails.duration}</p>
          <p>Organizers: {contestDetails.organizers.join(", ")}</p>
          <p>
            Penalty: {contestDetails.penalty.isOn ? "Enabled" : "Disabled"} (
            {contestDetails.penalty.value} points)
          </p>
          <div className="register-button mt-4">
            <Link to={`/contestRegistration/${contestDetails.id}`}>
              <button 
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${isPastContest ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isPastContest}
              >
                {isPastContest ? 'Contest Ended' : 'Register'}
              </button>
            </Link>
          </div>
          <h3 className="mt-4">Problems:</h3>
            <ul>
            {contestDetails.problems && contestDetails.problems.map((problem) => (
            <li key={problem.id} className="mb-2">
            {problem.title} - Difficulty: {problem.difficulty}
            </li>
            ))}
            </ul>
        </div>
      )}
      <style>
        {`
          /* Gradient background styles */
          .gradient-bg {
            background-color: #667eea; /* Fallback color */
            background-image: linear-gradient(to bottom, #667eea, #764ba2); /* Vertical gradient */
          }
          .hover\:scale-110:hover {
            transform: scale(1.1);
          }
          .contest-div {
            margin-bottom: 20px;
          }
          .feature-div {
            margin-top: 20px;
          }
          .gradient-text {
            background-image: linear-gradient(to right, #5a67d8, #886aea);
            background-clip: text;
            -webkit-background-clip: text;
            color: transparent;
          }
        `}
      </style>
    </div>
  );
};

export default ContestDetailsPage;
