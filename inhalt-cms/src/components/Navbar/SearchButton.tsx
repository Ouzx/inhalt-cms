import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-8 h-8 hover:bg-slate-400 hover:bg-opacity-10 rounded-full p-1"
  >
    <path
      fillRule="evenodd"
      d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
      clipRule="evenodd"
    />
  </svg>
);

const SearchButton = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const onClick = () => {
    console.log("clicked");
    const searchValue = inputRef.current?.value;
    if (searchValue!.length < 3) return;
    navigate(`/search/${searchValue}`);
    inputRef.current!.value = "";
  };

  const onFocus = () => {
    inputRef.current?.focus();
  };
  return (
    <div
      onClick={onFocus}
      className="relative self-center flex flex-1 flex-row justify-center items-center [&>*:nth-child(even)]:focus-within:scale-125 [&>*:nth-child(even)]:focus-within:animate-pulse [&>*:nth-child(even)]:focus-within:translate-x-24 child:focus-within:scale-100 child:focus-within:translate-x-0 "
    >
      <div className="scale-x-0 translate-x-20 transition ease-in duration-300 delay-300">
        <input
          ref={inputRef}
          className="w-40 h-5 border border-black rounded-sm p-1"
          onKeyDown={(e) => {
            if (e.key === "Enter") onClick();
          }}
        />
      </div>
      <button
        className="absolute self-center transition ease-in duration-300 z-10 "
        onClick={onClick}
        title="Search"
      >
        <SearchIcon />
      </button>
    </div>
  );
};

export default SearchButton;
