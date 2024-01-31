"use client";
import React, { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { deleteDocumentBy_id } from "./actions";
import {
  MoodAngry,
  MoodBroke,
  MoodHappy,
  MoodNormal,
  MoodUpset,
} from "./MoodTab";
import DiaryContent from "./DiaryContent";

export const DiaryItem = ({ diaryDocument, setDelete_id }: any) => {
  const { dayName, day, month, year, content, image, hh, mm, _id, mood, link } =
    diaryDocument;
  const [moodIcon, setMoodIcon] = useState<React.JSX.Element>(
    <MoodNormal mood={mood} />
  );
  const deleteData = async () => {
    if (confirm("Are you sure?")) {
      await deleteDocumentBy_id(_id);
      setDelete_id(_id);
    }
  };

  useEffect(() => {
    if (mood === "happy") {
      setMoodIcon(<MoodHappy mood={mood} />);
    } else if (mood === "normal") {
      setMoodIcon(<MoodNormal mood={mood} />);
    } else if (mood === "upset") {
      setMoodIcon(<MoodUpset mood={mood} />);
    } else if (mood === "angry") {
      setMoodIcon(<MoodAngry mood={mood} />);
    } else if (mood === "broke") {
      setMoodIcon(<MoodBroke mood={mood} />);
    }
  }, []);
  return (
    <section
      className={`border-b-2 border-weight4 border-dotted rounded-xl w-full p-3 bg-white`}
    >
      <h3 className="  mb-1 flex justify-between">
        {moodIcon}
        <p>
          {dayName} {day} {month} {year} --- {hh}:{mm}
        </p>
        <div className=" flex gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="#a39789"
            className="bi bi-pen"
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
      {/* <Suspense fallback={<>Loading...</>}> */}
      <DiaryContent
        image={image as string}
        content={content as string}
        link={link as string}
      />
      {/* </Suspense> */}
    </section>
  );
};
