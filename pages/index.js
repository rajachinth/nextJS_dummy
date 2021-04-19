import Link from "next/link";
import Head from "next/head"; // Special component provided by NextJS

/**
 *-> <Head/> is a special tag provided by "nextJS" to add header tags to the pages that are pre-rendered using
 *    server/static/ISR/SSG
 *-> we can add <title/> or <meta/> or any HTML tags that are used in normal <header/> tag
 *-> <meta> tag is used by Google Search Enginee Crawlers to display the search results with <title> and description
 *    provided in <meta> tag
 *
 * EXAMPLE:
 * <meta name='description' content='description required by Google Crawlers' />
 *
 */

import path from "path";
import fs from "fs";

/**
 * Above two imports are bundled separetly as these imports are used in "getStaticProps()" method; not only nodeJS
 *  imports, but also any other imports used with in the "getStaticProps()" are bundled seperately along with normal
 *  JS bundles.
 *
 * -> fs/promises -> these imports are newly added that has "promise" feature.
 */

/**
 * -> Link- when rendered on to the browser; we see only "<a></a>" anchor tag but not "LINK"
 * -> "Link" automatically adds "<a>" ANCHOR TAG by replacing the "Link"
 * -> Suppose in a scenario to style this "<a>" we can use below approach
 *
 *    <Link href={"<href link>"}>
 *        <a style={{color:'red'}}>click here</a>
 *    </Link>
 *
 * here, we gave "<a>" tag and NextJs will not add/replace this "<a>"; instead it see there already exist a "<a>" tag
 *  and uses that "<a>" tag without adding/replaing with a new "<a>" tag
 *
 * NOTE: DONT GIVE "href" INSIDE "<a></a>" TAG UNDER <Link></Link>
 *
 *
 */

