import Card from "components/card";

const Widget = ({ icon, title, subtitle, currency }) => {
  return (
    <Card extra="!flex-row flex-grow items-center rounded-[20px] px-2 lg:px-4">
      <div className="h-[90px] w-auto flex-row items-center hidden sm:flex">
        <div className="rounded-full bg-lightPrimary px-1 lg:p-3">
          <span className="flex items-center text-brand-500">
            {icon}
          </span>
        </div>
      </div>

      <div className="h-[90px] ml-0 lg:ml-4 flex flex-col justify-center w-full">
        <p className="font-dm text-xs md:text-sm font-medium text-gray-600">{title}</p>
        <div className="flex w-full justify-between items-center">
          <h4 className="text-lg lg:text-xl font-bold text-navy-700">
            {subtitle}
          </h4>
          <span className="text-[#999] text-xs md:text-md lg:text-lg">{currency}</span>
        </div>
      </div>
    </Card>
  );
};

export default Widget;
