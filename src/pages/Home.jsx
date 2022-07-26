import Navbar from "./Navbar";

import Message from "./Message";

const Home = (userLoginInfo) => {
  console.log(userLoginInfo);
  return (
    <div className="home">
      <Navbar />
      <Message />
      Home
    </div>
  );
};

export default Home;
