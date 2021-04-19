/**
 * "_document.js" -> this file helps to structure the HTML document by overriding the default structure
 * 
 *  <html>
        <head>
        </head>
        <body>
        </body>
    </html>

    -> By adding below structure in "_document.js", HTML document rendered looks like:
    
    -> STOP DEV SERVER & RESTART THE SERVER AGAIN TO APPLY _DOCUMENT.JS CHANGES
    
    <html>
        <head>
        </head>
        <body>
          <div>
            <h4 style={{ textAlign: "center" }}>
              custom _document.js file added
            </h4>
          </div>
          <!--- REACT RENDERED COMPONENTS --->
        </body>
    </html>
 * 
    -> If we need to change the structure of above default HTML document, then we could use this "_document.js"
    -> i.e, we can add additional <div> blocks after <head> or any element outside of the React rendered components
    -> In "document.js" we need to follow mandatory structure
    -> This should be a class component and need to extend "document"
 */

import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  date = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    day: "numeric",
    month: "long",
  });

  render() {
    return (
      <Html lang="en">
        {/* 
          all <Head/> defined in "next/head" goes into the below "<Head/>" block defined by NextJs in "next/document" 
        */}
        <Head></Head>
        <body>
          <div style={{ textAlign: "center" }}>
            <p style={{ fontWeight: "bold", color: "blue" }}>{this.date}</p>
          </div>
          {/*   
            In below     <Main></Main> 
                         <NextScript></NextScript>

            the main React rendered component goes into these <Main/> block defined by NextJs in "next/document"
        */}
        </body>
        <Main></Main>
        <NextScript></NextScript>
      </Html>
    );
  }
}

export default MyDocument;
