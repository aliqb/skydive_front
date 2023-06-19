import SDCard from "../../../components/shared/Card";
import SkyDiveEventDayItem from "../../../components/skyDiveEvents/SkyDiveEventDayItem";

const SkyDiveEventDaysPage: React.FC = () => {
  return (
    <SDCard>
      <header className="flex flex-col items-center gap-3 mb-5">
        <h2 className="text-center font-bold text-lg">رویداد زیبا کنار</h2>
        <div className="flex justify-between text-slate-600 gap-8">
          <p>1 خرداد تا 3 خرداد</p>
          <p>53 ظرفیت خالی</p>
        </div>
        <a className="text-blue-700 font-semibold">قوانین و شرایط</a>
      </header>
      <main className="w-full flex flex-wrap">
        <div className=" my-3 px-3 w-full md:w-1/2">
          <SkyDiveEventDayItem />
        </div>
        <div className=" my-3 px-3 w-full md:w-1/2">
          <SkyDiveEventDayItem />
        </div>
        <div className=" my-3 px-3 w-full md:w-1/2">
          <SkyDiveEventDayItem />
        </div>
        <div className=" my-3 px-3 w-full md:w-1/2">
          <SkyDiveEventDayItem />
        </div>
        <div className=" my-3 px-3 w-full md:w-1/2">
          <SkyDiveEventDayItem />
        </div>
        <div className=" my-3 px-3 w-full md:w-1/2">
          <SkyDiveEventDayItem />
        </div>
      </main>
    </SDCard>
  );
};
export default SkyDiveEventDaysPage;
