"use client";
import React, { useEffect, useRef, useState } from "react";
import { addDiary, getDiary, getUsernameFromToken, logout } from "./actions";
import Link from "next/link";

function Mydiary() {
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
    (async () => await getDiary().then((res) => setDiaries(res.reverse())))();
  }, []);
  return (
    <div className=" flex flex-col px-5">
      {/* <nav className=" flex flex-col items-center sticky top-0 bg-[#00000000]"> */}
      <nav className=" w-full grid grid-cols-4 grid-rows-2 gap-1 py-3 sticky top-0">
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
          {hiddenPopup ? "Add diary" : "close"}
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
          <DiaryItem key={index} diaryDocument={item} />
        ))}
      </article>
    </div>
  );
}

export default Mydiary;

const DiaryItem = ({ diaryDocument }: any) => {
  const { dayName, day, month, year, content, hh, mm } = diaryDocument;
  return (
    <section className=" border-b-2 border-weight4 border-dotted rounded-xl w-full p-3 bg-white">
      <h3 className=" bg-white mb-1">
        {dayName} {day} {month} {year} --- {hh}:{mm}
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
