"use client";
import Image from "next/image";

interface Props {
  image: string;
  link: string;
  content: string;
}
function DiaryContent({ image, content, link }: Props) {
  return (
    <>
      {image && (
        <Image
          className=" rounded-md my-3"
          src={image}
          height={100}
          width={600}
          alt=""
        />
      )}
      <p className=" w-full break-words text-[1.4rem] leading-snug whitespace-pre-wrap">
        {content!}
      </p>
      {link && (
        <a className=" flex items-center gap-1 text-weight5" href={link}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            fill="#a39789"
            className="bi bi-link-45deg cursor-pointer hover:opacity-80 transition-all flex-none"
            viewBox="0 0 16 16"
          >
            <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1 1 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z" />
            <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z" />
          </svg>{" "}
          <p className=" overflow-clip text-ellipsis text-[1.2rem]">{link}</p>
        </a>
      )}
    </>
  );
}

export default DiaryContent;
