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
      className={`fixed ${position} block p-4 text-base leading-5 text-white bg-${bgColor} rounded-lg opacity-100 font-regular flex`}
      style={{
        minWidth: "200px",
      }}
    >
      <p>{alert.message}</p>
      <div className="flex-grow"></div>
      <button
        className="mx-2"
        onClick={() =>
          setAlert((prev) => ({
            ...prev,
            show: false,
          }))
        }
      >
        <svg
          fill="#fff"
          version="1.1"
          id="Capa_1"
          viewBox="0 0 490 490"
          className="w-4 h-4"
        >
          <polygon
            points="456.851,0 245,212.564 33.149,0 0.708,32.337 212.669,245.004 0.708,457.678 33.149,490 245,277.443 456.851,490 
	489.292,457.678 277.331,245.004 489.292,32.337 "
          />
        </svg>
      </button>
    </div>
  );
}
