import { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import RouterLayout from "./routes";
import { GetJenkinsCrumb } from "./services";
function App() {
  useEffect(() => {
    loadInitData();
  }, []);

  const loadInitData = async () => {
    const { crumb } = await GetJenkinsCrumb();
    localStorage.setItem("crumb", crumb);
  };

  return (
    <div className="w-full h-full overflow-hidden relative">
      <Router>
        <RouterLayout />
      </Router>
    </div>
  );
}

export default App;
