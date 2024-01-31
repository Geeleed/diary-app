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
      <p className=" w-full break-words">{content!}</p>
      {link && <a href={link}>Link: {link}</a>}
    </>
  );
}

export default DiaryContent;
