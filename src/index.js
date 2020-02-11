import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ReactDOM from "react-dom";
import ScrollMagic from "scrollmagic";
import Lottie from "./lottie";

import animationData from "./animation.json";

const Space = styled.div`
  height: 500px;
  width: 100%;
`;

const StyledContainer = styled.div`
  /* position: fixed; */
  top: 0;
`;

function App() {
  const [scroll, setScroll] = useState(0);
  let controller = new ScrollMagic.Controller();

  function handleScroll() {
    setScroll(
      ((document.documentElement.scrollTop + document.body.scrollTop) /
        (document.documentElement.scrollHeight -
          document.documentElement.clientHeight)) *
        100
    );
  }

  useEffect(() => {
    new ScrollMagic.Scene({
      triggerElement: "#scrollStarts",
      duration: 400, // scroll distance
      offset: 200 // start this scene after scrolling for 50px
    })
      .setTween("#myElement", {
        scale: 0.5,
        color: "red"
      })
      .setPin("#myElement") // pins the element for the the scene's duration
      .addTo(controller); // assign the scene to the controller
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <Space />
      {/* <div style={{ height: "500px", background: "orange" }}>
          Space before Scroll!
        </div>
        <div id="scrollStarts">
          Scrolling animation starts when this is in the middle ------->
        </div>
        <div style={{ height: "600px", background: "yellow" }}>
          <div
            id="wrapper"
            style={{ height: "800px", background: "lightgreen" }}
          >
            <h1 id="myElement">Hiiiiiii</h1>
          </div>
        </div> */}
      <StyledContainer>
        <Lottie
          isPaused={true}
          options={{
            loop: false,
            autoplay: false,
            prerender: true,
            animationData: animationData,
            rendererSettings: {
              preserveAspectRatio: "xMidYMid slice"
            }
          }}
          goToAndStop={{
            value: Math.round((scroll / 100) * animationData.op),
            isFrame: true
          }}
        />
      </StyledContainer>
      <Space />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
