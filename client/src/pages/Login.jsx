import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";

export default function Login() {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const nav = useNavigate();

  const submit = async ()=>{
    await api.post("/login",{email,password});
    nav("/dashboard");
  };

  return (
    <div className="center">
      <div className="card">
        <h2 className="text-xl mb-4 text-center">Login</h2>

        <input className="input" placeholder="Email" onChange={e=>setEmail(e.target.value)} />
        <input className="input" type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)} />

        <button className="btn bg-blue-500" onClick={submit}>Login</button>

        <button
          className="btn bg-red-500"
          onClick={()=>window.location.href="http://localhost:5000/api/auth/google"}
        >
          Continue with Google
        </button>

        <p className="text-sm mt-2">
          <Link to="/register">Register</Link> | <Link to="/forgot">Forgot?</Link>
        </p>
      </div>
    </div>
  );
}