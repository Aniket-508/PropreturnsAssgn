import { useState, useRef } from "react";
import Image from "next/image";
import { useLongPress } from "use-long-press";
import style from "../styles/Onboarding.module.css";

const videoList = [
  {
    VID: "https://assets.mixkit.co/videos/preview/mixkit-waves-in-the-water-1164-large.mp4",
    PIC: "http://cdn.onlinewebfonts.com/svg/img_329115.png",
    NAME: "Aniket",
  },
  {
    VID: "https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4",
    PIC: "http://cdn.onlinewebfonts.com/svg/img_329115.png",
    NAME: "Ashok",
  },
  {
    VID: "https://assets.mixkit.co/videos/preview/mixkit-red-frog-on-a-log-1487-large.mp4",
    PIC: "http://cdn.onlinewebfonts.com/svg/img_329115.png",
    NAME: "Pawar",
  },
];

export default function OnBoarding() {
  const [active, setActive] = useState({
    VID: videoList[0].VID,
    PIC: videoList[0].PIC,
    NAME: videoList[0].NAME,
  });
  const vidRef = useRef(null);
  const bind = useLongPress(() => {
    console.log("long press");
  }, {
    threshold: 1000,
    onStart: () => vidRef.current.pause(),
    onFinish: () => vidRef.current.play(),
    onCancel: () => vidRef.current.play(),
    captureEvent: true,
    cancelOnMovement: false,
    filterEvents: () => true,
  });

  const [progress, setProgress] = useState(0);

  const nextVideo = () => {
    videoList.map((list, i) => {
      if (list.VID === active.VID && i < videoList.length - 1) {
        setActive({
          VID: videoList[i + 1].VID,
          PIC: videoList[i + 1].PIC,
          NAME: videoList[i + 1].NAME,
        });
      }
    });
  };

  const prevVideo = () => {
    videoList.map((list, i) => {
      if (list.VID === active.VID && i > 0) {
        setActive({
          VID: videoList[i - 1].VID,
          PIC: videoList[i - 1].PIC,
          NAME: videoList[i - 1].NAME,
        });
      }
    });
  };

  const handleProgress = (e) => {
    setInterval(() => {
      setProgress(Math.round((e.target.currentTime / e.target.duration) * 100));
    }, 1);
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-sm p-4">
        <div className="flex items-center mt-5 ml-2 space-x-2 absolute">
          <Image
            className="bg-white rounded-full"
            src={active.PIC}
            alt="Profile Pic"
            width={30}
            height={30}
          />
          <p className="text-white">{active.NAME}</p>
        </div>
        <video
          ref={vidRef}
          className="w-full"
          src={active.VID}
          onEnded={nextVideo}
          type="video/mp4"
          onPlay={handleProgress}
          muted
          autoPlay
        />
        <div className="flex absolute cursor-pointer w-full h-full max-w-[352px] mt-[-700px]">
          <div
            onClick={prevVideo}
            className="cursor-pointer h-full w-2/4"
            {...bind()}
          />
          <div
            onClick={nextVideo}
            className="cursor-pointer h-full w-2/4"
            {...bind()}
          />
        </div>
        <progress
          className={`${style.progressBar} appearance-none w-full mt-[-616px] h-1 flex px-2`}
          max="100"
          min="0"
          value={progress}
        />
      </div>
    </div>
  );
}
