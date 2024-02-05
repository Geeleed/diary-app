import React, { ChangeEvent } from "react";
import MoodTab from "./MoodTab";

function InputPadTab({
  base64,
  setBase64,
  inputImageRef,
  link,
  setLink,
  mood,
  setMood,
}: any) {
  return (
    <>
      <svg
        onClick={() => (base64 ? setBase64("") : inputImageRef.current.click())}
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        fill={base64 ? "#060846" : "#a39789"}
        className="bi bi-camera cursor-pointer hover:opacity-80 transition-all "
        viewBox="0 0 16 16"
      >
        <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4z" />
        <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5m0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0" />
      </svg>
      <input
        ref={inputImageRef}
        className=" hidden"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          if (e.target.files![0].size > 4000000) {
            alert("file size limit 4 MB");
          } else {
            const reader = new FileReader();
            const file = e.target.files![0];
            reader.readAsDataURL(file);
            reader.onloadend = () => {
              setBase64(reader.result as string);
            };
          }
        }}
        type="file"
        accept="image/*"
      />
      <svg
        onClick={() =>
          link ? setLink("") : setLink(prompt("Insert your link...")!)
        }
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        fill={link ? "#060846" : "#a39789"}
        className="bi bi-link-45deg cursor-pointer hover:opacity-80 transition-all"
        viewBox="0 0 16 16"
      >
        <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1 1 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z" />
        <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z" />
      </svg>
      <MoodTab mood={mood} setMood={setMood} />
    </>
  );
}

export default InputPadTab;
