const Features = () => {
  const feature = [
    {
      id: 1,
      heading: "Leaderboard",
      description: "Compete on leaderboards and monitor your learning journey.",
    },
    {
      id: 2,
      heading: "Gamification",
      description: " The goal of gamification is to enhance learning",
    },
    {
      id: 3,
      heading: "Seamless Interaction",
      description:
        "Engage in quizzes, track progress, and participate in discussions.",
    },
    {
      id: 4,
      heading: "Discussion Forums",
      description: "Connect, Share, and Learn Together",
    },
  ];

  return (
    <>
      <div className="min-h-[450px]  flex flex-wrap justify-center mx-auto items-center gap-5 xl:justify-center py-5 px-2">
        {feature.map((item) => {
          return (
            <>
              <div
                className="border border-gray-300 flex font-medium flex-col items-center w-[300px] h-[350px] rounded-3xl py-20 px-5 cursor-pointer shadow-slate-300 shadow-md hover:mt-[-5px] duration-300"
                key={item.id}
              >
                <h1 className=" font-nunito text-4xl mb-5 text-center">
                  {item.heading}
                </h1>
                <p className="text-lg text-center">{item.description}</p>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Features;
