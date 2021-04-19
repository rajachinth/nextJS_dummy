import { useRouter } from "next/router";
import useSWR from "swr"; // Stale While ReValidate hook by NexJs (very powerful hook for data fetching in NextJS)

export default function CountryName() {
  let routeData = useRouter();

  function navigateFunc() {
    routeData.replace({
      pathname: "/",
    });
  }

  /********************** useSWR() data fetch hook by NextJS-Versel *********************
   *
   * -> refer more @ https://swr.vercel.app/
   * -> SWR - Stale While Re-Validate
   * -> The name “SWR” is derived from stale-while-revalidate, a HTTP cache invalidation strategy popularized by
   *      HTTP RFC 5861. SWR is a strategy to first return the data from cache (stale), then send the fetch request
   *      (revalidate), and finally come with the up-to-date data.
   *
   * -> we can trigger "fetch()" API call in regular intervals and also while internet connection lost and while connection
   *      established again.
   *
   * -> Refer official docs for more advanced knowledge on useSWR() hook developed by NextJs Team
   * -> https://swr.vercel.app/docs/options
   *
   */

  // ******************************************************************************************

  // refer docs for more advanced topics: https://swr.vercel.app/docs/options

  let fetcher = (URL) => fetch(URL).then((res) => res.json());

  let { data, error, isValidating, revalidate, mutate } = useSWR(
    "https://jsonplaceholder.typicode.com/users",
    fetcher,
    {
      refreshInterval: 10000, // milliseconds
    }
  );

  console.log(data);

  // ******************************************************************************************

  return (
    <div>
      <h1 style={{ textAlign: "center", color: "blue" }}>
        useSWR() hook by NextJs-Versel
      </h1>
      <h3>This pages triggers fetch API request in every 10 seconds</h3>
      <h6>user entered country code: {routeData.query.countrycode}</h6>
      <h6>user entered country name: {routeData.query.countryname}</h6>

      <button onClick={navigateFunc}>Home Page</button>
    </div>
  );
}

/** ************************ Data fetching in Client side (Browser) ************************
 *
 * We will have some use cases where, fetching or pre-rendering the page on the server is not very efficient due to rapid
 *    changes on the page props that changes multiple times in a second (example: stock values)
 *
 * -> In this scenario, we can use traditional React way of rendering the pages on the Browser i.e., Client
 *
 * -> But, NextJs will defaulty pre-render 1st level of these React Pages. i.e., find below example::
 *
 *  function GetData()
 * {
 *    let {stateValue,updateState} = useState({ isLoading:false, data:[]})
 *
 *    useEffect(()=>{
 *        updateState({isLoading:true,date:[]});
 *        fetch('<url>).then(data => updateState({isLoading:false,date:data}))
 *    })
 *
 *    if (stateValue.data.length == 0) return <p>loading.....</p>
 *
 *    return <ul>{ stateValue.data.map(e => <li>{e.title}</li></ul> )
 *
 * }
 *
 * IMPORTANT: UseEffect() will execute only after the component function renders completelt for the first time.
 *
 * -> Now, when NextJs initially sees these page; it doesnt take a look at "useEffect()" hooks and directly see
 *      what it renders first when these component executes
 *  So, initially component state is -> useState({ isLoading:false, data:[]})
 *  And, the below condition get passed
 *    ->  if (stateValue.data.length == 0) return <p>loading.....</p>
 *  So, the 1st level HTML page of this component is "<p>loading.....</p>"
 *  Now, NextJs pre-renders this 1st level page of the component & later when data retrieved from the useEffect(), the
 *    component is again updated with latest data(props)
 *
 * ************** THESE IS THE 1ST LEVEL DEFAULT RENDER PAGE CREATED BY NEXTJS and this behaviour
 *                happens with all components in NextJS *****************
 *
 */
