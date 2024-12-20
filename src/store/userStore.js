import {create} from "zustand";
import {v4 as uuidv4} from "uuid";

const UserStore = (set) => ({
    username: "Soumay Sanpui",
    userid: uuidv4(),
    active_api: 4,
    total_calls: 37,
    usageStatus: false,
    settingSync: false,

    setUserDetails: (details) => set((state) => ({
        ...state,
        ...details,
    })),

    resetUser: () => set({
        active_api: 0,
        total_calls: 0,
        usageStatus: "InActive",
        settingSync: false
    }),
});

const useUserStore = create(UserStore);

export default useUserStore;
