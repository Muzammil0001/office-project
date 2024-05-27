const Notify = () => {
  const time = new Date().toLocaleTimeString();
  const date = new Date().toLocaleDateString();
  return (
    <>
      <div className="w-full ">
        <h1 className="text-3xl text-center my-5">Notifications</h1>
        <div className="w-full items-center justify-center min-h-16 ">
          <div className="mb-2  w-full bg-white border border-gray-300 flex md:flex-row h-full flex-col md:items-center p-3 gap-5">
            <div className=" w-full p-2 justify-center md:justify-end items-center ">
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus,
                placeat.
              </p>
            </div>
            <div className=" w-full max-w-40  p-2 text-nowrap">
              {date}
              <br />
              <span className="text-sm">{time}</span>
            </div>
          </div>

          <div className=" w-full bg-white border border-gray-300 flex md:flex-row h-full flex-col md:items-center p-3 gap-5">
            <div className="mb-2  w-full p-2 justify-center md:justify-end items-center ">
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus,
                placeat.
              </p>
            </div>
            <div className=" w-full max-w-40  p-2 text-nowrap">
              {date}
              <br />
              <span className="text-sm">{time}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notify;
