const CountCard = ({ title, count }) => {
  return (
    <div className="flex font-medium flex-col items-center justify-center w-[150px] h-[150px] bg-white rounded-xl p-5 cursor-pointer shadow-slate-300 shadow-md hover:mt-[-5px] duration-300 flex-1">
      <h1 className="font-nunito text-2xl mb-5 text-center">{title}</h1>
      <p className="text-xl text-center">{count}</p>
    </div>
  );
};

export default CountCard;
