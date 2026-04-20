import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function Register() {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const nav = useNavigate();

  const submit = async ()=>{
    await api.post("/register",{email,password});
    nav("/verify");
  };

  return (
    <div className="center">
      <div className="card">
        <h2>Register</h2>
        <input className="input" onChange={e=>setEmail(e.target.value)} placeholder="Email"/>
        <input className="input" type="password" onChange={e=>setPassword(e.target.value)} placeholder="Password"/>
        <button className="btn bg-green-500" onClick={submit}>Register</button>
      </div>
    </div>
  );
}