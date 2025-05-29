import React, { useState } from "react";
import AuthForm from "./components/AuthForm";
import TaskList from "./components/TaskList";

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);

  if (!token) {
    return <AuthForm onLogin={setToken} />;
  }

  return (
    <div>
      <button onClick={() => setToken(null)}>Logout</button>
      <TaskList token={token} />
    </div>
  );
};

export default App;
