import { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import type { NextPage } from "next";
import UserProfile from "@/component/UserProfile";
import RepoList from "@/component/RepoList";
import Head from "next/head";
import Link from "next/link";
import GitImage from "@/assets/svg/GitImage";
import Search from "@/assets/svg/Search";


const fetchUserData = async (username: string) => {
  const { data } = await axios.get(`https://api.github.com/users/${username}`);
  return data;
};

const fetchUserRepos = async (username: string) => {
  const { data } = await axios.get(
    `https://api.github.com/users/${username}/repos`
  );
  return data;
};

const Index: NextPage = () => {
  const [username, setUsername] = useState("");
  const [searchUsername, setSearchUsername] = useState("");

  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useQuery(
    ["user", searchUsername],
    () => fetchUserData(searchUsername),
    { enabled: !!searchUsername }
  );

  const {
    data: repos,
    isLoading: areReposLoading,
    isError: isReposError,
  } = useQuery(
    ["repos", searchUsername],
    () => fetchUserRepos(searchUsername),
    { enabled: !!searchUsername && !!user }
  );

  const handleSearch = () => {
    setSearchUsername(username);
  };

  return (
    <div className="flex h-screen w-full  items-center justify-center bg-custom-bg bg-cover bg-center md:items-center">
      <Head>
        <title>Github profile finder</title>
        <meta name="description" content="Login to your Hydrogen Account" />
      </Head>
      <div className="relative rounded-md flex h-[screen] w-[600px] flex-col gap-4 bg-white px-6 pt-4">
        <div className="mb-4 h-auto w-full rounded-lg p-8 shadow-custom-lg">
          <div className=" flex justi">
            <div className="z-[1] hidden w-auto pb-1 md:block md:max-w-[544px]">
              <Link href="/" id="desktop-logo">
                <p className="cursor-pointer ">
                  <GitImage />
                </p>
              </Link>
            </div>
            <h1 className=" relative pl-2 top-3 font-mailSansRoman text-[24px] font-semibold leading-[32px] tracking-[-0.02em] text-black">
              Enter Users name
            </h1>
          </div>

          <div className="flex w-full flex-col items-start justify-start gap-4 font-mailSansRoman">
            <div className="flex w-full">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border outline-none p-2 text-[#252525] rounded-l-lg w-full"
              />
              <button
                onClick={handleSearch}
                className="bg-[#6c757d] text-white p-2 rounded-r-lg hover:bg-blue-600"
              >
                <Search />
              </button>
            </div>
            {isUserLoading && <p>Loading user data...</p>}
            {isUserError && <p>Error fetching user data.</p>}
            {user && <UserProfile user={user} />}
            {areReposLoading && <p>Loading repositories...</p>}
            {isReposError && <p>Error fetching repositories.</p>}
            {repos && <RepoList repos={repos} />}
          </div>
        </div>
      </div>
    </div>

  );
};

export default Index;
