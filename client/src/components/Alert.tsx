import { useRecoilState } from "recoil";
import { alertAtom } from "../state/alert";
import { useEffect } from "react";

export default function Alert() {
  const [alert, setAlert] = useRecoilState(alertAtom);

  useEffect(() => {
    if (alert.message) {
      setTimeout(() => {
        setAlert({
          message: "",
          type: "success",
          position: "top-right",
          show: false,
        });
      }, 3000);
    }
  }, [alert, setAlert]);

  if (!alert.show) return null;

  let position, bgColor;
  if (alert.position === "top-right") position = "top-2 right-2";
  if (alert.position === "top-left") position = "top-2 left-2";
  if (alert.position === "bottom-right") position = "bottom-2 right-2";
  if (alert.position === "bottom-left") position = "bottom-2 left-2";
  if (alert.type === "error") bgColor = "red-500";
  if (alert.type === "success") bgColor = "green-500";
  if (alert.type === "info") bgColor = "orange-500";

  return (
    <div
      className={`fixed ${position} block w-[200px] p-4 text-base leading-5 text-white bg-${bgColor} rounded-lg opacity-100 font-regular flex`}
    >
      <p>{alert.message}</p>
      <div className="flex-grow"></div>
      <button
        onClick={() =>
          setAlert((prev) => ({
            ...prev,
            show: false,
          }))
        }
      >
        X
      </button>
    </div>
  );
}
