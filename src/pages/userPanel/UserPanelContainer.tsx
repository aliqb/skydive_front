import { Outlet } from "react-router-dom";
import UserHeader from "../../components/userPanel/UserHeader";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { fetchBasket } from "../../store/basket";

const UserPanelContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const genralInfoSet = useAppSelector((state) => state.auth.genralInfoSet);
  useEffect(() => {
    if (genralInfoSet) {
      dispatch(fetchBasket());
    }
  }, [dispatch, genralInfoSet]);
  return (
    <>
      <UserHeader></UserHeader>
      <div className="pt-[60px]">
        <Outlet></Outlet>
      </div>
    </>
  );
};

export default UserPanelContainer;
