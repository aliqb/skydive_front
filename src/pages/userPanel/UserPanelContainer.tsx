import { Outlet } from "react-router-dom";
import UserHeader from "../../components/userPanel/UserHeader";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { fetchBasket } from "../../store/basket";
import { fetchMessages } from "../../store/messages";
const UserPanelContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const genralInfoSet = useAppSelector((state) => state.auth.genralInfoSet);
  useEffect(() => {
    let interval: number;
    if (genralInfoSet) {
      console.log('here')
      dispatch(fetchBasket());
      dispatch(fetchMessages({}))
       interval = setInterval(()=>{
        dispatch(fetchMessages({}))
      },60000)
    }
    return ()=>clearInterval(interval)
  }, [dispatch, genralInfoSet]);
  return (
    <div className="w-screen h-screen flex flex-col ">
      <UserHeader></UserHeader>
      <div className=" w-full flex flex-1 relative overflow-hidden">
        <div id="userMainContainer" className="flex-auto  overflow-auto ltr scroll-smooth">
          <div className="rtl">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPanelContainer;
