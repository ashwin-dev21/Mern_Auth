import { useState } from "react";
import api from "../api";

export default function ResetPassword() {
  const [email,setEmail]=useState("");
  const [otp,setOtp]=useState("");
  const [password,setPassword]=useState("");

  const submit = async ()=>{
    await api.post("/reset",{email,otp,password});
    alert("Password reset");
  };

  return (
    <div className="center">
      <div className="card">
        <h2>Reset Password</h2>
        <input className="input" placeholder="Email" onChange={e=>setEmail(e.target.value)} />
        <input className="input" placeholder="OTP" onChange={e=>setOtp(e.target.value)} />
        <input className="input" type="password" placeholder="New Password" onChange={e=>setPassword(e.target.value)} />
        <button className="btn bg-green-500" onClick={submit}>Reset</button>
      </div>
    </div>
  );
}