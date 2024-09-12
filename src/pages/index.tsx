import { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import GitImage from "@/assets/svg/GitImage";
import Search from "@/assets/svg/Search";
import ProfileIcon from "@/assets/svg/ProfileIcon";
import * as Dialog from "@radix-ui/react-dialog";
import { FaSpinner } from "react-icons/fa";
import { IoClose } from "react-icons/io5"; // Close Icon
import Image from "next/image";


interface Repo {
  id: number;
  name: string;
  html_url: string;
  description?: string;
}

// const fetchUserData = async (username: string) => {
//   const { data } = await axios.get(`https://api.github.com/users/${username}`);
//   return data;
  
// };

// const fetchUserRepos = async (username: string) => {
//   const { data } = await axios.get(
//     `https://api.github.com/users/${username}/repos`
//   );
//   return data;
// };


const fetchUserData = async (username: string) => {
  console.log("Fetching user data for:", username); // Log when the function is called
  const { data } = await axios.get(`https://api.github.com/users/${username}`);
  console.log("User data received:", data); // Log the response data
  return data;
};

const fetchUserRepos = async (username: string) => {
  console.log("Fetching repositories for:", username); // Log when the function is called
  const { data } = await axios.get(
    `https://api.github.com/users/${username}/repos`
  );
  console.log("Repositories data received:", data); // Log the response data
  return data;
};

const Index: NextPage = () => {
  const [username, setUsername] = useState("");
  const [searchUsername, setSearchUsername] = useState("");

  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useQuery(["user", searchUsername], () => fetchUserData(searchUsername), {
    enabled: !!searchUsername,
    onError: (error) => console.log("Error fetching user data:", error), // Log any errors
  });

  const { data: repos, isError: isReposError } = useQuery(
    ["repos", searchUsername],
    () => fetchUserRepos(searchUsername),
    {
      enabled: !!searchUsername && !!user,
      onError: (error) => console.log("Error fetching repositories:", error), // Log any errors
    }
  );

  const handleSearch = () => {
    console.log("Searching for:", username); //
    setSearchUsername(username);
  };

  const GitHublink = "https://github.com/";
  console.log("Checking current user data:", user); // Log current user data
  console.log("Checking current repositories data:", repos); // Log current repositories data

  return (
    <div className="flex h-screen w-full items-center justify-center bg-custom-bg bg-cover bg-center md:items-center">
      <Head>
        <title>Github profile finder</title>
        <meta name="description" content="GitHub Profile Finder" />
      </Head>

      <div className="relative flex h-[400px] w-[650px] flex-col items-center justify-center rounded-md bg-[#49bbbb]">
        <div className="absolute top-0 left-0 m-4">
          <Link href={GitHublink} target="_blank" rel="noopener noreferrer">
            <p className="cursor-pointer">
              <GitImage />
            </p>
          </Link>
        </div>

        <div className="relative flex h-64 w-[600px] flex-col items-center justify-center gap-4 rounded-md px-6 pt-4">
          <div className="mb-4 h-auto w-full rounded-lg p-8 shadow-custom-lg">
            <div className="relative bottom-8 w-full flex">
              <div className="relative top-10 right-2 hidden w-auto pb-1 md:block md:max-w-[544px]">
                <p>
                  <ProfileIcon />
                </p>
              </div>

              <h1 className="absolute top-16 pl-11 font-Exo text-[18px] font-semibold leading-[32px] tracking-[-0.02em] text-black">
                GitHub Profile
              </h1>
            </div>

            <div className="flex w-full flex-col items-start justify-start gap-4">
              <div className="flex w-full">
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-md border p-2 text-[#252525] hover:border-blue-300 outline-none"
                />
              </div>

              {/* Radix Dialog for user profile display */}
              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <button
                    onClick={handleSearch}
                    className="absolute right-14 hover:bg-blue-300 rounded-r-md bg-[#6c757d] p-3 text-white"
                  >
                    <Search />
                  </button>
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay
                    className="fixed w-full inset-0 bg-[#252525] bg-opacity-90"
                    onClick={(e) => e.stopPropagation()} // stops overlay from triggering events inside the modal
                  />
                  <Dialog.Content className="fixed inset-0 flex items-center justify-center p-6">
                    <div className="relative w-full max-w-lg p-6 bg-white rounded-md shadow-lg top-7">
                      <Dialog.Close asChild>
                        <button
                          className="absolute top-4 right-4 text-[#000] hover:text-[#f13939] p-2 rounded-full bg-slate-300"
                          aria-label="Close"
                        >
                          <IoClose size={20} />
                        </button>
                      </Dialog.Close>

                      {isUserLoading && (
                        <div className="flex justify-center items-center">
                          <FaSpinner
                            className="animate-spin text-teal-500"
                            size={24}
                          />
                        </div>
                      )}

                      {!isUserLoading && user && (
                        <div className="flex flex-col items-center">
                          <div className="mb-4">
                            <Image
                              src={user.avatar_url}
                              alt={user.login}
                              width={150} // Specify a width
                              height={150} // Specify a height
                              className="w-48 h-48 rounded-full"
                            />

                            <a
                              href={user.html_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 mt-2 inline-block"
                            >
                              View Profile
                            </a>
                          </div>

                          <div className="flex flex-col items-center">
                            <h2 className="text-xl font-bold">{user.name}</h2>
                            <p className="text-gray-600">{user.bio}</p>

                            <div className="flex space-x-4 mt-2">
                              <p className="font-semibold">
                                Followers:{" "}
                                <span className="text-blue-700">
                                  {user.followers}
                                </span>
                              </p>
                              <p className="font-semibold">
                                Following:
                                <span className="text-green-700">
                                  {user.following}
                                </span>
                              </p>

                              <p className="font-semibold">
                                Repos:
                                <span className="text-blue-700">
                                  {user.public_repos}
                                </span>
                              </p>
                            </div>
                          </div>

                          {repos && (
                            <div className="w-full max-h-80 overflow-y-auto">
                              {repos.slice(0, 5).map((repo: Repo) => (
                                <div
                                  key={repo.id}
                                  className=" border border-blue-300 p-2 rounded-md mb-2"
                                >
                                  <a
                                    href={repo.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 text-sm"
                                  >
                                    {repo.name.toLocaleLowerCase()}
                                  </a>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {isUserError && (
                        <p className="text-sm font-Exo text-[#f13939]">
                          Error fetching user profile...try again
                        </p>
                      )}
                      {isReposError && (
                        <p className="text-sm font-Exo text-[#f13939]">
                          Error fetching user repositories...try again
                        </p>
                      )}
                    </div>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
