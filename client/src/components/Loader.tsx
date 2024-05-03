export default function Loader({border}:{border?:boolean}) {
  return (
    <div
      className={`${border?"border":""} w-full bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 dark:text-white dark:invert flex space-x-2 justify-center items-center h-10`}
    >
      <span className="sr-only">Loading...</span>
      <div className="h-3 w-3 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-3 w-3 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-3 w-3 bg-black rounded-full animate-bounce"></div>
    </div>
  );
}
