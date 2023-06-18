import SDCard from "../shared/Card"

const SkyDiveEventCard : React.FC = (props)=>{
    return (
        <SDCard className="!p-0 border-gray-500 ">
            <div className="w-full aspect-[2] relative">
                <img src="https://picsum.photos/id/237/200/300" alt="" className="w-full h-full object-cover rounded-t-lg" />
            </div>
            <div className="py-4 px-4">
                <p className="font-bold text-lg">رویدارد زیتب</p>
                <div className="flex justify-between mt-2 text-slate-600 flex-wrap">
                    <p className="my-1">1 خرداد تا 3 خرداد</p>
                    <p className="my-1">40 ظرفیت خالی</p>
                </div>
            </div>
        </SDCard>
    )
}

export default SkyDiveEventCard;