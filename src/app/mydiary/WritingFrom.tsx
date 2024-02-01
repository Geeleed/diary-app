import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { addThenGetLatestDiary } from "./actions";
import InputPadTab from "./InputPadTab";
import DateTimePad from "./DateTimePad";
import { md5 } from "../utils/md5";

interface Props {
  setSelfState: any;
  username: string;
  setStorage: any;
}

function WritingFrom({ setSelfState, username, setStorage }: Props) {
  const contentRef = useRef<any>(null);
  const inputImageRef = useRef<any>(null);
  const [base64, setBase64] = useState<string>();
  const [mood, setMood] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [datetime, setDatetime] = useState<number>(
    new Date().getTime() - new Date().getTimezoneOffset() * 60000
  );
  // const [selectDatetime, setSelectDatetime] = useState(false);
  const clear = () => {
    setBase64("");
    inputImageRef.current.value = "";
    contentRef.current.value = "";
    setMood("");
    setLink("");
  };
  const makeObjectData = async () => {
    const content = contentRef.current?.value;
    const now = new Date(datetime);
    const objectData = {
      free: "",
      username: username,
      content: content,
      image: base64,
      link: link,
      mood: mood,
      editAt: datetime,
      createAt: datetime,
      timezoneOffset: now.getTimezoneOffset(),
      timestamp: now.getTime() - now.getTimezoneOffset() * 60000,
      clientTimestamp: now.getTime(), //UTC
      preId: "",
    };
    const preId: string = md5(JSON.stringify(objectData));
    objectData.preId = preId;
    clear();
    return objectData;
  };
  const sendData = async () => {
    if (contentRef.current?.value || base64) {
      const dataObject = await makeObjectData().then((res) => res);
      const latestDoc = await addThenGetLatestDiary(dataObject).then(
        (res) => res
      );
      setStorage((prev: any) => [JSON.parse(latestDoc)[0], ...prev]);
      setSelfState(null);
    } else alert("write something...");
  };
  return (
    <div className=" bg-weight3 flex flex-col justify-center items-center rounded-lg gap-2 p-3">
      <p className=" text-[1.3rem]">How are you?</p>
      <p>{new Date(datetime).toUTCString()}</p>
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
        rows={8}
        placeholder="writing..."
      ></textarea>
      {link && (
        <Link
          className=" bg-white rounded-md w-full p-1 text-center flex justify-center items-center"
          href={link}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            fill="#a39789"
            className="bi bi-link-45deg cursor-pointer hover:opacity-80 transition-all"
            viewBox="0 0 16 16"
          >
            <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1 1 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z" />
            <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z" />
          </svg>
          {link}
        </Link>
      )}
      <div className=" grid grid-cols-8 gap-1">
        <InputPadTab
          base64={base64}
          setBase64={setBase64}
          inputImageRef={inputImageRef}
          link={link}
          setLink={setLink}
          mood={mood}
          setMood={setMood}
        />
        <svg
          onClick={() => clear()}
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
      {/* <div className=" flex justify-between w-full">
        <input
          onChange={(e) => {
            setDatetime(e.target.valueAsNumber);
            setSelectDatetime(true);
          }}
          type="datetime-local"
        />
        or
        <button
          className={selectDatetime ? " bg-weight2" : " bg-weight4"}
          onClick={() => {
            setDatetime(new Date().getTime());
            setSelectDatetime(false);
          }}
        >
          Now
        </button>
      </div> */}
      <DateTimePad
        datetime={datetime}
        setDatetime={setDatetime}
        // selectDatetime={selectDatetime}
        // setSelectDatetime={setSelectDatetime}
      />

      <button
        className=" bg-weight4 w-full p-2 text-[1.5rem] rounded-lg rounded-t-none cursor-pointer hover:opacity-80 transition-all"
        onClick={async () => await sendData()}
      >
        Save
      </button>
      <button
        className=" cursor-pointer border-2 border-dotted rounded-lg p-3 w-full"
        onClick={() => setSelfState(null)}
      >
        Close
      </button>
    </div>
  );
}

export default WritingFrom;
