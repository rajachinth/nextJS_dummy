/**
 * NextJs renders "404-not-found" page component by its default on route-not-found in "pages" folder.
 * -> To have custom "404-not-found" component, we can create a one using "404.js" file on the root level of "pages" folder
 */

import Link from "next/link";
import { Fragment } from "react";

export default function PageNotFound() {
  return (
    <Fragment>
      <h1 style={{ textAlign: "center", color: "red" }}>Page Not Found</h1>
      <Link href="/">Home</Link>
    </Fragment>
  );
}
