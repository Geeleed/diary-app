import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { updateThenGetDiary } from "./actions";
import InputPadTab from "./InputPadTab";
import DateTimePad from "./DateTimePad";
import { md5 } from "../utils/md5";

interface Props {
  setSelfState: any;
  edit_id: any;
  storage: any;
  setStorage: any;
}

function EditingFrom({ setSelfState, edit_id, setStorage, storage }: Props) {
  const docs = storage.filter((item: any) => item._id === edit_id)[0];
  const contentRef = useRef<any>(null);
  const inputImageRef = useRef<any>(null);
  const [datetime, setDatetime] = useState<number>(docs.editAt);
  let docs_image: string,
    docs_mood: string,
    docs_link: string,
    docs_content: string;
  try {
    docs_content = docs.content;
    docs_image = docs.image;
    docs_mood = docs.mood;
    docs_link = docs.link;
  } catch (error) {
    docs_content = "";
    docs_image = "";
    docs_mood = "";
    docs_link = "";
  }
  const [content, setContent] = useState<string>(docs_content);
  const [base64, setBase64] = useState<string>(docs_image);
  const [mood, setMood] = useState<string>(docs_mood);
  const [link, setLink] = useState<string>(docs_link);
  const clear = () => {
    setBase64("");
    inputImageRef.current.value = "";
    contentRef.current.value = "";
    setMood("");
    setLink("");
  };
  const makeObjectData = async () => {
    const content = contentRef.current?.value;
    const objectData = {
      edit_id: edit_id,
      content: content,
      image: base64,
      link: link,
      mood: mood,
      editAt: datetime,
      preId: docs.preId,
    };
    const preId: string = md5(JSON.stringify(objectData));
    objectData.preId = preId;
    clear();
    return objectData;
  };
  const sendData = async () => {
    if (contentRef.current?.value || base64) {
      const updatedDoc = await updateThenGetDiary(await makeObjectData());
      setStorage((prev: any) => [
        JSON.parse(updatedDoc)[0],
        ...prev.filter((item: any) => item._id !== edit_id),
      ]);
      setSelfState(null);
    } else alert("write something...");
  };
  useEffect(() => {
    contentRef.current.value = content;
  }, []);
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
          <p className=" break-words w-full text-left">{link}</p>
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
      <DateTimePad datetime={datetime} setDatetime={setDatetime} />
      <button
        className=" bg-weight4 w-full p-2 text-[1.5rem] rounded-lg rounded-t-none cursor-pointer hover:opacity-80 transition-all"
        onClick={async () => await sendData()}
      >
        Update
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

export default EditingFrom;
