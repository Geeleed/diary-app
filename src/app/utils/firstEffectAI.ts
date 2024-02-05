// Now not ready!!!

// generate content every sunday
// generate content every monthend
// generate content every yearend
// generate content when user want surprices me! --> check 1500 latest

import { addThenGetLatestDiary } from "../mydiary/actions";
import { md5 } from "./md5";
import { runGemini } from "./useGeminiPro";
import { worldTime } from "./worldTime";

export const weekly = async ({
  data,
  username,
}: {
  data: [];
  username: string;
}) => {
  // filter AI's documents in role weekly then check latest documents is sunday. If "false" then generate content
  try {
    const promptText = `ช่วยสรุปเรื่องราวในไดอารี่ของฉันแล้ววิจารณ์พร้อมแนะนำการใช้ชีวิตของฉันหน่อย ฉันมีบันทึกดังนี้ `;
    const res: any[] = data
      .filter((doc: any) => doc.owner === "AI")
      .filter((doc: any) => doc.role === "weekly")
      .filter(
        (doc: any) => worldTime() - doc.createAt < 7 * 24 * 60 * 60 * 1000
      )
      .sort((a: any, b: any) => b.createAt - a.createAt);
    const userDiary: any = data.map(
      (i: any) => i.editAt < 7 * 24 * 60 * 60 * 1000
    );
    console.log(userDiary);
    if (
      userDiary.length !== 0 &&
      res.length !== 0 &&
      new Date(res[0].createAt).getUTCDay() !== 0 &&
      new Date(worldTime()).getUTCDay() === 0
    ) {
      // generate content
      const packContent = userDiary
        .filter(
          (i: any) => res[0].createAt < i.editAt && i.editAt < worldTime()
        )
        .map((i: any) => `${new Date(i.editAt)} \n ${i.content} \n\n `)
        .join("");
      //   console.log("generate content", packContent);
      console.log("packContent", packContent);
      const contentByAI = await runGemini(
        `${promptText}\n\n${packContent}`
      ).then((res) => res);
      return {
        free: "",
        username: username,
        owner: "AI",
        role: "weekly",
        content: contentByAI,
        mood: "AI",
        createAt: worldTime(),
        editAt: worldTime(),
        timestamp: worldTime(),
        clientTimestamp: new Date().getTime(), // UTC
      };
    } else if (
      userDiary.length !== 0 &&
      res.length !== 0 &&
      new Date(res[0].createAt).getDay() === 0
    ) {
      // not generate content
    } else if (userDiary.length !== 0 && res.length === 0) {
      // generate content
      const packContent = userDiary
        .filter(
          (i: any) =>
            worldTime() - 7 * 24 * 60 * 60 * 1000 < i.editAt &&
            i.editAt < worldTime()
        )
        .map((i: any) => `${new Date(i.editAt)} \n ${i.content} \n\n `)
        .join("");
      console.log("generate content", packContent);
      const contentByAI = await runGemini(
        `${promptText}\n\n${packContent}`
      ).then((res) => res);
      return {
        free: "",
        username,
        owner: "AI",
        role: "weekly",
        content: contentByAI,
        mood: "AI",
        createAt: worldTime(),
        editAt: worldTime(),
        timestamp: worldTime(),
        clientTimestamp: new Date().getTime(), // UTC
        preId: "",
      };
    } else if (userDiary.length === 0) {
    }
  } catch (error) {
    console.log("Error in getting the weekly document");
    throw error;
  }
};

export const addThenGetWeekly = async ({
  data,
  username,
}: {
  data: [];
  username: string;
}) => {
  const objectData: any = await weekly({ data, username }).then((res) => res);
  const preId: string = md5(JSON.stringify(objectData));
  objectData.preId = preId;
  const latestDoc: string = await addThenGetLatestDiary(objectData).then(
    (res) => res
  );
  return latestDoc;
};

// export const monthly = async (data: []) => {
//   // filter AI's documents in role weekly then check latest documents is sunday. If "false" then generate content
//   try {
//     const m28 = [1]
//     const m30 = [3,5,8,10]
//     const m31 = [0,2,4,6,7,9,11]
//     const numFromMonth=(monthIndex:number)=>{
//         if(m31.includes(monthIndex)) return 31
//         else if(m30.includes(monthIndex)) return 30
//         else if(m28.includes(monthIndex)) return 28
//     }
//     const promptText = `ช่วยสรุปเรื่องราวในไดอารี่ของฉันแล้ววิจารณ์พร้อมแนะนำการใช้ชีวิตของฉันหน่อย ฉันมีบันทึกดังนี้ `;
//     const res: any[] = data
//       .filter((doc: any) => doc.owner === "AI")
//       .filter((doc: any) => doc.role === "monthly")
//       .filter(
//         (doc: any) => worldTime() - doc.createAt < 30 * 24 * 60 * 60 * 1000
//       )
//       .sort((a: any, b: any) => b.createAt - a.createAt);
//     const userDiary: any = data.map(
//       (i: any) => i.editAt < 30 * 24 * 60 * 60 * 1000
//     );

//     if (
//       userDiary.length !== 0 &&
//       res.length !== 0 &&
//       new Date(res[0].createAt).getUTCDate() !== 0 &&
//       new Date(worldTime()).getUTCDay() === 0
//     ) {
//       // generate content
//       const packContent = userDiary
//         .filter(
//           (i: any) => res[0].createAt < i.editAt && i.editAt < worldTime()
//         )
//         .map((i: any) => `${new Date(i.editAt)} \n ${i.content} \n\n `)
//         .join("");
//       //   console.log("generate content", packContent);
//       const contentByAI = await runGemini(
//         `${promptText}\n\n${packContent}`
//       ).then((res) => res);
//       return contentByAI;
//     } else if (
//       userDiary.length !== 0 &&
//       res.length !== 0 &&
//       new Date(res[0].createAt).getDay() === 0
//     ) {
//       // not generate content
//     } else if (userDiary.length !== 0 && res.length === 0) {
//       // generate content
//       const packContent = userDiary
//         .filter(
//           (i: any) =>
//             worldTime() - 7 * 24 * 60 * 60 * 1000 < i.editAt &&
//             i.editAt < worldTime()
//         )
//         .map((i: any) => `${new Date(i.editAt)} \n ${i.content} \n\n `)
//         .join("");
//       //   console.log("generate content", packContent);
//       const contentByAI = await runGemini(
//         `${promptText}\n\n${packContent}`
//       ).then((res) => res);
//       return contentByAI;
//     } else if (userDiary.length === 0) {
//     }
//   } catch (error) {
//     console.log("Error in getting the weekly document");
//     throw error;
//   }
// };
