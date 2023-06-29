import { AdminTicketModel } from "../../../models/skyDiveEvents.models";
import Grid from "../../shared/Grid/Grid";
import {useState} from 'react';
import { ColDef } from "../../shared/Grid/grid.types";

interface AdminFlightTicketsGridProps{
    tickets: AdminTicketModel[],
    onChange:()=>void
}

const AdminFlightTicketsGrid : React.FC<AdminFlightTicketsGridProps> = ({tickets,onChange})=>{
    const [colDefs] = useState<ColDef<AdminTicketModel>[]>([
        {
            field:'ticketNumber',
            headerName: 'شماره بلیت',
        },
        {
            field: 'ticketType',
            headerName: 'نوع بلیت',
            
        },
        {
            field: 'reservable',
            headerName: 'قابل رزرو',
            cellRenderer:(item)=> item.reservable ? 'هست' : 'نیست'
        },
        {
            field:'status',
            headerName: 'وضعیت'
        }
    ])
    return (
        <Grid colDefs={colDefs} data={tickets}></Grid>
    )
} 

export default AdminFlightTicketsGrid;