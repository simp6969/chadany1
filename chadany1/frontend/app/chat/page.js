"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function App() {
  const params = useSearchParams();
  const [user2Text, setUser2Text] = useState([]);
  const [user1Text, setUser1Text] = useState([]);
  const [send, setSend] = useState(false);
  const [input, setInput] = useState();
  const [Chosen, setChosen] = useState();
  const [user2name, setUser2name] = useState();
  const [room, setRoom] = useState();

  useEffect(() => {
    fetch("http://localhost:8080/chatroom/")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }, []);
  function handleInputNoKey(event) {
    setInput(event.target.value);
  }
  function handleInput(event) {
    if (event.key === "Enter") {
      setInput(event.target.value);
      setSend(true);
    }
  }
  function setActiveUser(value) {
    setChosen(value);
    setUser2name(value);
  }
  function postChat(value) {
    console.log(value);
    const raw = JSON.stringify({ username: "ariuka", age: "69" });
    var requestOptions = {
      method: "POST",
      body: raw,
      redirect: "follow",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch("http://localhost:8080/users/hutao", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        setUser1Text(data[0].chats);
      });
  }

  if (send) {
    postChat(input);
    setSend(false);
  }
  return (
    <div className="container">
      <div className="header">
        <h1>Chats</h1>
        <div className="userInfo">
          <img className="rounded-[50%] info" src="./user1.jpg"></img>
        </div>
      </div>
      <div className="content">
        <div className="user-icon">
          <img
            className="userimg"
            src="./user2.jpg"
            onClick={() => setActiveUser("hutao")}
          />
          <img
            className="userimg"
            src="./user3.jpg"
            onClick={() => setActiveUser("hutaoWithGlasses")}
          />
        </div>
        <div
          className="messages-container"
          style={Chosen ? { display: "block" } : { display: "none" }}
        >
          <div className="messages">
            <div className="user1">
              {user1Text.map((element, index) => {
                return (
                  <div key={index} className="flex flex-col">
                    <div>{user2name}</div>
                    <div className="flex">
                      <img className="user-message-img" src="./user3.jpg"></img>
                      <div className="content-text1">
                        <p>{element.value}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="user2">
              {user2Text.map((element, index) => {
                return (
                  <div key={index} className="flex flex-col">
                    <div className="flex flex-row-reverse">
                      {params.get("username")}
                    </div>
                    <div className="message-container-for-fetch-and-map-with-reversed-user-message-img">
                      <img className="user-message-img" src="./user1.jpg"></img>
                      <div className="content-text2">
                        <p>{element.value}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="sendMessage">
            <input
              onChange={handleInputNoKey}
              onKeyDown={handleInput}
              placeholder="send message..."
              className="daInput"
            ></input>
            <button onClick={() => setSend(true)} className="sendButt">
              send
            </button>
          </div>
        </div>
        <div
          className="flex bg-[#a2a2a1ff] h-[77%] w-[86%] justify-center items-center m-[40px] rounded-[40px] text-[#f1f4ffff] text-[26px]"
          style={Chosen ? { display: "none" } : { display: "flex" }}
        >
          <p>select chat to continue</p>
        </div>
      </div>
    </div>
  );
}
