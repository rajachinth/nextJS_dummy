import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment } from "react";
import fs from "fs";
import path from "path";
import Head from "next/head";

function Author(props) {
  // let data = useRouter();

  if (!props.author) return <p>loading...</p>; // condition to check when "fallback:true" in "getStaticPaths()"

  return (
    <Fragment>
      <Head>
        <title>Author: {props.author}</title>
      </Head>
      <h2>Author: {props.author}</h2>
      <Link href="/">Home</Link>
    </Fragment>
  );
}

export default Author;
/**
 * "getStaticProps()" pre-generates pages on the server and we can use SSG or ISR to pre-render the pages on the server
 *    with "dynamic" content.
 *
 * -> Now, when we need to render "dynamic" pages we cant use this above pattern as we have 'n' number of pages that
 *    can be rendered for this "dynamic" route.
 *
 * -> At this point we can use "getStaticPaths()" async function
 *
 */
export async function getStaticProps(context) {
  // console.log(context);
  /**
   * OUTPUT:  
   *        {
              params: { author: 'Lewis' },
              locales: undefined,
              locale: undefined,
              defaultLocale: undefined
            }
    -> We can access the router params value from the "context" value which is passed to the "getStaticProps()" function

   */

  let jsonData = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "dummy_data.json"))
  );

  /**
   * If we enter  any random author name that doesnt exist in the "json file", as we have "fallback:true" in
   *    "getStaticPaths()", it loads page for all the dynamic paths with any random author
   *
   * -> Now, in "getStaticProps()" we check whether the entered author in URL is present in the actual json data or will
   *      check the author name in back-end database & if author name present in DB then we will continue returning "props"
   *      & upon receiving props, the regular react component renders
   * -> If "author" name is not present in DB, then we will return { notFound:true }; Now nextJS returns a "not found"
   *      404 page to the client and protects from random attacks through "URL params"
   *
   */
  let filteredData = jsonData.authors.filter(
    // filter the search params in actual json data file
    (e) => e.name == context.params.author
  );

  if (filteredData.length == 0) return { notFound: true };
  // if "author" name not present in Json file or DB; return 404 error page
  else return { props: { author: context.params.author } }; // else if "author" name present in Json file or DB, return "params" to react component
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { author: "Kewin" } },
      { params: { author: "John" } },
      // { params: { author: "Lewis" } },
      // { params: { author: "Paul" } },
      // { params: { author: "Nikki" } },
      // { params: { author: "Pieter" } },
    ],
    fallback: true, // it will not wait till page rendered on server and control goes from getStaticProps()->getStaticPaths()->react component
    // fallback:'blocking' // it will wait till page renders completely and then control goes to -> react component
    /**
     * fallback -> helps to pre-render the page JIT(Just In Time) i.e., pre-rendering on demand in the server and
     *    sending back that pre-rendered page to the client
     *
     * Example: Suppose we have a website like amazon, where we have millions of products & pages to pre-render
     *    These would lead more time to pre-reder and not a good way of doing
     *    -> So, we pre-render only the pages that are visited more often by customer, and other pages are pre-rendered
     *        on the server Just-In-Time i.e., pre-rendered on demand
     *    -> "fallback:true" helps to achieve above behaviour
     *    -> While the page is pre-rendering on server, it will not wait till completion and control goes from
     *    "getStaticPaths" to "getStaticProps" and to "React component"
     *    -> Now, in react component "props" with any properties added in "getStaticPaths & getStaticProps" will be
     *      undefined and throws error
     *    -> So add some condition to check whether the props has the properties defined in the "getStaticPaths & getStaticProps"
     *      if not then return something like
     *          return <p>loading...<p>
     *    -> After the page is pre-rendered, this is sent back to the client and now NextJs again updates the React component
     *        with the updated property values on to the props and can add some condition to check whether the props has the
     *        properties defined in the "getStaticPaths & getStaticProps". If yes, then we can return desired action; else
     *        we can return <p>loading...</p>
     *
     *    -> Another way is using "fallback:'blocking'"
     *    -> This means, NextJs waits untill the pre-render completes on the server and returned to the client, till that point
     *        NextJs will not render React component. By this we dont need to check any conditions to display the "<p>loading..</p>"
     * "
     *
     */
  };
}
/**
 * while these dynamic/static pre-rendered pages are requested by client, then the NextJs send the pre-rendered page
 *  along with "json file" which holds the pre-rendered data from the server
 *
 * -> we can see the "json" file request from the "chrome dev tools"; these are already pre-rendered data in server
 *
 */
