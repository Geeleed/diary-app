"use client";
import React, { useState } from "react";
import MoodTab from "./MoodTab";

// import { filter } from "./actions";

function Filter({ setSelfState, diaries, setDiaries }: any) {
  const [dateFrom, setDateFrom] = useState<number>();
  const [dateTo, setDateTo] = useState<number>();
  const [mood, setMood] = useState();
  const [isSort, setIsSort] = useState(true);

  // Filter in server
  //   const handleSubmit = async () => {
  //     setDiaries(JSON.parse(await filter({ dateFrom, dateTo, mood })));
  //   };

  // Filter in client
  const filter = (param: any) => {
    let { dateFrom, dateTo, mood } = param;
    if (!dateFrom) dateFrom = 0;
    if (!dateTo) dateTo = new Date().getTime();
    if (!mood) mood = undefined;
    let result = [];
    if (mood)
      result = diaries
        .filter((i: any) => i.mood === mood)
        .filter((i: any) => dateFrom <= i.clientTimestamp <= dateTo);
    else
      result = diaries.filter(
        (i: any) => dateFrom <= i.clientTimestamp <= dateTo
      );
    return result;
  };

  const handleSubmit = () =>
    setDiaries(
      isSort
        ? filter({ dateFrom, dateTo, mood }).sort(
            (a: any, b: any) => a.clientTimestamp - b.clientTimestamp
          )
        : filter({ dateFrom, dateTo, mood }).sort(
            (a: any, b: any) => b.clientTimestamp - a.clientTimestamp
          )
    );
  return (
    <>
      <div className=" bg-weight4 bg-opacity-50 p-10 backdrop-blur-md flex flex-col gap-3 h-full">
        <h2>Filter</h2>
        <div className="flex gap-2 justify-between">
          <div className="flex flex-col w-full">
            Date From:
            <input
              className=" p-2 rounded-lg focus:outline-dotted outline-2 outline-weight5"
              type="date"
              onChange={(e) => setDateFrom(e.target.valueAsNumber)}
            />
          </div>
          <div className="flex flex-col w-full">
            To
            <input
              className=" p-2 rounded-lg focus:outline-dotted outline-2 outline-weight5"
              type="date"
              onChange={(e) => setDateTo(e.target.valueAsNumber)}
            />
          </div>
        </div>
        <div className=" flex gap-3 justify-start items-center">
          Sort:
          <button
            onClick={() => setIsSort(true)}
            className={
              "p-2 rounded-full w-14 h-10 flex justify-center items-center" +
              (isSort ? " bg-weight1 font-bold" : " border-2 border-dotted")
            }
          >
            A-Z
          </button>
          <button
            onClick={() => setIsSort(false)}
            className={
              "p-2 rounded-full w-14 h-10 flex justify-center items-center" +
              (!isSort ? " bg-weight1 font-bold" : " border-2 border-dotted")
            }
          >
            Z-A
          </button>
        </div>
        <div className="flex gap-2 justify-between items-center">
          Mood:
          <MoodTab mood={mood} setMood={setMood} />
        </div>
        <button
          onClick={() => {
            handleSubmit();
            setSelfState(null);
          }}
          className=" bg-weight5 p-2 rounded-lg cursor-pointer"
        >
          Submit
        </button>
        <button
          className=" mt-5 cursor-pointer"
          onClick={() => setSelfState(null)}
        >
          Close
        </button>
      </div>
    </>
  );
}

export default Filter;
