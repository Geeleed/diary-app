"use client";
import React, { useRef } from "react";
import { checkPattern, registerProcess, resetProcess } from "./actions";
import { hash256 } from "../utils/hash256";
import { useRouter } from "next/navigation";

function Forgot(props: any): React.JSX.Element {
  const router = useRouter();
  const usernameRef = useRef<any>(null);
  const dateRef = useRef<any>(null);

  const getUserBirth = () => {
    const username: string = usernameRef.current.value;
    const birthDate: string = dateRef.current.value;
    return { username, birthDate };
  };

  const reset = async () => {
    const { username, birthDate } = getUserBirth();
    if (!username || !dateRef.current.value) {
      usernameRef.current.focus();
    } else {
      const pattern = await checkPattern(username).then((result) => result);
      !pattern &&
        alert("username must be a-z or 0-9 or - or _ or . 4-10 letters");
      if (username && pattern && dateRef.current.value) {
        const newPass = prompt("your new password") as string;
        const confirmNewPass = prompt("confirm your new password") as string;
        if (newPass === confirmNewPass) {
          const hashPassword = hash256(username + newPass);
          const res = await resetProcess({
            username,
            password: hashPassword,
            birthDate,
          });
          if (res?.canReset) {
            alert("reset password success!");
            router.push("/mydiary");
          } else alert("password wrong!");
        }
      }
    }
  };

  return (
    <div className=" flex flex-col justify-center items-center gap-3 rounded-lg p-14 absolute bg-[#000000aa] top-1/2 -translate-y-1/2 z-10 backdrop-blur-sm">
      <h1 className=" text-[2rem] text-white">Reset password</h1>
      <input
        className=" p-3 rounded-lg w-full outline-weight4 bg-white focus:outline-dotted outline-2 "
        onKeyDown={(e) => e.key === "Enter" && reset()}
        ref={usernameRef}
        type="text"
        placeholder="username"
      />
      <label className=" w-full text-white">Your birth day:</label>
      <input
        className=" p-2 rounded-lg w-full outline-weight4 bg-white focus:outline-dotted outline-2 text-black "
        ref={dateRef}
        type="date"
      />
      <button className=" bg-weight3 w-full p-2 rounded-lg" onClick={reset}>
        Reset password
      </button>
      <p className=" text-white" onClick={() => props.setResetPass(false)}>
        Close
      </p>
    </div>
  );
}

export default Forgot;
