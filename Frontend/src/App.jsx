import { useState } from "react";
import Login from "./Pages/login";
import Signup from "./Pages/signup";
import Dashboard from "./Pages/Dashboard";

function App() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);

 const handleLogout = () => {
  setUser(null);
};

if (user) {
  return (
    <Dashboard
      user={user}
      onLogout={handleLogout}
    />
  );
}
  return (
    <>
      {showLogin ? (
        <Login
          setUser={setUser}
          setShowLogin={setShowLogin}
        />
      ) : (
        <Signup
          setShowLogin={setShowLogin}
        />
      )}
    </>
  );
}

export default App;