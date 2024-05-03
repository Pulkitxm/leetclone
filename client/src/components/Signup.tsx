import { Link, useNavigate } from "react-router-dom";
import { handleRegister } from "../utils/signup";
import { useSetRecoilState } from "recoil";
import { alertAtom } from "../state/alert";
import { useState } from "react";
import Loader from "./Loader";

export default function Signup() {
  const navigate = useNavigate();
  const setAlert = useSetRecoilState(alertAtom);
  const [loading, setLoading] = useState<boolean>(false);
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      const email = (e.currentTarget.elements[0] as HTMLInputElement).value;
      const password = (e.currentTarget.elements[1] as HTMLInputElement).value;
      const rePassword = (e.currentTarget.elements[2] as HTMLInputElement)
        .value;

      setLoading(true);
      const res = await handleRegister(email, password, rePassword);
      if (res && res.message && res.type) {
        if (res.type === "error") {
          setAlert({
            message: res.message,
            type: "error",
            position: "bottom-right",
            show: true,
          });
          setLoading(false);
        } else {
          setAlert({
            message: res.message,
            type: "success",
            position: "bottom-right",
            show: true,
          });
          setLoading(false);
          navigate("/login");
        }
      }
    } catch (err) {
      setAlert({
        message: "An unexpected error occurred",
        type: "error",
        position: "bottom-right",
        show: true,
      });
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
      <Link
        to=""
        className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
      >
        Leetcode
      </Link>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Sign up to your account
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={handleFormSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="re-password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Re Enter Password
              </label>
              <input
                type="re-password"
                name="re-password"
                id="re-password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>

            {loading ? (
              <Loader border />
            ) : (
              <button
                type="submit"
                className="border w-full bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 dark:text-white"
              >
                Sign up
              </button>
            )}
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
