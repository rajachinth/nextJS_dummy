import React from "react";
import Image from "next/image";
/**
 * -> "Image" component offered by NextJS has many of optimizing techniques.
 * -> The standard image used below is of size 1.8 MB, which is very huge and not recommended to production
 *
 * -> "Image" in NextJs offers to downscale the image on the fly; i.e., when ever a request is made to load this image,
 *      the nextJs renders multiple images of this original image indifferent dimensions and formate types
 * -> This is becacuse, NextJs formates the images into the Browser specific and well supported super compressed image
 *      formates like Chrome supports "webp" formate; NextJs automatically detects Browser type and formates image
 *      into that specific image type.
 * -> And also it caches the image, when ever again the same request is hitted from the same device on the same screensize
 *      then, NextJs send the caches image without gain optimizing the images on fly with multiple image files and formates
 *
 * -> Another important core feature, all images in NextJs using <Image/> component will be loaded on demand/lazy
 *  i.e., all the images in React/Angular is loaded eagerly.
 * -> But in NextJs using <Image/>; images are loaded lazily; i.e., when ever the image is visible on the screen to the
 *      user then only the image request is made.
 *
 * EXAMPLE:
 *
 *      suppose, we are showing 20 images to the user on the screen; and initially first 6 images occupied whole screen
 *          and remaining 14 images are invisible (we need to scroll down to view those images).
 *      -> At this point, NextJs using <Image/> send request only to this 6 images that are currently visible to the
 *          user and when user scroll down the new images are shown/visible; at this point NextJs again send request
 *          to load those visible images only but not all images at a go (LAZY LOADED IMAGES)
 *
 * -> Lazy Load is the core feature of the Nextjs <Image/> component
 *
 * -> refer for more info -> https://nextjs.org/docs/api-reference/next/image
 *
 */
function ImageComponent() {
  return (
    <div
      style={{
        marginTop: "10%",
        marginLeft: "25%",
        width: "50%",
        height: "25%",
        textAlign: "center",
      }}
    >
      {/* <img src="/images/ph.jpg" style={{ width: "100%", height: "100%" }} /> */}
      {/* Width and Height required to give in PIXELS in NUMERIC format; not in STRING type */}
      <Image src="/images/ph.jpg" width={500} height={500} />
      {/** image loads lazily in NextJS */}
      {/* 
        -> There are many more properties, we can use on this <Image/> component to optimize this to advanced level
        -> refer the below link for more info -> https://nextjs.org/docs/api-reference/next/image
      */}
    </div>
  );
}

export default ImageComponent;
