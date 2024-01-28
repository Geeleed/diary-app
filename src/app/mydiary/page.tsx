"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  addDiary,
  deleteDocumentBy_id,
  getDiary,
  getUsernameFromToken,
  logout,
} from "./actions";
import Link from "next/link";

function Mydiary() {
  const [delete_id, setDelete_id] = useState(null);
  const contentRef = useRef<any>(null);
  const [username, setUsername] = useState("");
  const [diaries, setDiaries] = useState<any>([]);
  const [hiddenPopup, setHiddenPopup] = useState(true);
  const makeObjectData = async () => {
    const now = new Date();
    const objectData = {
      hidden: false,
      username: username,
      content: contentRef.current?.value,
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
    return objectData;
  };
  const sendData = async () => {
    if (contentRef.current?.value) {
      await addDiary(await makeObjectData());
      window.location.reload();
    } else alert("write something...");
  };
  useEffect(() => {
    (async () =>
      await getUsernameFromToken().then((res) => setUsername(res)))();
    (async () =>
      await getDiary().then((res) => setDiaries(JSON.parse(res).reverse())))();
  }, []);
  useEffect(() => {
    setDiaries(diaries.filter((item: any) => item._id !== delete_id));
  }, [delete_id]);
  return (
    <div className=" flex flex-col px-5 my-5 w-[25rem]">
      <nav className=" w-full grid grid-cols-4 grid-rows-2 gap-2 py-3 sticky top-0">
        <Link href={"#"} className=" col-span-3 font-bold text-[2rem]">
          {username}
          {"'s diary"}
        </Link>
        <button
          className=" bg-white rounded-lg cursor-pointer"
          onClick={async () => await logout()}
        >
          Log out
        </button>
        <h1 className=" col-span-3 text-[1.5rem]">{getDateAndTime().date}</h1>
        <button
          className=" bg-weight4 rounded-lg cursor-pointer"
          onClick={() => setHiddenPopup((prev) => !prev)}
        >
          {hiddenPopup ? "Add diary" : "Close"}
        </button>
      </nav>
      <section>
        <div className={` ${hiddenPopup && "hidden"}`}>
          <div className=" bg-weight3 my-2 flex flex-col justify-center items-center rounded-lg gap-2 p-3">
            <textarea
              className=" bg-white rounded-lg rounded-b-none w-full p-3 focus:outline-dotted focus:outline-2 outline-weight4 text-[1.2rem] "
              ref={contentRef}
              rows={10}
              placeholder="writing..."
            ></textarea>
            <button
              className=" bg-weight4 w-full p-2 rounded-lg rounded-t-none"
              onClick={async () => await sendData()}
            >
              Save
            </button>
          </div>
        </div>
      </section>
      <article className=" flex flex-col gap-2 mt-5">
        {diaries.map((item: any, index: number) => (
          <DiaryItem
            key={index}
            diaryDocument={item}
            setDelete_id={setDelete_id}
          />
        ))}
      </article>
    </div>
  );
}

export default Mydiary;

const DiaryItem = ({ diaryDocument, setDelete_id }: any) => {
  const { dayName, day, month, year, content, hh, mm, _id } = diaryDocument;
  const deleteData = async () => {
    if (confirm("Are you sure?")) {
      await deleteDocumentBy_id(_id);
      setDelete_id(_id);
    }
  };
  return (
    <section className=" border-b-2 border-weight4 border-dotted rounded-xl w-full p-3 bg-white">
      <h3 className=" bg-white mb-1 flex justify-between">
        <p className=" bg-white">
          {dayName} {day} {month} {year} --- {hh}:{mm}
        </p>
        <svg
          onClick={async () => await deleteData()}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="#a39789"
          className="bi bi-x-circle cursor-pointer bg-white"
          viewBox="0 0 16 16"
        >
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
        </svg>
      </h3>
      <p className=" bg-white w-full break-words">{content}</p>
    </section>
  );
};

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
