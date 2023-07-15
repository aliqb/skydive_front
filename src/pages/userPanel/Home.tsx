import SDCard from "../../components/shared/Card";
import HomeLink, {
  HomeLinkProps,
} from "../../components/userPanel/home/HomeLink";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import useApi from "../../hooks/useApi";
import { GeneralSettings } from "../../models/settings.models";
import { BaseResponse, UserStatuses } from "../../models/shared.models";
import { useState, useEffect } from "react";
import { authActions } from "../../store/auth";

const Home: React.FC = () => {
  const { sendRequest: sendSettingsRequest } = useApi<
    null,
    BaseResponse<GeneralSettings>
  >();
  const [links, setLinks] = useState<HomeLinkProps[]>([]);
  const name = useAppSelector((state) => state.auth.name);
  const authState = useAppSelector((state) => state.auth);
  const { sendRequest: sendCheckActiveRequest } = useApi<
    null,
    BaseResponse<boolean>
  >();
  const dispatch = useAppDispatch();

  const statusBgColorMap = new Map([
    [UserStatuses.AWAITING_COMPLETION, "bg-yellow-300"],
    [UserStatuses.PENDING, "bg-yellow-300"],
    [UserStatuses.ACTIVE, "bg-green-200"],
    [UserStatuses.INACTIVE, "bg-red-500"],
  ]);

  useEffect(() => {
    const initialLinks: HomeLinkProps[] = [
      {
        title: "رویدادها",
        href: "/events",
      },
      {
        title: "قوانین و شرایط",
        href: "",
      },
      {
        title: "سوابق پرش",
        href: "/jumps",
        needActivation: true,
      },
      {
        title: "کیف پول",
        href: "/wallet",
        needActivation: true,
      },
      {
        title: "بلیت‌های من",
        href: "/tickets",
      },
      {
        title: "سوابق تراکنش ها",
        href: "/transactions",
        needActivation: true,
      },
    ];
    sendSettingsRequest(
      {
        url: "/settings",
      },
      (response) => {
        const links = [...initialLinks];
        links.forEach((link) => {
          if (link.title === "قوانین و شرایط") {
            (link.href = response.content.termsAndConditionsUrl),
              (link.newTab = true);
          }
        });
        setLinks([...initialLinks]);
      },
      () => {
        setLinks(initialLinks);
      }
    );

    sendCheckActiveRequest(
      {
        url: "/Users/CheckIfUserIsActive",
      },
      (response) => {
        if (response.content) {
          dispatch(authActions.setUserStatus(UserStatuses.ACTIVE));
        }
      }
    );
  }, [
    sendSettingsRequest,
    dispatch,
    sendCheckActiveRequest,
    authState.userStatus,
  ]);

  return (
    <SDCard className="flex justify-center">
      <main className="w-full max-w-xl flex flex-col justify-center">
        <div className="mb-6">
          <div className="text-center">
            <p className="mb-2 text-lg">{name}</p>
            <div className="flex justify-center items-center">
              <p className="ml-2 font-semibold text-sm">وضعیت حساب کاربری:</p>
              <p
                className={`${statusBgColorMap.get(
                  authState.userStatus
                )} text-xs  inline py-1 px-3 rounded-2xl`}
              >
                {authState.userStatusDisplay}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-center">
          {links.map((link, index) => (
            <HomeLink
              key={index}
              {...link}
              isActiveUser={authState.userStatus === UserStatuses.ACTIVE}
            />
          ))}
        </div>
      </main>
    </SDCard>
  );
};

export default Home;
