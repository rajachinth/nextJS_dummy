import "../styles/globals.css";
import HeadComponent from "../components/header/header";
import Head from "next/head";
import { Fragment } from "react";

/**
 * "_app.js" file is the root component of the NextJS project,
 *
 *    "function MyApp({ Component, pageProps }"
 * -> here, the "Component and pageProps" are passed to render on the root "MyApp" component by NextJS
 * -> So, we can wrap the return component of "MyApp" with layouts like "header UI & footer UI" to display all the
 *     time, its similar to "app.js" file in normal React apps.
 *
 */

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      {/* 
        We can add NextJS <Head> components anywhere in the retun component (order is not important), NextJS is smart
          to pick the <Head> tag content from this return JSX code and put this on the "<head>" section and renders
          on to the UI

        -> So, add this <Head> NextJS component anwhere in the normal React component & NextJS picks it and add to the
            <Head> section of the HTML page automatically  
      */}
      {/* 
        -> In case of multiple <Head> components, the contents of these components are merged and if we have duplicate
            <title> or <meta> or any other tags, those will be overridden by the latest/last <Head> component contents

        -> Suppose on the rendered child components, if we have any <title> tag present, then the current <title>
            on this page "default totle" will be overridden by that latest <title> tag rendered from the child components
  
      */}
      <Head>
        <title>default title</title>
        <meta name="description" content="dumy description" />
      </Head>
      <HeadComponent>
        <Component {...pageProps} />;
      </HeadComponent>
    </Fragment>
  );
}

export default MyApp;
