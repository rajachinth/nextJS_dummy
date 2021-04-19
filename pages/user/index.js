import { useRouter } from "next/router";

export default function User() {
  let routeData = useRouter();

  function navigateFunc() {
    routeData.replace({
      pathname: "/",
    });
  }

  return (
    <div>
      <h1>User Component</h1>
      <button onClick={navigateFunc}>Home Page</button>
    </div>
  );
}
