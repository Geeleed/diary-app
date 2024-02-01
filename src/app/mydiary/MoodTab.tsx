import React from "react";

function MoodTab({ mood, setMood }: any) {
  return (
    <>
      <svg
        onClick={() => (mood === "happy" ? setMood() : setMood("happy"))}
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        fill={`${mood === "happy" ? "#FCBE11" : "#bfac97"}`}
        className="bi snap-center bi-emoji-laughing-fill cursor-pointer hover:opacity-80 transition-all"
        viewBox="0 0 16 16"
      >
        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16M7 6.5c0 .501-.164.396-.415.235C6.42 6.629 6.218 6.5 6 6.5s-.42.13-.585.235C5.164 6.896 5 7 5 6.5 5 5.672 5.448 5 6 5s1 .672 1 1.5m5.331 3a1 1 0 0 1 0 1A5 5 0 0 1 8 13a5 5 0 0 1-4.33-2.5A1 1 0 0 1 4.535 9h6.93a1 1 0 0 1 .866.5m-1.746-2.765C10.42 6.629 10.218 6.5 10 6.5s-.42.13-.585.235C9.164 6.896 9 7 9 6.5c0-.828.448-1.5 1-1.5s1 .672 1 1.5c0 .501-.164.396-.415.235" />
      </svg>
      <svg
        onClick={() => (mood === "normal" ? setMood() : setMood("normal"))}
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        fill={`${mood === "normal" ? "#FFEA97" : "#bfac97"}`}
        className="bi snap-center bi-emoji-neutral-fill cursor-pointer hover:opacity-80 transition-all"
        viewBox="0 0 16 16"
      >
        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m-3 4a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5M10 8c-.552 0-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5S10.552 8 10 8" />
      </svg>
      <svg
        onClick={() => (mood === "upset" ? setMood() : setMood("upset"))}
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        fill={`${mood === "upset" ? "#006318" : "#bfac97"}`}
        className="bi snap-center bi-emoji-frown-fill cursor-pointer hover:opacity-80 transition-all"
        viewBox="0 0 16 16"
      >
        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m-2.715 5.933a.5.5 0 0 1-.183-.683A4.5 4.5 0 0 1 8 9.5a4.5 4.5 0 0 1 3.898 2.25.5.5 0 0 1-.866.5A3.5 3.5 0 0 0 8 10.5a3.5 3.5 0 0 0-3.032 1.75.5.5 0 0 1-.683.183M10 8c-.552 0-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5S10.552 8 10 8" />
      </svg>
      <svg
        onClick={() => (mood === "angry" ? setMood() : setMood("angry"))}
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        fill={`${mood === "angry" ? "#D20000" : "#bfac97"}`}
        className="bi snap-center bi-emoji-angry-fill cursor-pointer hover:opacity-80 transition-all"
        viewBox="0 0 16 16"
      >
        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16M4.053 4.276a.5.5 0 0 1 .67-.223l2 1a.5.5 0 0 1 .166.76c.071.206.111.44.111.687C7 7.328 6.552 8 6 8s-1-.672-1-1.5c0-.408.109-.778.285-1.049l-1.009-.504a.5.5 0 0 1-.223-.67zm.232 8.157a.5.5 0 0 1-.183-.683A4.5 4.5 0 0 1 8 9.5a4.5 4.5 0 0 1 3.898 2.25.5.5 0 1 1-.866.5A3.5 3.5 0 0 0 8 10.5a3.5 3.5 0 0 0-3.032 1.75.5.5 0 0 1-.683.183M10 8c-.552 0-1-.672-1-1.5 0-.247.04-.48.11-.686a.502.502 0 0 1 .166-.761l2-1a.5.5 0 1 1 .448.894l-1.009.504c.176.27.285.64.285 1.049 0 .828-.448 1.5-1 1.5" />
      </svg>
      <svg
        onClick={() => (mood === "broke" ? setMood() : setMood("broke"))}
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        fill={`${mood === "broke" ? "#FF0909" : "#bfac97"}`}
        className="bi snap-center bi-heartbreak-fill cursor-pointer hover:opacity-80 transition-all"
        viewBox="0 0 16 16"
      >
        <path d="M8.931.586 7 3l1.5 4-2 3L8 15C22.534 5.396 13.757-2.21 8.931.586M7.358.77 5.5 3 7 7l-1.5 3 1.815 4.537C-6.533 4.96 2.685-2.467 7.358.77" />
      </svg>
    </>
  );
}

export default MoodTab;

