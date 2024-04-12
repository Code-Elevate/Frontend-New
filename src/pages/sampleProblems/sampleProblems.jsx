import React from 'react';
import { useNavigate } from 'react-router-dom';
import problemsData from '../../problems.json';
const SampleProblemsPage = () => {
    const navigate = useNavigate();
  return (
    <div className="container flex justify-content items-center flex-col mx-auto bg-gray-100">
      <h1 className="text-2xl font-bold mb-4 text-center mt-5 gradient-text">Sample Problems</h1>
      <table className="w-5/6">
        <thead>
          <tr className="bg-gray-700 text-white">
            <th className="py-2 px-4">Problem ID</th>
            <th className="py-2 px-4">Title</th>
            <th className="py-2 px-4">Difficulty</th>
            <th className="py-2 px-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {problemsData.map((problem, index) => (
            <tr key={problem.id} className={index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-300'}>
              <td className="py-2 px-4">{problem.id}</td>
              <td className="py-2 px-4">{problem.title}</td>
              <td className="py-2 px-4">{problem.difficulty}</td>
              <td className="px-4 py-2">
                    <button
                      onClick={() => {
                        navigate(
                          `/sampleEditor/${problem.id}`,
                          {
                            state: {
                              problemId: problem.id,
                              
                            },
                          }
                        );
                      }}
                      className="my-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                      Solve Problem
                    </button>
                  </td>
            </tr>
          ))}
        </tbody>
      </table>
      <style>
      {`

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

export default SampleProblemsPage;
