"use client";
import React, { SetStateAction, useRef, useState } from "react";
import { checkPattern, loginProcess } from "./actions";
import { hash256 } from "../utils/hash256";
import { useRouter } from "next/navigation";
import Forgot from "./Forgot";

function Login(): React.JSX.Element {
  const router = useRouter();
  const usernameRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);
  const [resetPass, setResetPass] = useState<boolean>(false);

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

  return (
    <div className=" flex flex-col justify-center items-center gap-3 rounded-lg p-3 w-full">
      <h1 className=" text-[6rem] my-7">Diary</h1>
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
      <button
        className=" bg-weight4 w-full p-2 rounded-lg hover:opacity-80 transition-all"
        onClick={login}
      >
        Log in
      </button>
      <p
        className=" text-[0.8rem] cursor-pointer hover:text-weight5"
        onClick={() => setResetPass(true)}
      >
        Forgot password
      </p>
      {resetPass && <Forgot setResetPass={setResetPass} />}
    </div>
  );
}

export default Login;
