
import { MouseEventHandler, useState } from "react";
import axios from "axios";

function Github() {
  interface GitHubData {
    login: string;
    public_repos: number;
    followers: number;
    following: number;
    avatar_url: string;
  }

  const [username, setUsername] = useState<string>("");
  const [gitData, setGitData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get<GitHubData>(`https://api.github.com/users/${username}`);
      setGitData(res.data);
    } catch (error) {
      setError("User not found. Please check the username.");
      console.error("Error fetching GitHub user data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <form className="mb-4">
        <input
          onChange={(e) => setUsername(e.currentTarget.value)}
          value={username}
          className="border-2 border-gray-300 px-4 py-2 rounded w-64 focus:outline-none focus:border-blue-500"
          placeholder="Enter GitHub username"
        />
      </form>

      <button
        onClick={handleSearch}
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={loading}
      >
        {loading ? 'Searching...' : 'Search'}
      </button>

      {error && (
        <p className="text-red-500 mt-2">{error}</p>
      )}

      {gitData && (
        <div className="mt-4 w-fit">
          <div className="flex items-center justify-center flex-col">
            <img
              src={gitData.avatar_url}
              alt="GitHub Avatar"
              className="w-24 h-24 rounded-full"
            />
            <div className="ml-4 text-center">
              <h1 className="text-2xl font-bold">{gitData.login}</h1>
              <div className="flex items-center mt-2">
                <div className="flex items-center mr-4">
                  <i className="fas fa-code text-gray-600 mr-1"></i>
                  <p className="text-sm">{gitData.public_repos} Repos</p>
                </div>
                <div className="flex items-center mr-4">
                  <i className="fas fa-users text-gray-600 mr-1"></i>
                  <p className="text-sm">{gitData.followers} Followers</p>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-user-friends text-gray-600 mr-1"></i>
                  <p className="text-sm">{gitData.following} Following</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Github;


