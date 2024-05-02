import { atom } from "recoil";

type Position = "top-right" | "top-left" | "bottom-right" | "bottom-left" | "center";
type Alert = {
    message: string;
    type: "error" | "success" | "info";
    position: Position;
    show: boolean;
};

export const alertAtom = atom<Alert>({
    key: "alert",
    default: {
        message: "",
        type: "info",
        position: "bottom-right",
        show: false,
    },
});