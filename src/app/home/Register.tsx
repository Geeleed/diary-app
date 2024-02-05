"use client";
import React, { useRef, useState } from "react";
import { checkPattern, registerProcess } from "./actions";
import { hash256 } from "../utils/hash256";
import { useRouter } from "next/navigation";

function Register(): React.JSX.Element {
  const router = useRouter();
  const usernameRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);
  const dateRef = useRef<any>(null);
  const [loading, setLoading] = useState(false);

  const getUserPassBirth = () => {
    const username: string = usernameRef.current.value;
    const password: string = hash256(username + passwordRef.current.value);
    const birthDate: string = dateRef.current.value;
    return { username, password, birthDate };
  };

  const register = async () => {
    setLoading(true);
    const { username } = getUserPassBirth();
    if (!username || !passwordRef.current.value) {
      usernameRef.current.focus();
    } else {
      const pattern = await checkPattern(username).then((result) => result);
      !pattern &&
        alert("username must be a-z or 0-9 or - or _ or . 4-10 letters");
      if (
        username &&
        passwordRef.current.value &&
        pattern &&
        dateRef.current.value
      ) {
        console.log(username);
        const res = await registerProcess(getUserPassBirth());
        if (res?.canRegister) {
          alert("register success!");
          router.push("/mydiary");
        } else alert("user already exists!");
      }
    }
    setLoading(false);
  };

  return (
    <div className=" flex flex-col justify-center items-center gap-3 rounded-lg p-3 w-full">
      <h1 className=" text-[4rem] my-10">Register</h1>
      <input
        className=" p-3 rounded-lg w-full outline-weight4 bg-white focus:outline-dotted outline-2 "
        onKeyDown={(e) => e.key === "Enter" && register()}
        ref={usernameRef}
        type="text"
        placeholder="username"
      />
      <input
        className=" p-3 rounded-lg w-full outline-weight4 bg-white focus:outline-dotted outline-2 "
        onKeyDown={(e) => e.key === "Enter" && register()}
        ref={passwordRef}
        type="password"
        placeholder="password"
      />
      <div className="flex justify-between items-center w-full">
        <label className=" w-full">Your birth day:</label>
        <input
          className=" p-2 rounded-lg w-full outline-weight4 bg-white focus:outline-dotted outline-2 text-black "
          ref={dateRef}
          type="date"
        />
      </div>
      <button
        className={
          (loading && " animate-ping") + " bg-weight3 w-full p-2 rounded-lg"
        }
        onClick={register}
      >
        Register
      </button>
    </div>
  );
}

export default Register;
