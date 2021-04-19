import React, { Fragment } from "react";
import Link from "next/link";

function Home() {
  return (
    <Fragment>
      <div style={{ width: "40%", marginLeft: "30%", textAlign: "center" }}>
        <h1>Welcome JI</h1>
        <button>
          <Link href="/">Root Page</Link>
        </button>
      </div>
    </Fragment>
  );
}

export default Home;
