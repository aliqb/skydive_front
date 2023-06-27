import SDButton from "../../shared/Button"
import AdminFlightItem from "./AdminFlightItem";

const AdminFlighList : React.FC<{dayId:string}> = ({dayId})=>{
    return(<div>
        <div className="flex gap-2 ">
            <SDButton color="success" className="px-8">
                افزودن
            </SDButton>
            <SDButton color="failure" className="px-8">
                حذف
            </SDButton>
        </div>
        <div className="mt-8">
            <AdminFlightItem withHeader={true} />
            <AdminFlightItem  />
            <AdminFlightItem  />
            <AdminFlightItem  />
            <AdminFlightItem  />
            <AdminFlightItem  />

        </div>
    </div>)
}

export default AdminFlighList;