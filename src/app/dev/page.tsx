import React from "react";

function page() {
  return (
    <div className="flex justify-center items-center">
      <div className=" absolute top-0 left-0 w-[30rem] h-full border-2 border-dotted gap-2 overflow-scroll flex snap-x snap-mandatory">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
          (num?: number, index?: number) => (
            <Card key={index} num={num as number} />
          )
        )}
      </div>
    </div>
  );
}

export default page;

const Card = ({ num }: { num: number }): React.JSX.Element => {
  return (
    <div className="w-[30rem] h-full bg-weight3  flex-none snap-center">
      Card At {num}
    </div>
  );
};
