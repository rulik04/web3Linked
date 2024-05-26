import { useState, useEffect } from 'react';
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useUserProfile } from '../../hooks/todo'

export default function Navbar() {
  const { initialized, initializeUser, loading, transactionPending, sendFriendRequest, name } = useUserProfile();

  const [showModal, setShowModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    // Implement logout functionality here
  };
  useEffect(() => {
    if (initialized) {
      setShowModal(false);
      setLoggedIn(true);
    }
  }, [initialized]);

  return (
    <header className="flex justify-between border-b border-slate-200 px-10">
      <div className="flex items-center gap-4">
        <img src="/linkedin-symbol.png" alt="Logo" className="w-16 p-3" />
        <div className="border rounded-md flex items-center px-2 bg-slate-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="text"
            className="h-10 p-3 outline-none border-none text-white focus:outline-none bg-transparent"
            placeholder="Search"
          />
        </div>
      </div>

      <ul className="flex items-center gap-10">
        <li className=" text-center cursor-pointer text-slate-500 hover:text-black">
          <a href="/" className='flex flex-col items-center'>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z"
              clipRule="evenodd"
            />
          </svg>
          Home
          </a>
        </li>


        <li className="flex flex-col items-center text-center cursor-pointer text-slate-500 hover:text-black">
          <a href="/post">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"             className="w-6 h-6"
>
  <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
</svg>

          Post
          </a>
        </li>

        <li className="flex flex-col items-center text-center cursor-pointer text-slate-500 hover:text-black">
          <a href="/notifications">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M10 2a6 6 0 0 0-6 6c0 1.887-.454 3.665-1.257 5.234a.75.75 0 0 0 .515 1.076 32.91 32.91 0 0 0 3.256.508 3.5 3.5 0 0 0 6.972 0 32.903 32.903 0 0 0 3.256-.508.75.75 0 0 0 .515-1.076A11.448 11.448 0 0 1 16 8a6 6 0 0 0-6-6ZM8.05 14.943a33.54 33.54 0 0 0 3.9 0 2 2 0 0 1-3.9 0Z"
              clipRule="evenodd"
            />
          </svg>
          Notifications
          </a>
        </li>

        <li className="flex flex-col items-center text-center cursor-pointer text-slate-500 hover:text-black">
          <a href="/friends">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6">
  <path d="M10 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM1.615 16.428a1.224 1.224 0 0 1-.569-1.175 6.002 6.002 0 0 1 11.908 0c.058.467-.172.92-.57 1.174A9.953 9.953 0 0 1 7 18a9.953 9.953 0 0 1-5.385-1.572ZM16.25 5.75a.75.75 0 0 0-1.5 0v2h-2a.75.75 0 0 0 0 1.5h2v2a.75.75 0 0 0 1.5 0v-2h2a.75.75 0 0 0 0-1.5h-2v-2Z" />
</svg>

          Friends
            </a>
        </li>
        
        <li className="relative">
          {initialized ? (
            <button
              onClick={toggleDropdown}
              className="text-slate-500 hover:text-black cursor-pointer"
            >
                          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-5.5-2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10 12a5.99 5.99 0 0 0-4.793 2.39A6.483 6.483 0 0 0 10 16.5a6.483 6.483 0 0 0 4.793-2.11A5.99 5.99 0 0 0 10 12Z"
              clipRule="evenodd"
            />
          </svg>
              {name}
              <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 20 20" 
              fill="currentColor" 
              class="w-4 h-4 ml-1 inline-block">
                <path 
                fill-rule="evenodd" 
                d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" 
                clip-rule="evenodd" />
</svg>

            </button>
          ) : (
            <button
              className="flex flex-col items-center text-center cursor-pointer bg-violet-900 px-4 py-2 rounded-md text-white hover:bg-violet-600"
              onClick={toggleModal}
            >
              Sign In
            </button>
          )}

          {showDropdown && (
            <ul className="absolute top-8 right-0 bg-white shadow-lg rounded-md py-2 w-32 text-slate-500">
              <li
                className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                onClick={toggleDropdown}
              >
                <a href="/profile">Profile</a>
              </li>
              <li
                className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                onClick={handleLogout}
              >
                Exit
              </li>
              <li>
              <WalletMultiButton className='!bg-lime-500 w-32' />
              </li>
            </ul>
          )}
        </li>
      </ul>

      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="rounded-lg bg-sky-900 w-96 p-4 h-56">
            <div className='flex justify-between mb-10'>
              <h2 className="text-2xl">Sign In</h2>
              <button className="" onClick={toggleModal}>X</button>
            </div>
            <div className="flex justify-center">
              <WalletMultiButton/>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
