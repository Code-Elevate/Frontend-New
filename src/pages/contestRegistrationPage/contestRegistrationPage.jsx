import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ContestRegistrationPage = () => {
  const { contestId } = useParams();
  const [teamName, setTeamName] = useState('');
  const [teamMember, setTeamMember] = useState('');
  const [participants, setParticipants] = useState([]);
  const [maxSize, setMaxSize] = useState(0);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  
  useEffect(() => {
    const fetchContestDetails = async () => {
      try {
        const response = await fetch(`https://code-elevate.onrender.com/api/contests/${contestId}`);
        const data = await response.json();
        console.log('Contest ID:', contestId);
        setMaxSize(data.maxTeamSize);
      } catch (error) {
        console.error('Error fetching contest details:', error);
      }
    };

    fetchContestDetails();
  }, [contestId]);

  const addTeamMember = () => {
    if (participants.length >= maxSize - 1) {
      alert('Team is full, cannot add more members');
      return;
    }

    if (teamMember.trim() !== '') {
      setParticipants([...participants, teamMember]);
      setTeamMember('');
    }
  };

  const deleteTeamMember = (index) => {
    const updatedParticipants = [...participants];
    updatedParticipants.splice(index, 1);
    setParticipants(updatedParticipants);
  };

  const editTeamMember = (index, newUsername) => {
    const updatedParticipants = [...participants];
    updatedParticipants[index] = newUsername;
    setParticipants(updatedParticipants);
  };


  const handleEnterContest = async () => {
    try {
      const token = localStorage.getItem('x-auth-token');
      const data = JSON.stringify({
        name: teamName,
        members: participants
      });

      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `https://code-elevate.onrender.com/api/contests/${contestId}/register`,
        headers: {
          'x-auth-token': localStorage.getItem('x-auth-token'),
          'Content-Type': 'application/json'
        },
        data: data
      };

      const response = await axios(config);
      console.log('Registration successful:', response.data);
      setRegistrationSuccess(true);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Contest Registration</h2>
        {registrationSuccess ? (
          <>
            <p className="text-green-600 text-center mb-4">Team registered successfully!</p>
            <Link to={`/problems/${contestId}`}>
              <button className="block mx-auto px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                View Problems
              </button>
            </Link>
          </>
        ) : (
          <>
            <div className="mb-4">
              <label htmlFor="teamName" className="block text-sm font-medium text-gray-700"></label>
              <input
                id="teamName"
                type="text"
                placeholder='Team Name'
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="teamMember" className="block text-sm font-medium text-gray-700"></label>
              <div className="flex items-center">
                <input
                  id="teamMember"
                  type="email"
                  placeholder='Email'
                  className="flex-1 mr-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  value={teamMember}
                  onChange={(e) => setTeamMember(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  onClick={addTeamMember}
                >
                  Add
                </button>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Participants</h3>
              <ul>
                {participants.map((participant, index) => (
                  <li key={index} className="flex justify-between items-center mb-2">
                    <span>{participant}</span>
                    <div>
                      <button
                        type="button"
                        className="text-indigo-600 hover:text-indigo-800 mr-2"
                        onClick={() => editTeamMember(index, prompt('Enter new username'))}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="text-red-600 hover:text-red-800"
                        onClick={() => deleteTeamMember(index)}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <button
                onClick={handleEnterContest}
                type='button'
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Enter Contest
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ContestRegistrationPage;