import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const HighchartsContainer = ({ options }) => {
  return (
    <div className="rounded-xl bg-gray-200 p-4 w-full md:w-[75%] lg:w-[50%] xl:w-[33.33%] h-96 mx-auto">
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        containerProps={{ className: "h-full w-full" }}
      />
    </div>
  );
};

export default HighchartsContainer;
