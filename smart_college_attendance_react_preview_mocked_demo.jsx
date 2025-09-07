import React, { useState } from "react";
import ReactDOM from "react-dom/client";

function App() {
  const [page, setPage] = useState("register");
  const [students, setStudents] = useState(
    JSON.parse(localStorage.getItem("students") || "{}")
  );
  const [current, setCurrent] = useState(null);
  const [form, setForm] = useState({
    collegeId: "",
    email: "",
    phone: "",
    password: "",
  });
  const workingDays = 100;

  function saveStudents(updated) {
    setStudents(updated);
    localStorage.setItem("students", JSON.stringify(updated));
  }

  function register() {
    if (!form.collegeId || !form.email || !form.phone || !form.password) {
      alert("Fill all fields");
      return;
    }
    if (students[form.collegeId]) {
      alert("Already registered! Please login.");
      setPage("login");
      return;
    }
    const updated = {
      ...students,
      [form.collegeId]: { ...form, attendance: 0 },
    };
    saveStudents(updated);
    alert("Registered successfully. Please login.");
    setPage("login");
  }

  function login() {
    const user = students[form.collegeId];
    if (!user) {
      alert("Not registered");
      return;
    }
    if (user.password !== form.password) {
      alert("Wrong password");
      return;
    }
    setCurrent(user);
    setPage("dashboard");
  }

  function markAttendance() {
    const updated = { ...students };
    updated[current.collegeId].attendance += 1;
    saveStudents(updated);
    setCurrent(updated[current.collegeId]);
  }

  function totalAbsent() {
    return workingDays - current.attendance;
  }

  function attendancePercent() {
    return ((current.attendance / workingDays) * 100).toFixed(2);
  }

  // --- PAGES ---
  if (page === "register") {
    return (
      <div style={styles.card}>
        <h2>Register</h2>
        <input
          placeholder="College ID"
          onChange={(e) => setForm({ ...form, collegeId: e.target.value })}
          style={styles.input}
        />
        <input
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          style={styles.input}
        />
        <input
          placeholder="Phone"
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          style={styles.input}
        />
        <button style={styles.button} onClick={register}>
          Register
        </button>
        <p>
          Already registered?{" "}
          <a href="#" onClick={() => setPage("login")}>
            Login
          </a>
        </p>
      </div>
    );
  }

  if (page === "login") {
    return (
      <div style={styles.card}>
        <h2>Login</h2>
        <input
          placeholder="College ID"
          onChange={(e) => setForm({ ...form, collegeId: e.target.value })}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          style={styles.input}
        />
        <button style={styles.button} onClick={login}>
          Login
        </button>
        <p>
          New student?{" "}
          <a href="#" onClick={() => setPage("register")}>
            Register
          </a>
        </p>
      </div>
    );
  }

  if (page === "dashboard" && current) {
    return (
      <div style={styles.card}>
        <h2>Welcome, {current.collegeId}</h2>
        <button style={styles.button} onClick={markAttendance}>
          Mark Attendance
        </button>
        <p>Total Absent: {totalAbsent()}</p>
        <p>Attendance %: {attendancePercent()}%</p>
        <button style={styles.logout} onClick={() => setPage("login")}>
          Logout
        </button>
      </div>
    );
  }

  return <h2>Loading...</h2>;
}

const styles = {
  card: {
    background: "white",
    borderRadius: "12px",
    padding: "20px",
    margin: "40px auto",
    maxWidth: "400px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  button: {
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "10px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "10px",
  },
  logout: {
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "10px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "20px",
  },
};

// Render App
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
