"use client";
import React, { useEffect, useState } from "react";
import { deleteDocumentBy_id } from "./actions";
import {
  MoodAngry,
  MoodBroke,
  MoodHappy,
  MoodNormal,
  MoodUndefined,
  MoodUpset,
} from "./MoodTab";
import DiaryContent from "./DiaryContent";
import EditingFrom from "./EditingForm";

export const DiaryItem = ({
  diaryDocument,
  setDelete_id,
  setPopupEditingForm,
  storage,
  setStorage,
}: any) => {
  const [moodIcon, setMoodIcon] = useState<React.JSX.Element>(
    <MoodNormal mood={diaryDocument.mood} />
  );
  const deleteData = async () => {
    if (confirm("Are you sure?  This action cannot be undone.")) {
      await deleteDocumentBy_id(diaryDocument._id);
      setDelete_id(diaryDocument._id);
    }
  };
  const editData = (_id: any) => {
    setPopupEditingForm(
      <EditingFrom
        setSelfState={setPopupEditingForm}
        edit_id={diaryDocument._id}
        storage={storage}
        setStorage={setStorage}
      />
    );
  };

  useEffect(() => {
    if (diaryDocument.mood === "happy") {
      setMoodIcon(<MoodHappy mood={diaryDocument.mood} />);
    } else if (diaryDocument.mood === "normal") {
      setMoodIcon(<MoodNormal mood={diaryDocument.mood} />);
    } else if (diaryDocument.mood === "") {
      setMoodIcon(<MoodUndefined mood={diaryDocument.mood} />);
    } else if (diaryDocument.mood === "upset") {
      setMoodIcon(<MoodUpset mood={diaryDocument.mood} />);
    } else if (diaryDocument.mood === "angry") {
      setMoodIcon(<MoodAngry mood={diaryDocument.mood} />);
    } else if (diaryDocument.mood === "broke") {
      setMoodIcon(<MoodBroke mood={diaryDocument.mood} />);
    }
  }, []);
  const dt = new Date(diaryDocument.editAt);
  return (
    <section
      className={`border-b-2 border-weight4 border-dotted rounded-xl w-full p-3 bg-white`}
    >
      <h3 className="  mb-1 flex justify-between items-center">
        {moodIcon}
        <p className=" flex justify-center items-center">
          {dayName(dt.getUTCDay())} {dt.getUTCDate()}{" "}
          {monthName(dt.getUTCMonth())} {dt.getUTCFullYear()} ---{" "}
          {dt.getUTCHours()}:{dt.getUTCMinutes()}
        </p>
        <div className=" flex gap-1">
          <svg
            onClick={() => alert("coming soon.")}
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="#a39789"
            className="bi bi-stars cursor-pointer"
            viewBox="0 0 16 16"
          >
            <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.73 1.73 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.73 1.73 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.73 1.73 0 0 0 3.407 2.31zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z" />
          </svg>
          <svg
            onClick={() => editData(diaryDocument._id)}
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="#a39789"
            className="bi bi-pen cursor-pointer"
            viewBox="0 0 16 16"
          >
            <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z" />
          </svg>
          <svg
            onClick={async () => await deleteData()}
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="#a39789"
            className="bi bi-x-circle cursor-pointer"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
          </svg>
        </div>
      </h3>
      <DiaryContent
        image={diaryDocument.image as string}
        content={diaryDocument.content as string}
        link={diaryDocument.link as string}
      />
    </section>
  );
};

const dayName = (getDay: number) =>
  ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][getDay];
const monthName = (getMonth: number) =>
  [
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
  ][getMonth];
