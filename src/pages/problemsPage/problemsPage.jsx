import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';

const ProblemsPage = () => {
    const {contestId} = useParams();
    const [problems, setProblems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const fetchProblems = async () => {
        try {
          const response = await axios.get(`https://code-elevate.onrender.com/api/contests/${contestId}`);
          const { problems } = response.data;
          setProblems(problems);
        } catch (error) {
          console.error('Error fetching problems:', error);
          setIsLoading(false);
        }
      };
  
      fetchProblems();
    }, []);

  const alternatingRowClass = (index) => {
    return index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-100';
  };
  
  return (
    <div className="container mx-auto flex justify-center">
      <div className="w-2/3">
        <h2 className="text-2xl font-bold mb-4">Problems</h2>
        {problems.length === 0 ? (
          <p>No problems available</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Problem ID</th>
                <th className="px-4 py-2">Score</th>
                <th className="px-4 py-2">Difficulty</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {problems.map((problem, index) => (
                <tr key={problem.id} className={alternatingRowClass(index)}>
                  <td className="px-4 py-2">{problem.id}</td>
                  <td className="px-4 py-2">{problem.score}</td>
                  <td className="px-4 py-2">{problem.difficulty}</td>
                  <td className="px-4 py-2">
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                      Solve Problem
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ProblemsPage;