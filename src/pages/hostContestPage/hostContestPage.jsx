import React, { useState } from 'react';

const HostContestPage = () => {
  const [contests, setContests] = useState([
    // Sample data for already hosted contests
    {
      id: 1,
      title: "Contest 1",
      startTime: "2024-04-01T00:00:00.000Z",
      endTime: "2024-04-02T00:00:00.000Z",
      duration: "1 day"
    },
    {
      id: 2,
      title: "Contest 2",
      startTime: "2024-04-03T00:00:00.000Z",
      endTime: "2024-04-04T00:00:00.000Z",
      duration: "1 day"
    }
  ]);

  // State for new contest inputs
  const [newContest, setNewContest] = useState({
    title: "",
    startTime: "",
    endTime: "",
    duration: ""
  });

  // Function to handle changes in new contest inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContest({
      ...newContest,
      [name]: value
    });
  };

  // Function to handle contest creation
  const handleCreateContest = () => {
    // Validate inputs (e.g., check if required fields are filled)
    // Add the new contest to the contests array
    const newContestList = [...contests, { ...newContest, id: contests.length + 1 }];
    setContests(newContestList);
    // Reset the new contest inputs
    setNewContest({
      title: "",
      startTime: "",
      endTime: "",
      duration: ""
    });
  };

  // Function to handle contest deletion
  const handleDeleteContest = (id) => {
    // Filter out the contest with the specified id
    const updatedContests = contests.filter(contest => contest.id !== id);
    setContests(updatedContests);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">Host Contests</h1>
      {/* Table of already hosted contests */}
      <div className="shadow-md rounded-md p-4 mb-8">
        <h2 className="text-xl font-semibold mb-4">Hosted Contests</h2>
        <table className="w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Duration</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contests.map(contest => (
              <tr key={contest.id}>
                <td>{contest.title}</td>
                <td>{contest.startTime}</td>
                <td>{contest.endTime}</td>
                <td>{contest.duration}</td>
                <td>
                  <button  onClick={() => handleEditContest(contest.id)} style={{ color: 'green', marginRight: '8px' }}>Edit</button>
                  <button  onClick={() => handleDeleteContest(contest.id)}  style={{ color: 'red' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Create new contest form */}
      <div className="shadow-md rounded-md p-4">
        <h2 className="text-xl font-semibold mb-4">Create New Contest</h2>
        <div className="flex flex-col">
          <input
            type="text"
            name="title"
            placeholder="Contest Title"
            value={newContest.title}
            onChange={handleInputChange}
            className="mb-4 p-2 rounded-md border border-gray-300"
          />
          <input
            type="datetime-local"
            name="startTime"
            value={newContest.startTime}
            onChange={handleInputChange}
            className="mb-4 p-2 rounded-md border border-gray-300"
          />
          <input
            type="datetime-local"
            name="endTime"
            value={newContest.endTime}
            onChange={handleInputChange}
            className="mb-4 p-2 rounded-md border border-gray-300"
          />
          <input
            type="text"
            name="duration"
            placeholder="Duration"
            value={newContest.duration}
            onChange={handleInputChange}
            className="mb-4 p-2 rounded-md border border-gray-300"
          />
          <button onClick={handleCreateContest} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Create Contest</button>
        </div>
      </div>
    </div>
  );
};

export default HostContestPage;
