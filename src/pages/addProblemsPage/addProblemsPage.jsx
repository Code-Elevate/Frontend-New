import React, { useState } from 'react';

const AddProblemsPage = () => {
  const [problems, setProblems] = useState([]);
  const [newProblem, setNewProblem] = useState({
    title: '',
    statement: '',
    input: '',
    output: '',
    constraints: '',
    samples: [],
    difficulty: '',
    tags: [],
    score: 0,
    testCases: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProblem({ ...newProblem, [name]: value });
  };

  const handleDifficultyChange = (e) => {
    const value = parseInt(e.target.value);
    let difficulty = '';
  
    switch (value) {
      case 1:
        difficulty = 'Easy';
        break;
      case 2:
        difficulty = 'Medium';
        break;
      case 3:
        difficulty = 'Hard';
        break;
      default:
        difficulty = '';
    }
  
    setNewProblem((prevProblem) => ({
      ...prevProblem,
      difficulty: value, // Set value instead of difficulty string
    }));
  };

  const difficultyColorClass = (difficulty) => {
    switch (difficulty) {
      case '1':
        return 'Easy';
      case '2':
        return 'Medium';
      case '3':
        return 'Hard';
      default:
        return '';
    }
  };

  

  const handleAddProblem = () => {
    setProblems([...problems, newProblem]);
    setNewProblem({
      title: '',
      statement: '',
      input: '',
      output: '',
      constraints: '',
      samples: [],
      difficulty: '',
      tags: [],
      score: 0,
      testCases: [],
    });
    
  };


  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Add Problems</h2>
      <div className="flex flex-col">
          <input
            type="text"
            name="title"
            placeholder="Probelm Title"
            value={newProblem.title}
            onChange={handleInputChange}
            className="mb-4 p-2 rounded-md border border-gray-300"
          />
          <input
            type="text"
            name="statement"
            placeholder='Problem Statement'
            value={newProblem.statement}
            onChange={handleInputChange}
            className="mb-4 p-2 rounded-md border border-gray-300"
          />
          <input
            type="text"
            name="input"
            placeholder='Input'
            value={newProblem.input}
            onChange={handleInputChange}
            className="mb-4 p-2 rounded-md border border-gray-300"
          />
          <input
            type="text"
            name="output"
            placeholder="Output"
            value={newProblem.output}
            onChange={handleInputChange}
            className="mb-4 p-2 rounded-md border border-gray-300"
          />
          <input
            type="text"
            name="constraints"
            placeholder="Constraints"
            value={newProblem.constraints}
            onChange={handleInputChange}
            className="mb-4 p-2 rounded-md border border-gray-300"
          />
          <input
            type="text"
            name="samples"
            placeholder="samples"
            value={newProblem.samples}
            onChange={handleInputChange}
            className="mb-4 p-2 rounded-md border border-gray-300"
          />
          <div>
  <label htmlFor="difficulty" className="block mb-2" style={{ color: 'grey' }}>Difficulty</label>
  <input
    type="range"
    name="difficulty"
    min="1"
    max="3"
    value={newProblem.difficulty}
    onChange={handleDifficultyChange}
    className="w-1/3 p-2 border rounded mb-2"
  />
  <div className=" w-1/3 flex justify-between mb-5">
    <span style={{ color: 'green' }} >Easy</span>
    <span style={{ color: 'yellow' }}>Medium</span>
    <span style={{ color: 'red' }}>Hard</span>
  </div>
</div>
          <input
            type="text"
            name="tags"
            placeholder="tags"
            value={newProblem.tags}
            onChange={handleInputChange}
            className="mb-4 p-2 rounded-md border border-gray-300"
          />
          <input
            type="text"
            name="score"
            placeholder="Score"
            value={newProblem.score}
            onChange={handleInputChange}
            className="mb-4 p-2 rounded-md border border-gray-300"
          />
          <input
            type="text"
            name="test-cases"
            placeholder="Test Cases"
            value={newProblem.testCases}
            onChange={handleInputChange}
            className="mb-4 p-2 rounded-md border border-gray-300"
          />
          <button onClick={handleAddProblem} className="bg-blue-500  w-1/4 text-white py-2 px-4 rounded-md hover:bg-blue-600">Add Problem</button>
        </div>
      <h2 className="text-2xl font-bold mb-4 text-center">Added Problems</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Difficulty</th>
          </tr>
        </thead>
        <tbody>
          {problems.map((problem, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{problem.title}</td>
              <td><span className={difficultyColorClass(problem.difficulty)}>{problem.difficulty}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddProblemsPage;
