import React from 'react';

const ProfilePage = () => {
  const userProfile = {
    name: "John Doe",
    username: "johndoe123",
    gender: "Male",
    profilePhoto: "https://via.placeholder.com/150"
  };

  const pastContests = [
    { contestName: "Contest 1", rank: 1, contestScore: 95 },
    { contestName: "Contest 2", rank: 3, contestScore: 85 },
    { contestName: "Contest 3", rank: 2, contestScore: 90 },
    { contestName: "Contest 1", rank: 1, contestScore: 95 },
    { contestName: "Contest 1", rank: 1, contestScore: 95 },
    { contestName: "Contest 1", rank: 1, contestScore: 95 },
    { contestName: "Contest 1", rank: 1, contestScore: 95 },
  ];

  return (
    <div>
      <style>
        {`
          /* Gradient background styles */
          .gradient-bg {
            background-color: #667EEA; /* Fallback color */
            background-image: linear-gradient(to bottom, #667EEA, #764BA2); /* Vertical gradient */
            width: 100%; /* Set width */
          }
        `}
      </style>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 gradient-bg">
        <div className="bg-white p-8 rounded shadow-md w-full sm:w-3/4 flex">
          <div className="w-1/2 pr-4">
            <div className="flex items-center mb-4">
              <img src={userProfile.profilePhoto} alt="Profile" className="w-16 h-16 rounded-full mr-4" />
              <div>
                <h2 className="text-lg font-bold">{userProfile.name}</h2>
                <p className="text-gray-600">@{userProfile.username}</p>
                <p className="text-gray-600">{userProfile.gender}</p>
              </div>
            </div>
          </div>
          <div className="w-1/2 pl-4 border-l border-gray-300">
            <h3 className="text-lg font-semibold mb-2">Contest Details:</h3>
            <div className="h-64 overflow-y-auto">
              <h3 className="text-lg font-semibold mb-2">Past Contests:</h3>
              <ul>
                {pastContests.map((contest, index) => (
                  <li key={index} className="mb-2">
                    <div className="flex justify-between">
                      <span >{contest.contestName}</span>
                      <span className="mr-6">Rank: {contest.rank}</span>
                    </div>
                    <p className="text-gray-600">Score: {contest.contestScore}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
