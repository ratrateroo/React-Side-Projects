import { useState } from "react";
import "./App.css";
import Posts from "./pages/Posts";

function App() {
  const [count, setCount] = useState(0);

  return <Posts />;
}

export default App;
