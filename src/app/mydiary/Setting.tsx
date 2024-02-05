"use client";
import React, { useEffect, useRef } from "react";
import {
  deleteAccount,
  getBirthDate,
  logout,
  setNewBirthDate,
  setNewPassword,
} from "./actions";

interface Props {
  setSelfState: any;
}

function Setting({ setSelfState }: Props) {
  const birthDateRef = useRef<any>(null);
  useEffect(() => {
    (async () => {
      if (birthDateRef.current) {
        birthDateRef.current.value = await getBirthDate();
      }
    })();
  }, []);
  return (
    <div className=" absolute left-1/2 -translate-x-1/2 max-w-[25rem] w-full h-full">
      <div className=" p-5 flex flex-col gap-2 bg-weight4 bg-opacity-50 h-full backdrop-blur-md">
        <h1 className=" text-[2rem] w-full text-center">Setting</h1>
        <div>Set Birthdate</div>
        <input
          onChange={async (e) => await setNewBirthDate(e.target.value)}
          ref={birthDateRef}
          type="date"
          className=" w-full p-2 rounded-lg outline-none"
        />
        <button
          onClick={async () => {
            try {
              const newPassword = prompt("New your password");
              const confirmNewPassword = prompt("Confirm new your password");
              const cf: boolean = confirm("Confirm");
              if (newPassword === confirmNewPassword && newPassword && cf) {
                alert(await setNewPassword(newPassword!).then((res) => res));
              } else {
                alert("Passwords do not match or empty.");
              }
            } catch (error) {
              console.log(error);
            }
          }}
          className=" border-2 border-dotted border-black w-full p-2 rounded-lg"
        >
          Reset password
        </button>
        <button
          onClick={async () => {
            await logout();
          }}
          className=" border-2 border-dotted border-black w-full p-2 rounded-lg"
        >
          Log out
        </button>
        <button
          onClick={async () => {
            if (confirm("Are you sure to delete this account?")) {
              await deleteAccount(prompt("password of this account") as string);
            }
          }}
          className=" border-2 border-dotted border-black w-full p-2 rounded-lg"
        >
          Delete account
        </button>
        <button
          onClick={() => setSelfState(null)}
          className=" border-2 border-dotted border-black w-full p-2 rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default Setting;
