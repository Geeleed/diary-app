"use client";
import React, { useEffect, useState } from "react";

function page() {
  const [value, setValue] = useState(1);
  return (
    <>
      <div onClick={() => setValue((i: any) => i + 1)}>value = {value}</div>
      <Test setState={setValue} />
    </>
  );
}

export default page;

const Test = ({ setState }: any) => {
  const [getValue, setValue] = useState<number>();
  useEffect(() => {
    console.log(getValue);
    setState((i: number) => {
      setValue(i * i);
      return i;
    });
  });
  return (
    <>
      <p>{getValue}</p>
    </>
  );
};
