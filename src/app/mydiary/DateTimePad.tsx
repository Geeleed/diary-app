import React, { useEffect, useRef, useState } from "react";

function DateTimePad({ datetime, setDatetime }: any) {
  const inputRef = useRef<any>();
  const [inputState, setInputState] = useState(false);
  const [btnState, setBtnState] = useState(false);
  const [save, setSave] = useState<number>(datetime);
  //   useEffect(() => {
  //     setDatetime((prev: number) => setSave(prev));
  //   }, []);
  useEffect(() => {
    if (btnState) {
      setDatetime(
        new Date().getTime() - new Date().getTimezoneOffset() * 60000
      );
    } else if (inputRef.current.valueAsNumber) {
      setDatetime(inputRef.current.valueAsNumber);
    } else {
      setDatetime(save);
    }
  }, [inputState, btnState]);
  return (
    <div className=" flex justify-between w-full items-center">
      <input
        ref={inputRef}
        className="p-3 rounded-lg w-[60%]"
        onChange={() => {
          setInputState((prev) => !prev);
        }}
        type="datetime-local"
      />
      <p className=" text-[1.4rem] w-[10]">or</p>
      <button
        className={
          (!btnState
            ? " bg-weight3 border-2 border-dotted"
            : " bg-weight5 text-white") +
          " w-[30%] rounded-lg p-2 px-4 text-[1.3rem]"
        }
        onClick={() => {
          setBtnState((prev) => !prev);
        }}
      >
        Now
      </button>
    </div>
  );
}

export default DateTimePad;
