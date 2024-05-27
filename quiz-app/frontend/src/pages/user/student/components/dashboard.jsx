import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const Dashboard = () => {
  const options = {
    chart: {
      type: "line",
    },
    title: {
      text: "My Score",
    },
    series: [
      {
        name: "Score",
        data: [1, 1, 3, 4, 4, 8, 2, 4],
      },
    ],
  };

  return (
    <>
      <div className="w-full  p-2 ">
        <div className="flex justify-center gap-5 items-center flex-wrap mb-5">
          {[
            { id: 1, title: "Rank" },
            { id: 2, title: "No. Courses" },
            { id: 3, title: "Attempted Quiz" },
            { id: 4, title: "Notification" },
          ].map((item) => {
            return (
              <>
                <div
                  key={item.id}
                  className=" flex font-medium flex-col items-center justify-center w-[150px] h-[150px] bg-white rounded-xl p-5 cursor-pointer shadow-slate-300 shadow-md hover:mt-[-5px] duration-300 flex-1"
                >
                  <h1 className=" font-nunito text-2xl mb-5 text-center">
                    {item.title}
                  </h1>
                  <p className="text-xl text-center">{item.count}</p>
                </div>
              </>
            );
          })}
        </div>

        <div className="flex sm:flex-row flex-col justify-center items-center flex-wrap p-0 sm:p-5 gap-5 mb-5">
          <div className="flex-1 rounded-xl bg-gray-200 p-4 w-full md:w-[75%] lg:w-[50%] xl:w-[33.33%] h-96 mx-auto">
            <HighchartsReact
              highcharts={Highcharts}
              options={options}
              containerProps={{ className: "h-full w-full" }}
            />
          </div>
          <div className="flex-1 rounded-xl bg-gray-200 p-4 w-full md:w-3/4 lg:w-1/2 xl:w-1/3 h-96 mx-auto">
            <HighchartsReact
              highcharts={Highcharts}
              options={options}
              containerProps={{ className: "h-full w-full" }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
