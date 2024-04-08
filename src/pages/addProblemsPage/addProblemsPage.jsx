import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AddProblemsPage = () => {
  const { contestId } = useParams();
  const [problems, setProblems] = useState([]);
  const [contestDetails, setContestDetails] = useState('');
  useEffect(() => {
    const fetchContestDetails = async () => {
      try {
        const response = await axios.get(`https://code-elevate.onrender.com/api/contests/${contestId}`);
        setContestDetails(response.data);
      } catch (error) {
        console.error('Error fetching contest details:', error);
      }
    };

    fetchContestDetails();
  }, [contestId]);
  const [newProblem, setNewProblem] = useState({
    id:'',
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
  const [newSampleInput, setNewSampleInput] = useState('');
  const [newSampleOutput, setNewSampleOutput] = useState('');
  const [newSampleExplanation, setNewSampleExplanation] = useState('');
  const [newTestCaseInput, setNewTestCaseInput] = useState('');
  const [newTestCaseOutput, setNewTestCaseOutput] = useState('');
  const [newTag, setNewTag] = useState('');
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProblem({ ...newProblem, [name]: value });
  };

  const handleDifficultyChange = (e) => {
    const value = e.target.value;
    let difficulty = '';
  
    switch (value) {
      case '1':
        difficulty = 'Easy';
        break;
      case '2':
        difficulty = 'Medium';
        break;
      case '3':
        difficulty = 'Hard';
        break;
      default:
        difficulty = '';
    }
  
    setNewProblem((prevProblem) => ({
      ...prevProblem,
      difficulty: value, 
    }));
  };

  const handleAddSample = () => {
    const newSample = {
      input: newSampleInput,
      output: newSampleOutput,
      explanation: newSampleExplanation,
    };
    setNewProblem((prevProblem) => ({
      ...prevProblem,
      samples: [...prevProblem.samples, newSample],
    }));
    
    setNewSampleInput('');
    setNewSampleOutput('');
    setNewSampleExplanation('');
  };

  const difficultyColorClass = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 'Easy';
      case 'Medium':
        return 'Medium';
      case 'Hard':
        return 'Hard';
      default:
        return '';
    }
  };


  const handleAddTag = () => {
    if (typeof newTag === 'string' && newTag.trim() !== '') {
      setNewProblem((prevProblem) => ({
        ...prevProblem,
        tags: [...prevProblem.tags, newTag.trim()],
      }));
      setNewTag(''); 
    }
  };
  

  const handleAddProblem = async () => {
    try {
      const authToken = localStorage.getItem('x-auth-token');
      const response = await axios.post(
        `https://code-elevate.onrender.com/api/manage/contests/${contestId}/problems/add`,
        newProblem,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': authToken,
          },
        }
      );
      console.log('Problem added successfully:', response.data);
      // Clear the form after adding the problem
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
      // Optionally, you can update the list of problems displayed on the page
      setProblems([...problems, response.data]);
    } catch (error) {
      console.error('Error adding problem:', error);
    }
  };

  const handleAddTestCase = () => {
    const newTestCase = {
      input: newTestCaseInput,
      output: newTestCaseOutput,
    };
    setNewProblem((prevProblem) => ({
      ...prevProblem,
      testCases: [...prevProblem.testCases, newTestCase],
    }));
   
    setNewTestCaseInput('');
    setNewTestCaseOutput('');
  };

  const handleDeleteSample = (index) => {
    const updatedSamples = [...newProblem.samples];
    updatedSamples.splice(index, 1);
    setNewProblem((prevProblem) => ({
      ...prevProblem,
      samples: updatedSamples,
    }));
  };
  
  const handleDeleteTestCase = (index) => {
    const updatedTestCases = [...newProblem.testCases];
    updatedTestCases.splice(index, 1);
    setNewProblem((prevProblem) => ({
      ...prevProblem,
      testCases: updatedTestCases,
    }));
  };
  


  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Add Problems:{contestDetails.title}</h2>
      <p className='mb-5'>Description: {contestDetails.description}</p>
      <div className="flex flex-col">
          <input
            type="text"
            name="id"
            placeholder="Probelm Id"
            value={newProblem.id}
            onChange={handleInputChange}
            className="mb-4 p-2 rounded-md border border-gray-300"
          />
          <input
            type="text"
            name="title"
            placeholder="Probelm Title"
            value={newProblem.title}
            onChange={handleInputChange}
            className="mb-4 p-2 rounded-md border border-gray-300"
          />
          <textarea
            type="text"
            name="statement"
            placeholder='Problem Statement'
            value={newProblem.statement}
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
            name="input"
            placeholder="input"
            value={newProblem.input}
            onChange={handleInputChange}
            className="mb-4 p-2 rounded-md border border-gray-300"
          />
          <input
            type="text"
            name="output"
            placeholder="output"
            value={newProblem.output}
            onChange={handleInputChange}
            className="mb-4 p-2 rounded-md border border-gray-300"
          />
            <div>
        <h3 className="text-lg font-bold mb-2">Add Samples</h3>
        <div className="flex items-center mb-4">
          <input
            type="text"
            value={newSampleInput}
            onChange={(e) => setNewSampleInput(e.target.value)}
            placeholder="Input"
            className="p-2 mr-2 rounded-md border border-gray-300"
          />
          <input
            type="text"
            value={newSampleOutput}
            onChange={(e) => setNewSampleOutput(e.target.value)}
            placeholder="Output"
            className="p-2 mr-2 rounded-md border border-gray-300"
          />
          <input
            type="text"
            value={newSampleExplanation}
            onChange={(e) => setNewSampleExplanation(e.target.value)}
            placeholder="Explanation"
            className="p-2 mr-2 rounded-md border border-gray-300"
          />
          <button
            onClick={handleAddSample}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add Sample
          </button>
          {newProblem.samples.length > 0 && (
          <table className="w-full mb-4">
            <thead>
              <tr>
                <th>Input</th>
                <th>Output</th>
                <th>Explanation</th>
              </tr>
            </thead>
            <tbody>
              {newProblem.samples.map((sample, index) => (
                <tr key={index}>
                  <td>{sample.input}</td>
                  <td>{sample.output}</td>
                  <td>{sample.explanation}</td>
                  <td>
                  <button className='text-color-green' onClick={() => handleDeleteSample(index)}>Delete</button> {/* Add delete button */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        </div>
      </div>
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
<div>
        <input
          type="text"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          placeholder="Enter Tag"
          className="p-2 mr-2 rounded-md border border-gray-300"
        />
        <button onClick={handleAddTag} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Add Tag
        </button>
      </div>
      {/* Tag List */}
      <div>
        <h3>Tags:</h3>
        <ul>
          {newProblem.tags.map((tag, index) => (
            <li key={index}>{tag.name}</li>
          ))}
        </ul>
      </div>
          <input
            type="text"
            name="score"
            placeholder="Score"
            value={newProblem.score}
            onChange={handleInputChange}
            className="mb-4 p-2 rounded-md border border-gray-300"
          />
        <div>
        <h3 className="text-lg font-bold mb-2">Add Test Cases</h3>
        <div className="flex items-center mb-4">
          <input
            type="text"
            value={newTestCaseInput}
            onChange={(e) => setNewTestCaseInput(e.target.value)}
            placeholder="Test Case Input"
            className="p-2 mr-2 rounded-md border border-gray-300"
          />
          <input
            type="text"
            value={newTestCaseOutput}
            onChange={(e) => setNewTestCaseOutput(e.target.value)}
            placeholder="Test Case Output"
            className="p-2 mr-2 rounded-md border border-gray-300"
          />
          <button
            onClick={handleAddTestCase}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add Test Case
          </button>
        </div>
        {newProblem.testCases.length > 0 && (
          <table className="w-1/3 mb-4">
            <thead>
              <tr>
                <th className='ml-auto'>Input</th>
                <th>Output</th>
              </tr>
            </thead>
            <tbody>
              {newProblem.testCases.map((testCase, index) => (
                <tr key={index}>
                  <td>{testCase.input}</td>
                  <td>{testCase.output}</td>
                  <td>
                  <button onClick={() => handleDeleteTestCase(index)}>Delete</button> {/* Add delete button */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
          <button onClick={handleAddProblem} className="bg-blue-500  w-1/4 text-white py-2 px-4 rounded-md hover:bg-blue-600">Add Problem</button>
        </div>
        <div>
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

        <style>
        {`
          th,
          td {
            vertical-align: middle;
          }
        `}
      </style>
      
    </div>
  );
};

export default AddProblemsPage;