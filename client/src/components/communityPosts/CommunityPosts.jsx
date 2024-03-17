/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import useGetImages from "../../hooks/useGetImages";
import PostSkeleton from "../skeleton/PostSkeleton";

const CommunityPosts = () => {
  const { images, imagesLoading } = useGetImages();

  const handleSearch = () => {};

  return (
    <div className={`relative w-full p-5 grid grid-cols-5 mobile:max-tablet:grid-cols-1`}>
      {!imagesLoading &&
        images?.length > 0 &&
        images.map((item, index) => (
          <>
            {item?.community ? (
              <div
                className="relative flex flex-col m-1 p-1 gap-1 shadow-xl bg-slate-100"
                key={index}
              >
                <div className="absolute h-full w-full"></div>
                <div>
                  <img src={`http://localhost:5000/${item?.filePath}`} alt="" />
                </div>
                <div className="px-1">
                  <h1 className="font-light">Creator: {item?.username}</h1>
                </div>
              </div>
            ) : (
              ""
            )}
          </>
        ))}

      {imagesLoading && (
          <>
            <PostSkeleton/>
            <PostSkeleton/>
            <PostSkeleton/>
            <PostSkeleton/>
            <PostSkeleton/>
          </>
        )}
    </div>
  );
};

export default CommunityPosts;
