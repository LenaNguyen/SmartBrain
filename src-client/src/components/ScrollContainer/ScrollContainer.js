import React from "react";

const ScrollContainer = props => {
  return (
    <div
      style={{
        overflowY: "hidden",
        overflowX: "hidden",
        position: "relative",
        width: "100%",
        height: "calc(100vh - 110px)"
      }}
    >
      <div
        style={{
          overflowY: "scroll",
          top: "0",
          left: "0",
          bottom: "0",
          right: "-17px",
          position: "absolute"
        }}
      >
        {props.children}
      </div>
    </div>
  );
};

export default ScrollContainer;
