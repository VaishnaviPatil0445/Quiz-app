import React, { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";

const AuthPage = () => {
  const { signup, login } = useContext(AuthContext);
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const handleSubmit = () => {
    if (isSignup) {
      signup(username, password, role);
    } else {
      login(username, password);
    }
  };

  return (
    <div className="vh-100 d-flex flex-column justify-content-center align-items-center bg-dark text-white">
      <h1 className="mb-4">{isSignup ? "Signup" : "Login"}</h1>

      <input
        type="text"
        placeholder="Username"
        className="form-control mb-2 w-50"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="form-control mb-2 w-50"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {isSignup && (
        <select
          className="form-select mb-2 w-50"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>
      )}

      <button className="btn btn-primary mb-3" onClick={handleSubmit}>
        {isSignup ? "Signup" : "Login"}
      </button>

      <p>
        {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
        <span
          className="text-info"
          style={{ cursor: "pointer" }}
          onClick={() => setIsSignup(!isSignup)}
        >
          {isSignup ? "Login here" : "Signup here"}
        </span>
      </p>
    </div>
  );
};

export default AuthPage;
