"use client";
import React, { useEffect, useRef, useState, ChangeEvent } from "react";
import {
  addThenGetLatestDiary,
  getDiary,
  getUsernameFromToken,
  logout,
} from "./actions";
import Link from "next/link";
import Image from "next/image";
import MoodTab from "./MoodTab";
import { DiaryItem } from "./DiaryItem";
import Filter from "./Filter";

export default function Mydiary() {
  const contentRef = useRef<any>(null);
  const linkRef = useRef<any>(null);
  const inputImageRef = useRef<any>(null);
  const [delete_id, setDelete_id] = useState(null);
  const [username, setUsername] = useState("");
  const [diaries, setDiaries] = useState<any>([]);
  const [storage, setStorage] = useState<any>([]);
  const [hiddenPopup, setHiddenPopup] = useState(true);
  const [base64, setBase64] = useState<string>();
  const [mood, setMood] = useState<string>();
  const [link, setLink] = useState<string>();
  const [popupFilter, setPopupFilter] = useState<any>();
  const clear = () => {
    setBase64("");
    inputImageRef.current.value = "";
    contentRef.current.value = "";
    setMood(undefined);
    setLink(undefined);
  };
  const makeObjectData = async () => {
    const content = contentRef.current?.value;
    const now = new Date();
    const objectData = {
      hidden: false,
      username: username,
      content: content,
      image: base64,
      mood: mood,
      link: link,
      hh: now.getHours(),
      mm: now.getMinutes(),
      ss: now.getMilliseconds(),
      day: now.getDate(),
      dayName: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][now.getDay()],
      month: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ][now.getMonth()],
      year: now.getFullYear(),
      clientTimestamp: now.getTime(),
    };
    clear();
    return objectData;
  };
  const sendData = async () => {
    if (contentRef.current?.value || base64) {
      const latestDoc = await addThenGetLatestDiary(await makeObjectData());
      setDiaries((prev: any) => [JSON.parse(latestDoc)[0], ...prev]);
    } else alert("write something...");
  };
  useEffect(() => {
    (async () =>
      await getUsernameFromToken().then((res) => setUsername(res)))();
    (async () =>
      await getDiary().then((res) => {
        const data = JSON.parse(res).reverse();
        setStorage(data);
        setDiaries(data);
      }))();
  }, []);
  useEffect(() => {}, [diaries]);
  useEffect(() => {
    setDiaries(diaries.filter((item: any) => item._id !== delete_id));
  }, [delete_id]);

  return (
    <div className=" flex flex-col px-1 mb-5 w-[25rem]">
      <nav className=" w-full flex justify-between gap-2 p-3 sticky top-0 bg-[#edededaa] backdrop-blur-xl">
        <div className=" flex flex-col gap-2">
          <Link href={"#"} className=" font-bold text-[2rem] leading-none">
            {username}
            {"'s diary"}
          </Link>
          <h1 className=" text-[1.2rem] leading-none">
            {getDateAndTime().date}
          </h1>
        </div>

        <svg
          onClick={async () => await logout()}
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="currentColor"
          className="bi bi-box-arrow-right cursor-pointer col-span-1 row-span-3 self-center"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
          />
          <path
            fill-rule="evenodd"
            d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
          />
        </svg>
      </nav>
      <section>
        <div className={` ${hiddenPopup && "hidden"}`}>
          <div className=" bg-weight3 my-2 flex flex-col justify-center items-center rounded-lg gap-2 p-3">
            {base64 && (
              <Image
                className=" rounded-md"
                src={base64}
                height={100}
                width={600}
                alt=""
              />
            )}
            <textarea
              className=" bg-white rounded-lg rounded-b-none w-full p-3 focus:outline-dotted focus:outline-2 outline-weight4 text-[1.2rem] "
              ref={contentRef}
              rows={5}
              placeholder="writing..."
            ></textarea>
            {link && (
              <Link
                className=" bg-white rounded-md w-full p-1 text-center"
                href={link}
              >
                Link: {link}
              </Link>
            )}
            <div className=" grid grid-cols-8 gap-1">
              <svg
                onClick={() => inputImageRef.current.click()}
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="#a39789"
                className="bi bi-file-earmark-image cursor-pointer hover:opacity-80 transition-all"
                viewBox="0 0 16 16"
              >
                <path d="M6.502 7a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
                <path d="M14 14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zM4 1a1 1 0 0 0-1 1v10l2.224-2.224a.5.5 0 0 1 .61-.075L8 11l2.157-3.02a.5.5 0 0 1 .76-.063L13 10V4.5h-2A1.5 1.5 0 0 1 9.5 3V1z" />
              </svg>
              <input
                ref={inputImageRef}
                className=" hidden"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const reader = new FileReader();
                  const file = e.target.files![0];
                  reader.readAsDataURL(file);
                  reader.onloadend = () => {
                    setBase64(reader.result as string);
                  };
                }}
                type="file"
              />
              <svg
                onClick={() => setLink(prompt("Insert your link...")!)}
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="#a39789"
                className="bi bi-link-45deg cursor-pointer hover:opacity-80 transition-all"
                viewBox="0 0 16 16"
              >
                <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1 1 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z" />
                <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z" />
              </svg>
              <MoodTab mood={mood} setMood={setMood} />
              <svg
                onClick={clear}
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="#a39789"
                className="bi bi-x-circle-fill cursor-pointer hover:opacity-80 transition-all"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
              </svg>
            </div>

            <button
              className=" bg-weight4 w-full p-2 rounded-lg rounded-t-none cursor-pointer hover:opacity-80 transition-all"
              onClick={async () => await sendData()}
            >
              Save
            </button>
          </div>
        </div>
      </section>
      <article className=" flex flex-col gap-2 mb-12">
        {diaries.map((item: any) => (
          <DiaryItem
            key={item.clientTimestamp}
            diaryDocument={item}
            setDelete_id={setDelete_id}
          />
        ))}
      </article>
      <nav className=" fixed bottom-0 flex left-1/2 -translate-x-1/2 w-full max-w-[25rem] h-14 justify-around items-center bg-[#bfac97ee] backdrop-blur-md">
        <svg
          onClick={() => linkRef.current.click()}
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="21"
          fill="currentColor"
          className="bi bi-house cursor-pointer"
          viewBox="0 0 16 16"
        >
          <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
        </svg>
        <Link className=" hidden" href="#" ref={linkRef}></Link>
        <svg
          onClick={() => {
            setHiddenPopup((prev) => !prev);
            linkRef.current.click();
          }}
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="21"
          fill="currentColor"
          className="bi bi-plus-square-dotted cursor-pointer"
          viewBox="0 0 16 16"
        >
          <path d="M2.5 0q-.25 0-.487.048l.194.98A1.5 1.5 0 0 1 2.5 1h.458V0zm2.292 0h-.917v1h.917zm1.833 0h-.917v1h.917zm1.833 0h-.916v1h.916zm1.834 0h-.917v1h.917zm1.833 0h-.917v1h.917zM13.5 0h-.458v1h.458q.151 0 .293.029l.194-.981A2.5 2.5 0 0 0 13.5 0m2.079 1.11a2.5 2.5 0 0 0-.69-.689l-.556.831q.248.167.415.415l.83-.556zM1.11.421a2.5 2.5 0 0 0-.689.69l.831.556c.11-.164.251-.305.415-.415zM16 2.5q0-.25-.048-.487l-.98.194q.027.141.028.293v.458h1zM.048 2.013A2.5 2.5 0 0 0 0 2.5v.458h1V2.5q0-.151.029-.293zM0 3.875v.917h1v-.917zm16 .917v-.917h-1v.917zM0 5.708v.917h1v-.917zm16 .917v-.917h-1v.917zM0 7.542v.916h1v-.916zm15 .916h1v-.916h-1zM0 9.375v.917h1v-.917zm16 .917v-.917h-1v.917zm-16 .916v.917h1v-.917zm16 .917v-.917h-1v.917zm-16 .917v.458q0 .25.048.487l.98-.194A1.5 1.5 0 0 1 1 13.5v-.458zm16 .458v-.458h-1v.458q0 .151-.029.293l.981.194Q16 13.75 16 13.5M.421 14.89c.183.272.417.506.69.689l.556-.831a1.5 1.5 0 0 1-.415-.415zm14.469.689c.272-.183.506-.417.689-.69l-.831-.556c-.11.164-.251.305-.415.415l.556.83zm-12.877.373Q2.25 16 2.5 16h.458v-1H2.5q-.151 0-.293-.029zM13.5 16q.25 0 .487-.048l-.194-.98A1.5 1.5 0 0 1 13.5 15h-.458v1zm-9.625 0h.917v-1h-.917zm1.833 0h.917v-1h-.917zm1.834-1v1h.916v-1zm1.833 1h.917v-1h-.917zm1.833 0h.917v-1h-.917zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="21"
          fill="currentColor"
          className="bi bi-stars cursor-pointer"
          viewBox="0 0 16 16"
        >
          <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.73 1.73 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.73 1.73 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.73 1.73 0 0 0 3.407 2.31zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z" />
        </svg>
        <svg
          onClick={() => {
            !popupFilter
              ? setPopupFilter(
                  <Filter
                    setSelfState={setPopupFilter}
                    diaries={storage}
                    setDiaries={setDiaries}
                  />
                )
              : setPopupFilter(null);
          }}
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="21"
          fill="currentColor"
          className="bi bi-filter cursor-pointer"
          viewBox="0 0 16 16"
        >
          <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5" />
        </svg>
      </nav>
      <div
        className={
          popupFilter
            ? " fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[25rem] h-full "
            : "hidden"
        }
      >
        {popupFilter}
      </div>
    </div>
  );
}

const getDateAndTime = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const day = currentDate.getDate();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();
  const dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
    currentDate.getDay()
  ];
  const monthName = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ][month];
  return {
    date: `${dayName} ${day} ${monthName} ${year}`,
    time: `${hours}:${minutes}:${seconds}`,
  };
};
