import Link from "next/link";
import React, { Fragment } from "react";
import { IoIosHome } from "react-icons/io";

function HeadComponent(props) {
  return (
    <section>
      <div
        style={{
          backgroundColor: "cadetblue",
          fontWeight: "600",
          fontSize: "20px",
          padding: "20px",
        }}
      >
        <Link href="/home">Home</Link>
        <IoIosHome />
      </div>
      {props.children}
    </section>
  );
}

export default HeadComponent;