export const MoodHappy = ({ mood }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      fill={`${mood === "happy" ? "#FCBE11" : "#bfac97"}`}
      className="bi w-7 h-7 bi-emoji-laughing-fill cursor-pointer hover:opacity-80 transition-all"
      viewBox="0 0 16 16"
    >
      <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16M7 6.5c0 .501-.164.396-.415.235C6.42 6.629 6.218 6.5 6 6.5s-.42.13-.585.235C5.164 6.896 5 7 5 6.5 5 5.672 5.448 5 6 5s1 .672 1 1.5m5.331 3a1 1 0 0 1 0 1A5 5 0 0 1 8 13a5 5 0 0 1-4.33-2.5A1 1 0 0 1 4.535 9h6.93a1 1 0 0 1 .866.5m-1.746-2.765C10.42 6.629 10.218 6.5 10 6.5s-.42.13-.585.235C9.164 6.896 9 7 9 6.5c0-.828.448-1.5 1-1.5s1 .672 1 1.5c0 .501-.164.396-.415.235" />
    </svg>
  );
};

export const MoodNormal = ({ mood }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      fill={`${mood === "normal" ? "#ffe097" : "#bfac97"}`}
      className="bi w-7 h-7 bi-emoji-neutral-fill cursor-pointer hover:opacity-80 transition-all"
      viewBox="0 0 16 16"
    >
      <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m-3 4a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5M10 8c-.552 0-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5S10.552 8 10 8" />
    </svg>
  );
};
export const MoodUndefined = ({ mood }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      fill={`${mood === "" ? "#bfac97" : "#bfac97"}`}
      className="bi w-7 h-7 bi-emoji-neutral-fill cursor-pointer hover:opacity-80 transition-all"
      viewBox="0 0 16 16"
    >
      <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m-3 4a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5M10 8c-.552 0-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5S10.552 8 10 8" />
    </svg>
  );
};

export const MoodUpset = ({ mood }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      fill={`${mood === "upset" ? "#006318" : "#bfac97"}`}
      className="bi w-7 h-7 bi-emoji-frown-fill cursor-pointer hover:opacity-80 transition-all"
      viewBox="0 0 16 16"
    >
      <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m-2.715 5.933a.5.5 0 0 1-.183-.683A4.5 4.5 0 0 1 8 9.5a4.5 4.5 0 0 1 3.898 2.25.5.5 0 0 1-.866.5A3.5 3.5 0 0 0 8 10.5a3.5 3.5 0 0 0-3.032 1.75.5.5 0 0 1-.683.183M10 8c-.552 0-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5S10.552 8 10 8" />
    </svg>
  );
};

export const MoodAngry = ({ mood }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      fill={`${mood === "angry" ? "#D20000" : "#bfac97"}`}
      className="bi w-7 h-7 bi-emoji-angry-fill cursor-pointer hover:opacity-80 transition-all"
      viewBox="0 0 16 16"
    >
      <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16M4.053 4.276a.5.5 0 0 1 .67-.223l2 1a.5.5 0 0 1 .166.76c.071.206.111.44.111.687C7 7.328 6.552 8 6 8s-1-.672-1-1.5c0-.408.109-.778.285-1.049l-1.009-.504a.5.5 0 0 1-.223-.67zm.232 8.157a.5.5 0 0 1-.183-.683A4.5 4.5 0 0 1 8 9.5a4.5 4.5 0 0 1 3.898 2.25.5.5 0 1 1-.866.5A3.5 3.5 0 0 0 8 10.5a3.5 3.5 0 0 0-3.032 1.75.5.5 0 0 1-.683.183M10 8c-.552 0-1-.672-1-1.5 0-.247.04-.48.11-.686a.502.502 0 0 1 .166-.761l2-1a.5.5 0 1 1 .448.894l-1.009.504c.176.27.285.64.285 1.049 0 .828-.448 1.5-1 1.5" />
    </svg>
  );
};

export const MoodBroke = ({ mood }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      fill={`${mood === "broke" ? "#FF0909" : "#bfac97"}`}
      className="bi w-7 h-7 bi-heartbreak-fill cursor-pointer hover:opacity-80 transition-all"
      viewBox="0 0 16 16"
    >
      <path d="M8.931.586 7 3l1.5 4-2 3L8 15C22.534 5.396 13.757-2.21 8.931.586M7.358.77 5.5 3 7 7l-1.5 3 1.815 4.537C-6.533 4.96 2.685-2.467 7.358.77" />
    </svg>
  );
};
