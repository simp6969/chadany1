"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function App() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [dataFetch, setFetch] = useState([]);
  const [ortsn, setOrtsn] = useState(false);
  const router = useRouter();
  const [room, setRoom] = useState();

  useEffect(() => {
    fetch("http://localhost:8080/users")
      .then((res) => res.json())
      .then((data) => setFetch(data));
  }, []);
  function handleUsername(event) {
    setUsername(event.target.value);
  }
  function handlePassword(event) {
    setPassword(event.target.value);
  }
  console.log(dataFetch);
  function logIn() {
    dataFetch.map((element) => {
      if (element.username === username) {
        if (element.password === +password) {
          console.log("logged in");
          router.push("/chat?username=" + element.username);
        } else {
          setOrtsn(true);
        }
      }
    });
  }
  if (dataFetch.length === 0) {
    return <h1>loading....</h1>;
  }

  return (
    <div className="flex justify-center">
      <input id="toggle" className="toggle" type="checkbox" />
      <div className="background h-[100vh] w-[100vw] flex justify-center items-center gap-[10px] flex-col">
        <h1>chadany1 login</h1>
        <div className="flex flex-col">
          <p>username</p>
          <input
            onChange={handleUsername}
            className="text-[#313131] border-black border-[3px] rounded-[10px] p-[5px]"
          />
        </div>
        <p
          style={
            ortsn ? { display: "flex", color: "red" } : { display: "none" }
          }
        >
          password or username wrong
        </p>
        <div className="flex flex-col">
          <p>password</p>
          <input
            onChange={handlePassword}
            className="text-[#313131] border-black p-[5px] border-[3px] rounded-[10px]"
          />
        </div>
        <button onClick={logIn}>log in</button>
      </div>
    </div>
  );
}
