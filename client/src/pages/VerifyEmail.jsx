import { useState } from "react";
import api from "../api";

export default function VerifyEmail() {
  const [email,setEmail]=useState("");
  const [otp,setOtp]=useState("");

  const submit = async ()=>{
    await api.post("/verify",{email,otp});
    alert("Verified");
  };

  return (
    <div className="center">
      <div className="card">
        <h2>Verify Email</h2>
        <input className="input" placeholder="Email" onChange={e=>setEmail(e.target.value)} />
        <input className="input" placeholder="OTP" onChange={e=>setOtp(e.target.value)} />
        <button className="btn bg-blue-500" onClick={submit}>Verify</button>
      </div>
    </div>
  );
}