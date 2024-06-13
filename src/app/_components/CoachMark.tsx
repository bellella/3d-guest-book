"use client";
import React, { PropsWithChildren } from "react";
import clsx from "clsx";
import { HeartIcon } from "@radix-ui/react-icons";

const CoachMark: React.FC = () => {
  React.useEffect(() => {
    const hasSeenCoachmark = localStorage.getItem('seenCoachMark');
    if (!hasSeenCoachmark) {
      setShow(true);
      localStorage.setItem('seenCoachMark', new Date().toDateString());
    }
  }, []);
  const [sceneIndex, setSceneIndex] = React.useState(0);
  const [show, setShow] = React.useState(false);
  const maxScene = 8;

  const addClassByScene = (index: number) =>
    sceneIndex === index ? "" : "hidden";
  const clickScene = () => {
    if (sceneIndex >= maxScene - 1) {
      setShow(false);
    } else {
      setSceneIndex((index) => index + 1);
    }
  };
  return (
    <>
      {show && (
        <div
          className="fixed inset-0 z-50 text-lg cursor-pointer"
          onClick={() => clickScene()}
        >
          <div className="absolute inset-0 w-full h-full bg-black bg-opacity-50"></div>
          <CoachText className={clsx(addClassByScene(0), "text-2xl")}>
            Hello! <br />
            Welcome to my <br />
            3D guestbook~~🤩
          </CoachText>
          <CoachText className={clsx(addClassByScene(1), "text-2xl")}>
            My name is Mina🤭
          </CoachText>
          <CoachText className={addClassByScene(2)}>
            I’ve always wanted to <br />
            create a guestbook site, <br />
            so I finally did! 😄
          </CoachText>
          <CoachText className={addClassByScene(3)}>
            Let me show you around!
          </CoachText>
          <div className={clsx("absolute right-14 top-14", addClassByScene(4))}>
            <SpeechBubble
              text="To switch rooms, just pick a number!"
              direction="topRight"
            />
          </div>
          <div
            className={clsx("absolute left-0 bottom-20", addClassByScene(5))}
          >
            <SpeechBubble
              text="To leave a message, click this button"
              direction="bottomLeft"
            />
          </div>
          <CoachText className={clsx(addClassByScene(6), "text-2xl")}>
            To view messages, tap <HeartIcon className="inline" />
          </CoachText>
          <CoachText className={addClassByScene(7)}>
            Got it? Great! <br />
            Now, go have some fun~~
          </CoachText>
        </div>
      )}
    </>
  );
};

const CoachText: React.FC<PropsWithChildren<{ className: string }>> = ({
  children,
  className,
}) => (
  <div
    className={clsx(
      "w-full text-white absolute-center py-2 px-5 text-xl text-center",
      className
    )}
  >
    {children}
  </div>
);

interface SpeechBubbleProps {
  text: string;
  direction?: "topRight" | "bottomLeft";
}

const SpeechBubble: React.FC<SpeechBubbleProps> = ({
  text,
  direction = "topRight",
}) => {
  const arrowStyles = {
    bottomLeft: "left-5 border-t-purple-100",
    topRight:
      " bottom-full right-10 w-0 h-0 border-x-8 border-x-transparent border-b-8 border-b-purple-100",
  };

  return (
    <div className="relative mt-3 ml-3 animation-float">
      <div className="bg-purple-100 text-black p-4 rounded-lg shadow-lg">
        {text}
      </div>
      <div
        className={clsx(
          "absolute w-0 h-0 border-8 border-transparent left-",
          arrowStyles[direction]
        )}
      ></div>
    </div>
  );
};

export default CoachMark;
