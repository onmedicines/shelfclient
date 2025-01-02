import { useState, useEffect, useContext } from "react";
import StatusContext from "../../context/Context";

export default function Dashboard() {
  const { setStatus } = useContext(StatusContext);
  const token = localStorage.getItem("token");
  const [books, setBooks] = useState([
    {
      name: "",
      pages: "",
      author: "",
      genre: [],
      username: "",
      rating: "",
      review: "",
    },
  ]);
  const [user, setUser] = useState({
    name: "",
    email: "",
    username: "",
  });
  // Format:
  // {
  //   name,
  //   pages,
  //   author,
  //   genre [],
  //   username,
  //   rating,
  //   review,
  // }

  useEffect(() => console.log(user), [user]);

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

  const capitalize = (word = "") => {
    let firstWord = word.split(" ")[0];
    let newWord = firstWord.substring(0, 1).toUpperCase() + firstWord.substring(1).toLowerCase();
    return newWord;
  };

  return (
    <div id="dashboard" className="px-8 pt-4">
      <header className="flex justify-between">
        <h1>Hello, {capitalize(user.name)}</h1>
        <button>Logout</button>
      </header>
      <main>
        <p>Your shelf</p>
        {(() => {
          let array = [];
          for (let i = 1; i <= 10; i++) {
            array.push(
              <div>
                <p>name of book</p>
                <p>author</p>
                <p>rating</p>
              </div>
            );
          }
          return array;
        })()}
      </main>
    </div>
  );
}