export default function Home(props) {
  // console.log(props);
  return (
    <div>
      <Head>
        <title>NextJS Course</title>
      </Head>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Welcome NextJS Course</h1>
      </div>
      <ul>
        <li>
          <Link href="/user">user</Link>
        </li>

        {/* 
          Method 1:
            -> set dynamic routing using 
            href={{
              pathname: "/user/[id]",
              query: { id: "001" },
            }}
        */}

        <li>
          <Link
            href={{
              pathname: "/user/[id]",
              query: { id: "001" },
            }}
          >
            method:1-user/ID
          </Link>
        </li>

        {/* 
          Method 2:
            -> set dynamic routing using 
            href={`/user/${"002"}`}
        */}

        <li>
          <Link href={`/user/${"002"}`}>method:2-user/ID</Link>
        </li>
        <li>
          <Link
            href={{
              pathname: "/location/[countrycode]/[countryname]",
              query: { countrycode: "91", countryname: "India" },
            }}
          >
            location/countrycode/countryname
          </Link>
        </li>
        <li>
          <Link
            href={{
              pathname: "/blogs/[date]",
              query: { date: "2010" },
            }}
          >
            blogs/year
          </Link>
        </li>
        <li>
          <Link
            href={{
              pathname: "/blogs/[year]/[month]",
              query: { year: "2020", month: "October" },
            }}
          >
            blogs/year/month
          </Link>
        </li>
        <li>
          <Link
            href={{
              pathname: "/blogs/[year]/[month]/[date]",
              query: { year: "2020", month: "October", date: "20" },
            }}
          >
            blogs/year/month/date
          </Link>
        </li>
        <li>
          <Link href="/image">Images</Link>
        </li>
        <li>
          <Link href="/form">Forms</Link>
        </li>
        <li>
          <Link href="/form/list">List</Link>
        </li>
      </ul>
      <h3>Authors:</h3>
      <ul>
        {props.authors.map((e) => (
          <li key={e.id}>
            <Link href={`/${e.name}`}>{e.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * -> "getStaticProps()"  -> used to pre-render the data required on the Server Side, by this, the below function
 *      has all the capabilities to run the server side code (node js)
 * -> When we imported "fs or path or any" nodeJs packages, NextJS is cleaver enough to differentiate the NodeJs imports
 *      or any other imports made in "getStaticProps()" methods and bundles this seperately which doesnt include in
 *      actual Client-Side JS bundles; By this NextJS ensures this Server Side code is not visible or not shipped with
 *      regular Client-Side JS bundles
 * -> "getStaticProps()" function must always return an Object thats has "props" as a property and now this "props" is
 *      available on the component.
 *
 * -> NextJs excutes first "getStaticProps()" and after this only Regular React component is executed by providing the
 *    "props" to the React Component from this "getStaticProps()" function which executes on to the server and has all
 *      "nodeJS" capabilities
 *
 * -> all imports that are used in the "getStaticProps()" are bundled into seperate files and served on the "server"
 * -> other imports used in the React components are bundled in seperate files and served on the "client"
 *
 * -> So, there exist two bundles for both "Server Side Render" and "Client Side Render"
 *
 * -> The "server side" bundled files are never reached to the client (i.e., Browser) and not visible to end-users
 *
 */
async function getJson() {
  // async file reading

  fs.readFile(path.join(process.cwd(), "dummy_data.json"), (error, data) => {
    // console.log(`getJson function: ${JSON.parse(data).toString()}`);
  });
}
export async function getStaticProps() {
  getJson(); // demo example to show on how we can use functions declared outside getStaticprops()

  // this function retuns a data(props) on the server, thats required to serve the HTML page with this server side rendered data

  /**
   * all the files are served to the end customer from the root page of this application;
   * -> Make a note: only the files/assests present in "Public" folder are made available to serve to the customer
   *      after deploying the application. Files outside of this "public" folder cant be accessed by the end-user
   *
   * -> At that point, we can use "server-side" language to get access to the files outside of the "public" folder
   *      using nodeJS "fs" modules
   *
   */

  let filePath = path.join(process.cwd(), "dummy_data.json"); //cwd() -> current working directory

  /**
   * as discussed above, all the files served from root of the application, the "cwd()" points "/" root directory
   */

  // let jsonData = await fs.readFile(filePath); -> used on "fs/promises" which has "promise" feature

  // used on "fs" standalone import, which is not a promise based

  // fs.readFile(filePath, (error, data) => {
  //   jsonData = JSON.parse(data);
  //   console.log(jsonData);
  // });

  let jsonData = fs.readFileSync(filePath);

  /**
   * Reading files need to be done "synchronously" i.e., after fetching JSON file from root page, then only it
   *  need to execute next line i.e., returning this JSON parsed file as "props"
   *
   * -> If not doing this action "synchronously"; i.e., doing this action "asyncronously" leads to the passing
   *      of undefined as "props" to the component from this "getStaticProps()" method
   *
   * -> In order to avoid above behaviour; we perform actions "synchronously" in "getStaticProps()"
   *
   */

  return {
    props: JSON.parse(jsonData),
    revalidate: 20, // time in seconds -> ISR (Incremental Static Regeneration)
    // OUTPUT:

    /*

     * Page                                                           Size     First Load JS
        ● / (ISR: 20 Seconds)                                        2.08 kB        65.2 k

     */

    /*
    -> adding below two additional properties are optional.
    -> "notFound:true/false" -> retuns not-found page (we can have a scenario where when data is failed to get from 
        "getStaticProps()" then we can retuns object with {notFound:true})

    -> "redirect" property helps to redirect to other pages, suppose we have scenario where we can fetch data from
        "getStaticProps()" due to authorization issues, at that point we can redirect to custom-admin page to authenticate
        and get session ID.

        for more visit: https://nextjs.org/docs/basic-features/data-fetching


    notFound: false,
    redirect: {
      destination: "/user",
    },


    */
  };
}
/**
 * Now, the Big Question is : what is ISR ???
 *
 * Often, we use the pages where the dynamic data changes very frequently, in this scenario we are using "getStaticProps()"
 *  which executes only one during the build process and returns the dynamic data and "getStaticProps()" do not execute
 *  again. So the problem is when we have dynamic data that changes very frequently we need to build this and deploy again and
 *  again when ever data (props) required for this component changes.
 *
 * The solution for above problem is using ISR (Incremental Static Regeneration)
 *      Syntax: add these below property in the return object of "getStaticProps()"
 *              -> revalidate : <number> (this number represents time in seconds)
 *      Example: suppose we have -> revalidate: 10
 *
 *      when the build completed and from that point if any incoming request is coming less than 10 seconds from the
 *        last build then the old data from old build is rendered and if any incoming request is coming after
 *        10 seconds from the last build then the new build is again regenerated and replaces old build and these
 *        new data is rendered.
 *
 * -> :: This is how below pages are rendered ::
 *        Static Site Generation (SSG)
 *        Incremental Static Regeneration (ISR)
 *        Static
 *        Server
 * 
 * -> run command npm run build
 * 
info  - Generating static pages (13/13)
info  - Finalizing page optimization

Page                                                           Size     First Load JS
┌ ● / (ISR: 20 Seconds)                                        2.08 kB        65.2 kB
├   /_app                                                      0 B            63.1 kB
├ ● /[author]                                                  1.7 kB         64.8 kB
├   ├ /Kewin
├   ├ /John
├   ├ /Lewis
├   └ [+2 more paths]
├ ○ /404                                                       311 B          63.4 kB
├ ○ /blogs/[...date]                                           466 B          63.6 kB
├ ○ /location/[countrycode]                                    377 B          63.5 kB
├ ○ /location/[countrycode]/[countryname]                      389 B          63.5 kB
├ ○ /user                                                      348 B          63.4 kB
└ ○ /user/[id]                                                 359 B          63.5 kB
+ First Load JS shared by all                                  63.1 kB
  ├ chunks/ff680eee59b85193d2e4f727e153c89f4ef42a7d.e6d5e3.js  13.4 kB
  ├ chunks/framework.4b1bec.js                                 41.8 kB
  ├ chunks/main.8aabc5.js                                      6.67 kB
  ├ chunks/pages/_app.d55c5f.js                                529 B
  ├ chunks/webpack.50bee0.js                                   751 B
  └ css/6e9ef204d6fd7ac61493.css                               194 B

λ  (Server)  server-side renders at runtime (uses getInitialProps or getServerSideProps)
○  (Static)  automatically rendered as static HTML (uses no initial props)
●  (SSG)     automatically generated as static HTML + JSON (uses getStaticProps)
   (ISR)     incremental static regeneration (uses revalidate in getStaticProps)


 */
