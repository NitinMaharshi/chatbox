import React, { useState } from "react";
import {
  TelephoneFill,
  EmojiSmile,
  FiletypeGif,
  Camera,
  HandThumbsUpFill,
  Controller,
} from "react-bootstrap-icons";
import { IoSend, IoMdVideocam, IoMdSettings, ImCross } from "react-icons/io5";
import styles from "./Chat.module.css";

const ChatBox = () => {
  const initialFormState = { id: null, name: "", url: "" };
  const [showgif, setShowGif] = useState(false);
  const [user, setUser] = useState(initialFormState);
  const [users, setUsers] = useState([]);
  const [gifdata, setGifData] = useState([]);
  console.log(gifdata);
  console.log(users);

  const handleChange = (e) => {
    setUser({
      id: users.length + 1,
      name: e.target.value,
      url: "",
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user.name) {
      alert("Type a message");
      return;
    } else {
      setUsers([...users, user]);
      setUser(initialFormState);
    }
  };

  let timerID;
  async function main() {
    let name = document.getElementById("Gif").value;
    let res = await searchMovies(name);
    console.log("res", res);
  }

  async function searchMovies(movie_name) {
    try {
      let res = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=qtMxlfJFZTAOvlYajWPMEsvn9Su1k8KB&q=${movie_name}&limit=100&offset=0&rating=g&lang=en`
      );
      let data = await res.json();
      let Gif_data = data.data;
      setGifData(Gif_data);
      return Gif_data;
    } catch (e) {
      console.log("e", e);
    }
  }

  function debounce(func, time) {
    if (timerID) {
      clearTimeout(timerID);
    }

    timerID = setTimeout(function () {
      func();
    }, time);
  }
  function returnPromises() {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Promise Executed...");
        resolve("Sample Data");
      }, 3000);
    });
  }

  async function ExecuteFunction() {
    var getData = await returnPromises();
    console.log(getData);
  }

  ExecuteFunction();

  function onGifSend(x) {
    var t = x.target.src;
    var m = {
      id: users.length + 1,
      name: "",
      url: t,
    };
    setUsers([...users, m]);
    setUser(initialFormState);
    setShowGif(!showgif);
  }
  return (
    <div>
      <div className={styles.Container}>
        <div className={styles.Chatbox}>
          {showgif ? (
            <div className={styles.gifs_box}>
              {gifdata.map((gif) => {
                return (
                  <img
                    className={styles.gifimg}
                    onClick={(e) => onGifSend(e)}
                    src={gif.images.original.url}
                    alt=""
                  />
                );
              })}
            </div>
          ) : (
            <div className={styles.messagebox}>
              {users.reverse().map((item) => {
                if (!item.name.length) {
                  return <img className={styles.chatimggif} src={item.url} />;
                } else {
                  return <div className={styles.message}>{item.name}</div>;
                }
              })}
            </div>
          )}

          <div className={styles.input_group}>
            {showgif ? (
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  className={styles.form_control}
                  placeholder="Serach a GIF"
                  id="Gif"
                  //   onInput={(e) => searchMovies(e.target.value)}
                  onInput={(e) => debounce(main, 1000)}
                />

                <button
                  className={`${styles.btn} ${styles.btn_outline_secondary}`}
                  type="submit"
                >
                  <IoSend />
                </button>
              </form>
            ) : (
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  className={styles.form_control}
                  placeholder="Type a message..."
                  onChange={(e) => handleChange(e)}
                  value={user.name}
                />

                <button
                  className={`${styles.btn} ${styles.btn_outline_secondary}`}
                  type="submit"
                >
                  <IoSend />
                </button>
              </form>
            )}

            <div className={styles.icons_container}>
              <div className={styles.icons_box}>
                <FiletypeGif
                  onClick={() => setShowGif(!showgif)}
                  className={styles.icons}
                />
                <EmojiSmile className={styles.icons} />
                <Controller className={styles.icons} />
                <Camera className={styles.icons} />
              </div>
              <div className={styles.thumsup_box}>
                <HandThumbsUpFill className={styles.thums_up} />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.Inputbox}></div>
      </div>
    </div>
  );
};

export default ChatBox;
