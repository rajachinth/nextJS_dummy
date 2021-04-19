import { useRouter } from "next/router";

export default function AllBlogs() {
  const router = useRouter();
  let el = <p>loading...</p>;
  if (!router.query.hasOwnProperty("date")) return el;
  else if (router.query.date.length >= 3)
    el = (
      <div>
        <h1> Year: {router.query.date[0]}</h1>
        <h1> Moth: {router.query.date[1]}</h1>
        <h1> Date: {router.query.date[2]}</h1>
      </div>
    );
  else if (router.query.date.length == 2)
    el = (
      <div>
        <h1> Year: {router.query.date[0]}</h1>
        <h1> Moth: {router.query.date[1]}</h1>
      </div>
    );
  else
    el = (
      <div>
        <h1> Year: {router.query.date[0]}</h1>
      </div>
    );

  function navigateFunc() {
    // method 1
    router.replace({
      pathname: "/",
    });

    // method 2
    // router.replace('/')

    /**
     * use replace() or push() or reload() etc..,
     * console.log the "router" object to know more on other methods & properties available
     *
     */
  }
  return (
    <div>
      {el}
      <button onClick={navigateFunc}>Home Page</button>
    </div>
  );
}
