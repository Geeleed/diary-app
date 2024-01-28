"use client";
import React, { useRef, useState } from "react";
import { checkPattern, loginProcess, registerProcess } from "./actions";
import { hash256 } from "../utils/hash256";
import { useRouter } from "next/navigation";

function Home() {
  const router = useRouter();
  const usernameRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);
  const [showHelp, setShowHelp] = useState(false);

  const getUserPass = () => {
    const username = usernameRef.current.value;
    const password = hash256(username + passwordRef.current.value);
    return { username, password };
  };

  const login = async () => {
    const { username } = getUserPass();
    const pattern = await checkPattern(username).then((result) => result);
    if (username && passwordRef.current.value && pattern) {
      const res = await loginProcess(getUserPass()).then((res) => res);
      res?.canLogin
        ? router.push("/mydiary")
        : alert("username or password wrong!");
    } else alert("username or password wrong!");
  };

  const register = async () => {
    const { username } = getUserPass();
    const pattern = await checkPattern(username).then((result) => result);
    !pattern && alert("username must be a-z or A-Z or 0-9 or - or _");
    if (username && passwordRef.current.value && pattern) {
      const res = await registerProcess(getUserPass());
      if (res?.canRegister) {
        alert("register success!");
        router.push("/mydiary");
      } else alert("user already exists!");
    }
  };

  return (
    <div className=" flex flex-col justify-center items-center gap-3 m-5 rounded-lg p-3">
      <h1 className=" text-[7rem] my-10">Diary</h1>
      <input
        className=" p-3 rounded-lg w-full outline-weight4 bg-white focus:outline-dotted outline-2 "
        onKeyDown={(e) => e.key === "Enter" && login()}
        ref={usernameRef}
        type="text"
        placeholder="username"
      />
      <input
        className=" p-3 rounded-lg w-full outline-weight4 bg-white focus:outline-dotted outline-2 "
        onKeyDown={(e) => e.key === "Enter" && login()}
        ref={passwordRef}
        type="password"
        placeholder="password"
      />
      <button className=" bg-weight4 w-full p-2 rounded-lg" onClick={login}>
        Log in
      </button>
      <button className=" bg-weight2 w-full p-2 rounded-lg" onClick={register}>
        Register
      </button>
      <p className=" cursor-pointer" onClick={() => setShowHelp(true)}>
        Help
      </p>
      <div
        onClick={() => setShowHelp(false)}
        className={`${
          showHelp
            ? " cursor-pointer absolute top-0 left-0 w-full h-[100vh] flex flex-col justify-center items-center bg-[#000000aa] text-white"
            : "hidden"
        }`}
      >
        <p className=" bg-[#00000000] text-[2rem]">
          บันทึกเรื่องราวต่าง ๆ ในชีวิต
        </p>
        <p className=" bg-[#00000000] text-[1rem]">Diary v.1.0.0 by Geeleed</p>
      </div>
    </div>
  );
}

export default Home;
