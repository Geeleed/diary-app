"use client";
import React, { useRef, useState } from "react";
import { checkPattern, loginProcess, registerProcess } from "./actions";
import { hash256 } from "../utils/hash256";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
    !pattern &&
      alert("username must be a-z or A-Z or 0-9 or - or _ 4-10 letters");
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
        <p className=" bg-[#00000000] text-[2rem] text-center px-20">
          บันทึกเรื่องราวต่าง ๆ ที่ไม่อาจลบได้ในชีวิต
        </p>
        <h1 className=" bg-[#00000000]">Diary v.1.0.0 by Geeleed</h1>
        <br />
        <Link
          href={"https://github.com/Geeleed/diary-app"}
          className=" bg-[#00000000] text-[1rem] cursor-pointer z-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            className="bi bi-github bg-[#00000000]"
            viewBox="0 0 16 16"
          >
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default Home;
