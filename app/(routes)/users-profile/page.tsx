"use client"

import CardList from "./components/cardLists"

const UsersProfile = () => {
  return (
    <div className="flex justify-center items-center w-full h-full flex-col gap-3 p-10">
      <h1 className="text-3xl font-bold">Explore Users Profile</h1>
      <CardList />
    </div>
  )
}

export default UsersProfile