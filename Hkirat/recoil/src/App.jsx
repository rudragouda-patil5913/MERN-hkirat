import { useState } from "react";
import "./App.css";
import { RecoilRoot, useRecoilValue } from "recoil";
import {
  jobsAtom,
  messageAtom,
  networkAtom,
  notificationAtom,
  totalCountSelector,
} from "./store/atoms";

function App() {
  const [count, setCount] = useState(0);

  return (
    <RecoilRoot>
      <MainApp />
    </RecoilRoot>
  );
}

function MainApp() {
  const notificationCount = useRecoilValue(notificationAtom);
  const networkCount = useRecoilValue(networkAtom);
  const messageCount = useRecoilValue(messageAtom);
  const jobsCount = useRecoilValue(jobsAtom);
  const totalCount = useRecoilValue(totalCountSelector)

  // const [networkCount,setNetworkCount] = useRecoilState(networkAtom);


  //this way or use Selectors
  // const totalCount = useMemo(() => {
  //   return notificationCount + networkCount + messageCount + jobsCount;
  // }, [notificationCount, networkCount, messageCount, jobsCount]);

  return (
    <div>
      <button>Home</button>
      <button>
        Notification({notificationCount > 99 ? "99+" : notificationCount})
      </button>
      <button>Jobs({jobsCount})</button>
      <button>Network({networkCount})</button>
      <button>Message({messageCount})</button>
      <button>me({totalCount})</button>
    </div>
  );
}

export default App;
