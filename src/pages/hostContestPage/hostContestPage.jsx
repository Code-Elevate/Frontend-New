import React, { useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const HostContestPage = () => {
    const navigate = useNavigate();
    const [contests, setContests] = useState([]); // State to store contests
    

    const handleEditContest = (contestId) => {
        // Redirect to addProblems page with the contestId in the URL
        navigate(`/addProblems/${contestId}`);
      };
    
  // Fetch contests from the server on component mount
//   useEffect(() => {
//     fetchContests();
//   }, []);

  // Function to fetch contests from the server
//   const fetchContests = () => {
//     axios.get('https://code-elevate.onrender.com/api/manage/contests',{
//         headers: {
//             'x-auth-token': localStorage.getItem('x-auth-token') 
//           }
//     })
    
//       .then(response => {
//         setContests(response.data); 
//       })
//       .catch(error => {
//         console.error('Error fetching contests:', error);
//       });
//   };

    

    const addOrganizerInput = () => {
        setNewContest({ ...newContest, organizers: [...newContest.organizers, ""] });
      };
    
      // Function to remove an organizer input field
      const removeOrganizerInput = (index) => {
        const updatedOrganizers = [...newContest.organizers];
        updatedOrganizers.splice(index, 1);
        setNewContest({ ...newContest, organizers: updatedOrganizers });
      };
      const handleOrganizersChange = (e, index) => {
        const updatedOrganizers = [...newContest.organizers];
        updatedOrganizers[index] = e.target.value;
        setNewContest({ ...newContest, organizers: updatedOrganizers });
      };
      
  

  // State for new contest inputs
  const [newContest, setNewContest] = useState({
    id:"",
    title: "",
    
    startTime: "",
    endTime: "",
    duration: "",
    description: "",
    maxTeamSize: "",
    // penalty: { isOn: false, value: 0 },
    organizers: []
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

    const newContestWithId = { ...newContest, id: newContest.id };
    
    const newContestList = [...contests, newContestWithId];
  setContests(newContestList);

    // API call to create a new contest
    axios.post('https://code-elevate.onrender.com/api/manage/contests/add', newContest, {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('x-auth-token') // Get token from local storage
      }
    })
    .then(response => {
      console.log('Contest created successfully:', response.data);
      // Optionally, you can handle success message or redirect the user to a different page
    })
    .catch(error => {
      console.error('Error creating contest:', error);
      // Optionally, you can display an error message to the user


    }
    );
    
    
    // Reset the new contest inputs
    setNewContest({
      id:"",
      title: "",
      
      startTime: "",
      endTime: "",
      duration: "",
      description: "",
      maxTeamSize: "",
    //   penalty: { isOn: false, value: 0 },
      organizers: []
    });
    // fetchContests();
  };
  // Function to handle contest deletion
  const handleDeleteContest = (contestId) => {
    // Send delete request to the server
    axios.delete(`https://code-elevate.onrender.com/api/manage/contests/delete/${contestId}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('x-auth-token') 
      }
    })
      .then(response => {
        console.log('Contest deleted successfully:', response.data);
        
        const updatedContests = contests.filter(contest => contest.id !== contestId);
        setContests(updatedContests);
      })
      .catch(error => {
        console.error('Error deleting contest:', error);
      });
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
              <th>Contest Id</th>
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
                <td>{contest.id}</td>
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
            name="id"
            placeholder="Contest Id"
            value={newContest.id}
            onChange={handleInputChange}
            className="mb-4 p-2 rounded-md border border-gray-300"
          />
          <input
            type="text"
            name="title"
            placeholder="Contest Title"
            value={newContest.title}
            onChange={handleInputChange}
            className="mb-4 p-2 rounded-md border border-gray-300"
          />
           <input
            type="text"
            name="description"
            placeholder="Contest Description"
            value={newContest.description}
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
          {/* <label htmlFor="penaltyIsOn">Penalty is On:</label>
        <input
          type="checkbox"
          id="penaltyIsOn"
          name="isOn"
          checked={newContest.penalty.isOn}
          onChange={handlePenaltyChange}
        />
        <label htmlFor="penaltyValue">Penalty Value:</label>
        <input
          type="number"
          id="penaltyValue"
          name="value"
          value={newContest.penalty.value}
          onChange={handlePenaltyChange}
        /> */}
          {newContest.organizers.map((organizer, index) => (
          <div key={index}>
            <input
              type="text"
              value={organizer}
              onChange={(e) => handleOrganizersChange(e, index)}
            />
            <button type="button" onClick={() => removeOrganizerInput(index)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={addOrganizerInput}>Add Organizer</button>
          <input
            type="text"
            name="maxTeamSize"
            placeholder="Team Size"
            value={newContest.maxTeamSize}
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
