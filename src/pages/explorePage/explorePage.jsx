import React,{ useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/navbar/navbar';
import Coder from '../../assets/coder-img.png';
import axios from 'axios';

const HomePage = () => {
    const [code, setCode] = useState('');
    const [upcomingContests, setUpcomingContests] = useState([]);
  const [runningContests, setRunningContests] = useState([]);
  const [pastContests, setPastContests] = useState([]);
  
  useEffect(() => {
    const fetchUpcomingContests = async () => {
      try {
        const response = await axios.get('https://code-elevate.onrender.com/api/contests');
        setUpcomingContests(response.data.upcoming);
      } catch (error) {
        console.error('Error fetching upcoming contests:', error);
      }
    };

    fetchUpcomingContests();
  }, []);

  useEffect(() => {
    const fetchRunningContests = async () => {
      try {
        const response = await axios.get('https://code-elevate.onrender.com/api/contests');
        setRunningContests(response.data.running);
      } catch (error) {
        console.error('Error fetching upcoming contests:', error);
      }
    };

    fetchRunningContests();
  }, []);
  useEffect(() => {
    const fetchPastContests = async () => {
      try {
        const response = await axios.get('https://code-elevate.onrender.com/api/contests');
        setPastContests(response.data.past);
      } catch (error) {
        console.error('Error fetching upcoming contests:', error);
      }
    };

    fetchPastContests();
  }, []);
  
    const handleCodeChange = (event) => {
      setCode(event.target.value);
    };
  
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="bg-white p-8 rounded shadow-md w-full mx-auto">
        <div className="flex">
          <div className="w-1/2 ">
            <h1 className="text-5xl font-semibold mb-4">Welcome</h1>
            <h2 className=" text-3xl text-gray-600">
              Enhance your skills with us and bag those technical interviews.
            </h2>
          </div>
          <div className="w-1/2">
            <img
              src={Coder}
              alt="Coder"
              className="w-full hover:scale-110 transition-transform duration-300 ease-in-out"
            />
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-center">Contests</h2>
          <h3 className="text-lg font-semibold mb-2">Upcoming Contests</h3>
          <div className="contest-div rounded shadow-md p-4 h-48 overflow-y-auto">
          
            <table className="w-full">
              <thead>
                <tr>
                  <th>Contest Id</th>
                  <th>Title</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                {upcomingContests.map((contest) => (
                
                  <tr key={contest.id}>
                    <td><Link to={`/contest/${contest.id}`}>{contest.id}</Link></td>
                    <td>{contest.title}</td>
                    <td>{new Date(contest.startTime).toLocaleString()}</td>
                    <td>{new Date(contest.endTime).toLocaleString()}</td>
                    <td>{contest.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            
          </div>
          <h3 className="text-lg font-semibold mb-2">Running Contests</h3>
          <div className="contest-div rounded shadow-md p-4 mt-8 h-48 overflow-y-auto">
          {runningContests.length === 0 ? (
    <p>No running contests available</p>
  ) : (
            <table className="w-full">
            <thead>
                <tr>
                  <th>Contest Id</th>
                  <th>Title</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                {runningContests.map((contest) => (
                  <tr key={contest.id}>
                    <td>{contest.id}</td>
                    <td>{contest.title}</td>
                    <td>{new Date(contest.startTime).toLocaleString()}</td>
                    <td>{new Date(contest.endTime).toLocaleString()}</td>
                    <td>{contest.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            )}
          </div>
          <h3 className="text-lg font-semibold mb-2 ">Past Contests</h3>
          <div className="contest-div rounded shadow-md p-4 mt-8 h-48 overflow-y-auto">
          {pastContests.length === 0 ? (
    <p>No past contests available</p>
  ) : (
            <table className="w-full">
            <thead>
                <tr>
                  <th>Contest Id</th>
                  <th>Title</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                {pastContests.map((contest) => (
                  <tr key={contest.id}>
                    <td>{contest.id}</td>
                    <td>{contest.title}</td>
                    <td>{new Date(contest.startTime).toLocaleString()}</td>
                    <td>{new Date(contest.endTime).toLocaleString()}</td>
                    <td>{contest.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            )}
          </div>
          {/* New feature divs */}
          <h2 className="text-2xl font-semibold mb-4 text-center">Our Features</h2>
          <div className="flex justify-between mt-8">
          
            <div className="feature-div rounded shadow-md p-4 w-1/3 mr-4 h-51 gradient-bg hover:scale-110 transition-transform duration-300 ease-in-out">
            <h2 className="text-2xl font-semibold mb-4 text-white text-center">Collaborative Coding</h2>
            <p className='text-white'>
            Join hands with like-minded individuals, brainstorming
                  solutions, refining algorithms, and conquering challenges
                  together.
            </p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-5">Explore</button>
            </div>
            <div className="feature-div rounded shadow-md p-4 w-1/3 mr-4 h-51 hover:scale-110 transition-transform duration-300 ease-in-out">
            <h2 className="text-2xl font-semibold mb-4 text-center">Contest Hosting</h2>
            <p>
            Embrace the opportunity to showcase your skills,
                    <br />
                    compete with fellow enthusiasts, and elevate your coding
                    prowess.
            </p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-5">Explore</button>
            
            </div>
            <div className="feature-div rounded shadow-md p-4 w-1/3 h-51 gradient-bg hover:scale-110 transition-transform duration-300 ease-in-out ">
            <h2 className="text-2xl font-semibold mb-4 text-white text-center">Language Flexibility</h2>
            <p className='text-white'>
            Dive into a world of coding freedom with our platform's
                    support for a diverse range of programming languages.
            </p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-5">Explore</button>
            </div>
          </div>
          <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Coding Playground</h2>
          <div className="flex justify-between">
            <div className="w-1/2 mr-4">
              <textarea
                value={code}
                onChange={handleCodeChange}
                className="border border-gray-300 rounded-md h-64 w-full p-2"
                placeholder="Write your code here..."
              ></textarea>
            </div>
            <div className="w-1/2">
              <iframe
                className="border border-gray-300 rounded-md h-64 w-full"
                title="Code Output"
                srcDoc={`<html><body>${code}</body></html>`}
              ></iframe>
            </div>
          </div>
        </div>
        </div>
      </div>
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
        `}
      </style>
    </div>
  );
};

export default HomePage;
