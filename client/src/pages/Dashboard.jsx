import api from "../api";

export default function Dashboard() {
  const logout = async ()=>{
    await api.post("/logout");
    window.location.href="/";
  };

  return (
    <div className="center">
      <div className="card text-center">
        <h1 className="text-xl mb-4">Dashboard 🎉</h1>
        <button className="btn bg-red-500" onClick={logout}>Logout</button>
      </div>
    </div>
  );
}