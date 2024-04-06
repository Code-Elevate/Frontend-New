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
          <h2 className="text-2xl font-bold mb-4">{contestDetails.title}</h2>
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
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Register
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
    </div>
  );
};

export default ContestDetailsPage;
