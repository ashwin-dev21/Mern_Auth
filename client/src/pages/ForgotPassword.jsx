import { useState } from "react";
import api from "../api";

export default function ForgotPassword() {
  const [email,setEmail]=useState("");

  const submit = async ()=>{
    await api.post("/forgot",{email});
    alert("OTP sent");
  };

  return (
    <div className="center">
      <div className="card">
        <h2>Forgot Password</h2>
        <input className="input" onChange={e=>setEmail(e.target.value)} placeholder="Email"/>
        <button className="btn bg-yellow-500" onClick={submit}>Send OTP</button>
      </div>
    </div>
  );
}