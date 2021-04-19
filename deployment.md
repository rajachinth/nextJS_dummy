### NextJS Deployment

---

- NextJS can be deployed in two methods
  1.Standard Build
  2.Full Static Build
- In **Standard Build** we use nodeJS server to run our application, as we know NextJS has the server-side code that need to run on the nodeJS server like (getStaticProps() & getServerSideProps()), other nodeJS and "api" folder to run REST API's
- Since in NextJS we re-validate the page and re-render again on the server using "revalidate" key and other features require nodeJS server.

```JavaScript
// Code Syntax in package.json
next build
```

---

- In **Full Static Build** we dont use any nodeJS sever to run our application, as we completely 100% pre render all the content and serve those pre-rendered content to the client.
- EXAMPLE: A blog post application is an good example, where we dont required any core backend support or high-level user interactive forms and other complex behaviour.
- In such scenarios, we can use this approach by pre-rendering all the pages and send to the client.
- In this approach, we cant use all NextJS features that run on the fly on the server.
- When ever author changed the content in any of the root files that are used to displayed to the end user as blog posts, developer again need to to build the project and bundle the things and push it to production, as we cant use "revalidate" key in these deployement method, as we dont have NodeJS server to implement all nextJS features to re-render pages on the server within the defined time(seconds)

```JavaScript
// Code Syntax in package.json
next export
```

---

#### NextJs Deployment Config Files

- Use **next.config.js** to overwrite the default behaviour of the configurations
- Visit [page](https://nextjs.org/docs/api-reference/next.config.js/introduction) to learn more of this configurations
- Use NodeJS syntax, since NextJs uses nodeJs server to build the files

## Vercel & Netlify & Heroku (Cloud Hosting Platforms)

- Deploy the NextJS applications in **Vercel**, same Vercel team developed the NextJS framewokr.
- Vercel is a straight way of deploying NextJs and many other application developed in different kinds of web-stack includes **Angular,Vue,React,NextJs and many other**
- Integrate both Github and Vercel, so that when ever we commit new changes to the Github repo, then Vercel with build automatically again without any developer doing that manually
