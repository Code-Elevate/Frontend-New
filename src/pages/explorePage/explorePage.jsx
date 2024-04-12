import React,{ useState,useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/navbar';
import Coder from '../../assets/coder-img.png';
import axios from 'axios';

const HomePage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('x-auth-token')); 
    const [upcomingContests, setUpcomingContests] = useState([]);
  const [runningContests, setRunningContests] = useState([]);
  const [pastContests, setPastContests] = useState([]);
  const navigate = useNavigate();
  
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
  
    
    const handleExploreButtonClickHostContest = () => {
        if (!isLoggedIn) {
            
            alert('Please log in first to explore.');
            navigate('/');
            
        } else {
           
            console.log('Navigating to host contest page...');
            navigate('/hostContest');
        }
    };
    const handleExploreButtonClickCollabCoding = () => {
        if (!isLoggedIn) {
            
            alert('Please log in first to explore.');
            navigate('/');
            
        } else {
            
            console.log('Navigating to sample problems page...');
            navigate('/problems');
        }
    };
  
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="bg-white p-8 rounded shadow-md w-full mx-auto">
        <div className="flex  items-center justify-center ">
          <div className="w-1/2 text-center ">
            <h1 className="text-5xl font-semibold mb-4 gradient-text">Just Code It!</h1>
            <h2 className=" text-3xl text-gray-600">
              Enhance your skills with us and bag those technical interviews.
            </h2>
          </div>
          <div className="w-1/3">
            <img
              src={Coder}
              alt="Coder"
              className="w-full hover:scale-110 transition-transform duration-300 ease-in-out"
            />
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-4xl font-semibold mb-4 text-center gradient-text">Contests</h2>
          <h3 className="text-lg font-semibold mb-2 text-gray-600">Upcoming Contests</h3>
          <div className="contest-div rounded shadow-md p-4 h-48 overflow-y-auto">
          
          {upcomingContests.length === 0 ? (
              <p>No upcoming contests available</p>
            ) : (
              <table className="w-full">
                <thead className='text-gray-600'>
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
                    <td className='gradient-text hover:text-blue-700 cursor-pointer'><Link to={`/contest/${contest.id}`}>{contest.id}</Link></td>
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
          <h3 className="text-lg font-semibold mb-2 text-gray-600">Running Contests</h3>
          <div className="contest-div rounded shadow-md p-4 mt-8 h-48 overflow-y-auto">
          {runningContests.length === 0 ? (
    <p>No running contests available</p>
  ) : (
            <table className="w-full">
            <thead className='text-gray-600'>
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
                    <td className='gradient-text hover:text-blue-700 cursor-pointer'><Link to={`/contest/${contest.id}`}>{contest.id}</Link></td>
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
          <h3 className="text-lg font-semibold mb-2 text-gray-600">Past Contests</h3>
          <div className="contest-div rounded shadow-md p-4 mt-8 h-48 overflow-y-auto">
          {pastContests.length === 0 ? (
    <p>No past contests available</p>
  ) : (
            <table className="w-full">
            <thead className='text-gray-600'>
                <tr className='text-gray-600'>
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
                    <td className='gradient-text'><Link to={`/contest/${contest.id}`}>{contest.id}</Link></td>
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
          <h2 className="text-2xl font-semibold mb-4 text-center gradient-text">Our Features</h2>
          <div className="flex justify-between mt-8">
          
            <div className="feature-div rounded shadow-md p-4 w-1/3 mr-4 h-51 gradient-bg hover:scale-110 transition-transform duration-300 ease-in-out">
            <h2 className="text-2xl font-semibold mb-4 text-white text-center">Collaborative Coding</h2>
            <p className='text-white'>
            Join hands with like-minded individuals, brainstorming
                  solutions, refining algorithms, and conquering challenges
                  together.
            </p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-5"
                    onClick={handleExploreButtonClickCollabCoding}>Explore</button>
            </div>
            <div className="feature-div rounded shadow-md p-4 w-1/3 mr-4 h-51 hover:scale-110 transition-transform duration-300 ease-in-out">
            <h2 className="text-2xl font-semibold mb-4 text-center">Host Contest</h2>
            <p>
            Embrace the opportunity to showcase your skills,
                    <br />
                    compete with fellow enthusiasts, and elevate your coding
                    prowess.
            </p>
            
                    <button 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-5"
                        onClick={handleExploreButtonClickHostContest} 
                    >
                        Explore
                    </button>
                
            
            
            </div>
            <div className="feature-div rounded shadow-md p-4 w-1/3 h-51 gradient-bg hover:scale-110 transition-transform duration-300 ease-in-out ">
            <h2 className="text-2xl font-semibold mb-4 text-white text-center">Language Flexibility</h2>
            <p className='text-white'>
            Dive into a world of coding freedom with our platform's
                    support for a diverse range of programming languages.
            </p>
            
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-5"
                    onClick={handleExploreButtonClickCollabCoding}>Explore</button>
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

export default HomePage;
