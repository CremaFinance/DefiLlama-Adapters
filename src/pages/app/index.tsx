import { useRouter } from "next/router";
import { useEffect } from "react";

const App = () => {
  const router = useRouter();
  useEffect(() => {
    if (router.asPath.match(/^\/app$/)) router.push("/app/staking");
  }, [router]);
  return null;
};

export default App;
