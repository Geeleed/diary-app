"use client";
import React, { useEffect, useRef, useState } from "react";
import { runGemini } from "./actions";

import MarkdownIt from "markdown-it";
import { getDiary, getUsernameFromToken } from "../mydiary/actions";
import { weekly } from "../utils/firstEffectAI";

export const runMarkdown = (markdownText: string) => {
  // สร้างตัวแปร "markdownIt" สำหรับใช้งาน
  const markdownIt = new MarkdownIt();

  // ข้อความ Markdown ที่ต้องการแปลง
  // const markdownText =
  //   "1. **ช่วยคุณจัดระเบียบความคิดและความรู้สึกของคุณ** บางครั้งการเขียนลงไปอาจง่ายกว่าการพูดออกไป การบันทึกความคิดและความรู้สึกของคุณในไดอารี่ช่วยให้คุณสามารถประมวลผลสิ่งที่เกิดขึ้นในชีวิตของคุณได้ รวมถึงช่วยให้คุณระบุรูปแบบและแนวโน้มในความคิดและพฤติกรรมของคุณ 2. **ช่วยให้คุณบรรลุเป้าหมายได้** การเขียนลงเป้าหมายของคุณสามารถช่วยให้คุณรู้สึกมุ่งมั่นและมีแรงบันดาลใจมากขึ้น ไดอารี่ของคุณสามารถเป็นที่ที่คุณบันทึกความคืบหน้าของคุณและสะท้อนถึงสิ่งที่คุณได้เรียนรู้จากความล้มเหลวของคุณ 3. **ช่วยให้คุณจัดการกับความเครียดและความวิตกกังวลได้** การเขียนเกี่ยวกับสิ่งที่ทำให้คุณเครียดหรือวิตกกังวลอาจช่วยให้คุณรู้สึกดีขึ้นได้ บางครั้งการทำให้ความคิดและความรู้สึกของคุณเป็นรูปธรรมอาจช่วยให้คุณจัดการกับสิ่งเหล่านี้ได้ง่ายขึ้น 4. **ช่วยให้คุณเก็บรักษาความทรงจำได้** ไดอารี่สามารถเป็นที่เก็บความทรงจำที่ยอดเยี่ยม ซึ่งทั้งคุณและคนที่คุณรักสามารถหวนกลับไปดูได้ในอนาคต 5. **ช่วยให้คุณเรียนรู้เพิ่มเติมเกี่ยวกับตัวคุณเองได้** การเขียนไดอารี่เป็นโอกาสที่จะได้สะท้อนถึงชีวิตของคุณและเรียนรู้เพิ่มเติมเกี่ยวกับตัวคุณเอง ความคิด ความรู้สึก และพฤติกรรมของคุณ ไดอารี่ของคุณสามารถเป็นเครื่องมือที่มีค่าในการพัฒนาตนเอง";

  // แปลง Markdown เป็น HTML
  const htmlOutput = markdownIt.render(markdownText);

  // แสดงผลลัพธ์ HTML
  console.log(htmlOutput);
  return htmlOutput;
};

function page() {
  const inputRef = useRef<any>(null);
  const [back, setBack] = useState<string>("");
  const [htmlContent, setHtmlContent] = useState("");
  const [content, setContent] = useState<any>("");
  useEffect(() => {
    setHtmlContent(runMarkdown(back));
  }, [back]);
  useEffect(() => {
    // (async () =>
    //   await getUsernameFromToken().then((res) => setUsername(res)))();
    (async () =>
      await getDiary().then((res) => {
        const data = JSON.parse(res).reverse();
        const select: any = weekly(data);
        setContent(select);
        console.log("content", select.content);
      }))();
  }, []);
  return (
    <div className=" flex flex-col">
      <div>{content.content}</div>
      <textarea
        className=" p-5"
        ref={inputRef}
        rows={10}
        cols={30}
        placeholder="กรอกคำถามของคุณ"
      />
      <button
        onClick={async () => {
          const res: string = await runGemini(inputRef.current.value).then(
            (res) => res
          );
          setBack(res);
          // setHtmlContent(runMarkdown(back));
        }}
      >
        ส่งคำถาม
      </button>
      <p>{back}</p>
      {/* <p>{(async () => await runMarkdown().then((res) => res))()}</p> */}
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
}

export default page;
