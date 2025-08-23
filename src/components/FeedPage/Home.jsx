import React from "react";

import Header from "../Header.jsx";
import UserProfile from "./userProfile.jsx";
import UsersList from "./usersList.jsx";
import CreatePost from "./CreatePost.jsx";
import Feed from "./Feed.jsx";

const Home = () => {
  const [profileTrigger, setProfileTrigger] = React.useState(0);
  const [postTrigger, setPostTrigger] = React.useState(0);
  const handlePostCreated = () => setPostTrigger((prev) => prev + 1);
  const handleProfileUpdate = () => setProfileTrigger((prev) => prev + 1);

  return (
    <div className="min-h-screen bg-gray-200">
      <Header key={`header-${profileTrigger}`} />
      <main className="container mx-auto  mt-4 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-6">
        <div className=" hidden md:block md:col-span-2">
          <UserProfile
            key={`profile-${profileTrigger}`}
            onProfileUpdate={handleProfileUpdate}
          />
        </div>
        <div className=" md:col-span-3 lg:col-span-3">
          <CreatePost onPostCreated={handlePostCreated} />
          <Feed key={postTrigger} />
        </div>
        <div className=" hidden lg:block lg:col-span-2">
          <UsersList />
        </div>
      </main>
    </div>
  );
};

export default Home;
