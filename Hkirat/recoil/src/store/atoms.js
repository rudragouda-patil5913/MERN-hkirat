import { atom, selector } from "recoil";

export const notificationAtom = atom({
  key: "notiificationCount",
  default: 106,
});

export const jobsAtom = atom({
  key: "jobsCount",
  default: 0,
});

export const networkAtom = atom({
  key: "networkCount",
  default: 34,
});

export const messageAtom = atom({
  key: "messageCount",
  default: 21,
});

export const totalCountSelector = selector({
  key: "totalCount",
  get: ({ get }) => {
    const notificationCount = get(notificationAtom);
    const networkCount = get(networkAtom);
    const messageCount = get(messageAtom);
    const jobsCount = get(jobsAtom);
    const total = notificationCount + networkCount + messageCount + jobsCount;
    return total;
  },
});
