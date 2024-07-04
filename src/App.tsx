
import { useState } from "react";
import Leetcode from "./components/Leetcode.tsx";
import Github from "./components/Github.tsx";

function App() {
  const [leet, setLeet] = useState<boolean>(false);
  const [git, setGit] = useState<boolean>(false);

  const handleLeet = () => {
    setGit(false);
    setLeet(true);
  };

  const handleGit = () => {
    setLeet(false);
    setGit(true);
  };

  return (
    <div className="w-full h-full p-4 bg-gray-200">
      <div className="flex justify-center mb-4">
        <button
          onClick={handleLeet}
          className="bg-white border-2 border-black rounded-full px-6 py-2 text-sm font-semibold shadow-md hover:bg-black hover:text-white hover:shadow-lg hover:border-white transition-all duration-300"
        >
          LEETCODE
        </button>
        <button
          onClick={handleGit}
          className="bg-white border-2 border-black rounded-full px-6 py-2 text-sm font-semibold shadow-md hover:bg-black hover:text-white hover:shadow-lg hover:border-white transition-all duration-300 ml-4"
        >
          GITHUB
        </button>
      </div>
      <div className="flex justify-center items-center">
        {leet && <Leetcode />}
        {git && <Github />}
      </div>
    </div>
  );
}

export default App;

