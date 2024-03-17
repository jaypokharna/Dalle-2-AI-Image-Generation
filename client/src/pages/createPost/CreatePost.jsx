/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import promptArr from "../../utils/SuprisePrompt.js";
import imgPlaceholder from "../../assets/png/imgPlaceholder.png";
import HashLoader from "react-spinners/HashLoader";
import ClockLoader from "react-spinners/ClockLoader";
import toast from "react-hot-toast";
import Header from "../../components/header/Header.jsx";

const CreatePost = () => {
  const [name, setname] = useState();
  const [prompt, setPrompt] = useState();
  const [communityBtn, setCommunityBtn] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [imgOpacity, setImgOpacity] = useState("opacity-50");
  const [loading, setLoading] = useState(false);
  const [placeHolder, setPlaceHolder] = useState()
  const [generateButton, setgenerateButton] = useState("Generate")
  const [buttonLoading, setbuttonLoading] = useState(false)

  useEffect(() => {
      
    setPlaceHolder(promptArr[Math.floor(Math.random() * promptArr.length)])
  
    return () => {
      
    }
  }, [])

  const handleSend = async () => {

    setbuttonLoading(true)

    if(!name || !prompt){
      toast.error("Enter all the fields.")
      return;
    }

    if(name != "jay" && (name.length < 4 || name.length > 10) ){
      toast.error("Name should be between 4-10 characters")
      return;
    }

    setLoading(true);
    setCommunityBtn(false);
    const res = await fetch("http://localhost:5000/receivePrompt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt , name}),
    });

    const imageData = await res.json();
    setCommunityBtn(true);
    setImageUrl(imageData.imageData);
    setLoading(false);
    setImgOpacity("opacity-100");
    setbuttonLoading(false)
    setgenerateButton("Regenerate")
  };

  const sendToCommunity = async()=>{

    const res = await fetch("http://localhost:5000/sendToCommunity", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({imageUrl}),
    });

    const data = await res.json();

      if(data.community === "Done") toast.success("Shared to Dalle community.")

  }

  return (
    <>
  <Header page={"postpage"}/>
    <div className="relative px-[5%] py-[3%] pb-[2%] flex flex-col gap-5 overflow-hidden">
      <div className="flex flex-col gap-3">
        <h2 className="font-semibold text-4xl">Generate</h2>
        <p className="">
          Unleash the Power of Artificial Intelligence: Transforming Your Ideas
          into Stunning Images with Cutting-Edge Technology
        </p>
      </div>

      <div className="flex flex-col gap-2 mt-5">
        <h2 className="text-lg font-semibold">Enter Name</h2>
        <input
          type="text"
          id="asd"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setname(e.target.value)}
          className="bg-white backdrop-blur-md text-sm p-3 w-[500px] border-[1px] rounded-md outline-black"
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <h2 className="text-lg font-semibold">Prompt</h2>
          <button
            className="text-xs bg-gray-200 py-1 px-4 rounded-lg hover:bg-gray-300 shadow-sm hover:shadow-md transition-all ease-in-out"
            onClick={() => {
              setPrompt(promptArr[Math.floor(Math.random() * 179)]);
            }}
          >
            Suprise Me
          </button>
        </div>
        <input
          type="text"
          id="asd"
          placeholder={placeHolder}
          value={prompt || ""}
          onChange={(e) => {
            setPrompt(e.target.value)
            if(generateButton !== "Generate") setgenerateButton("Generate")
          }}
          className={`bg-white backdrop-blur-md text-sm p-3 w-[900px] border-[1px] rounded-md outline-black`}
        />
      </div>

      <div className="w-[285px] h-[285px] border-[1px] rounded-lg bg-white flex items-center justify-center">
        {!loading && (
          <img
            src={imageUrl ? imageUrl : imgPlaceholder}
            className={`object-contain ${imgOpacity} `}
          />
        )}
        <HashLoader
        color="#36d7b7"
        loading={loading}
        size={60}
        className="opacity-50"
      />
      </div>

      <div className="flex gap-3">
        <button
          className={`text-sm py-2 px-4 bg-green-600 rounded-lg text-white font-semibold ${buttonLoading ? "w-[62px] flex items-center justify-center" : ""}`}
          disabled = {buttonLoading ? true  : false}
          onClick={handleSend}
        >
          {buttonLoading && <ClockLoader size={20} color="white"/>}
          {!buttonLoading && generateButton}
        </button>
        {communityBtn && (
          <button className="text-sm  bg-purple-600 text-white py-2 px-4 rounded-lg font-semibold" onClick={sendToCommunity}>
            Share with community.
          </button>
        )}
      </div>
    </div>
    </>
  );
};

export default CreatePost;
