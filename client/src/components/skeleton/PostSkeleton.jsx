/* eslint-disable no-unused-vars */
import React from "react";

const PostSkeleton = () => {
  return (
    <div className="flex flex-col m-1 p-1 gap-2 items-center justify-center shadow-xl bg-slate-700 h-[277px] w-[273px] opacity-50">
      <div className="w-[90%] h-[80%] bg-slate-500"></div>
    </div>
  );
};

export default PostSkeleton;
