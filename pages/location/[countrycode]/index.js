import { useRouter } from "next/router";

export default function CountryCode() {
  let routeData = useRouter();

  function navigateFunc() {
    routeData.replace({
      pathname: "/",
    });
  }

  return (
    <div>
      <h1>user entered country code: {routeData.query.countrycode}</h1>
      <button onClick={navigateFunc}>Home Page</button>
    </div>
  );
}
