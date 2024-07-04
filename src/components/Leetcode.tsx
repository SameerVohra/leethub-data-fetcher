
import axios from "axios";
import { useState } from "react";
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto'; // Necessary for Chart.js 3+

function Leetcode() {
  const [username, setUsername] = useState<string>("");
  const [total, setTotal] = useState<number>(0);
  const [easy, setEasy] = useState<number>(0);
  const [med, setMed] = useState<number>(0);
  const [hard, setHard] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const data = async () => {
      try {
        const response = await axios.get(`https://alfa-leetcode-api.onrender.com/${username}/solved`);
        console.log(response);
        setTotal(response.data.solvedProblem);
        setEasy(response.data.easySolved);
        setMed(response.data.mediumSolved);
        setHard(response.data.hardSolved);
      } catch (error) {
        setError("Error fetching data. Please check the username.");
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    data();
  }

  const chartData = {
    labels: ['Easy', 'Medium', 'Hard'],
    datasets: [
      {
        data: [easy, med, hard],
        backgroundColor: ['#4CAF50', '#FFC107', '#F44336'],
        hoverBackgroundColor: ['#66BB6A', '#FFCA28', '#E57373'],
      },
    ],
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <div className="mb-4">
        <input
          onChange={(e) => setUsername(e.currentTarget.value)}
          value={username}
          className="border-2 border-gray-300 px-4 py-2 rounded w-full focus:outline-none focus:border-blue-500"
          placeholder="Enter LeetCode username"
        />
      </div>

      <button
        onClick={handleSearch}
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={loading}
      >
        {loading ? 'Searching...' : 'Search'}
      </button>

      {error && (
        <p className="text-red-500 mt-2">{error}</p>
      )}

      {total > 0 && (
        <div className="mt-4">
          <Pie data={chartData} />
          <div className="mt-4 text-center">
            <h1 className="text-xl font-bold">Total Problems Solved: {total}</h1>
            <div className="flex justify-center mt-2">
              <div className="mx-4">
                <p className="text-green-600 font-semibold">Easy: {easy}</p>
              </div>
              <div className="mx-4">
                <p className="text-yellow-600 font-semibold">Medium: {med}</p>
              </div>
              <div className="mx-4">
                <p className="text-red-600 font-semibold">Hard: {hard}</p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Leetcode;

