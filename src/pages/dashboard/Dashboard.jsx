import { useState, useEffect, useContext } from "react";
import StatusContext from "../../context/Context";
import { BookOpen, LogOut, User } from "lucide-react";
import { useNavigate, Outlet } from "react-router";

export default function Dashboard() {
  const navigate = useNavigate();
  const { setStatus } = useContext(StatusContext);
  const token = localStorage.getItem("token");

  const [user, setUser] = useState({
    name: "",
    email: "",
    username: "",
  });

  useEffect(() => {
    (async () => {
      try {
        setStatus({ error: "", success: "", isLoading: true });
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user`, {
          headers: {
            Authorization: `BEARER ${token}`,
          },
        });
        const data = await response.json();
        setStatus({ error: "", success: "", isLoading: false });

        if (!response.ok) throw new Error(data.message);
        setUser(data);
      } catch (error) {
        setStatus({ error: error.message, success: "", isLoading: false });
      }
    })();
  }, []);

  const capitalizeWord = (word = "") => {
    let firstWord = word.split(" ")[0];
    let newWord = firstWord.substring(0, 1).toUpperCase() + firstWord.substring(1).toLowerCase();
    return newWord;
  };

  return (
    <div id="dashboard" className="min-h-full p-6">
      <header className="max-w-6xl mx-auto mb-8">
        <div className="flex justify-between items-center py-4 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-emerald-100 rounded-full">
              <User className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h1 className="text-md font-bold text-gray-800">Hello, {capitalizeWord(user.name)}</h1>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
          </div>
          <button
            className="flex items-center px-4 py-2 text-emerald-600 hover:text-emerald-700 font-medium"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}>
            <LogOut className="w-5 h-5 sm:mr-2" />
            <span className="hidden sm:block">Logout</span>
          </button>
        </div>
      </header>
      <Outlet />
    </div>
  );
}
