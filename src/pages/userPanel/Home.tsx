import SDCard from "../../components/shared/Card";
import HomeLink, { HomeLinkProps } from "../../components/userPanel/home/HomeLink";
import { useAppSelector } from "../../hooks/reduxHooks";
import { UserStatuses } from "../../models/shared.models";

const Home: React.FC = () => {
  const { sendRequest: sendSettingsRequest } = useAPi<
    null,
    BaseResponse<GenralSettings>
  >();
  const [links, setLinks] = useState<HomeLinkProps[]>([]);
  const name = useAppSelector((state) => state.auth.name);
  const authState = useAppSelector((state) => state.auth);

  const defaultLinks: HomeLinkProps[] = [
    {
      tilte: 'رویدادها',
      href: '/events',
    },
    {
      tilte: 'قوانین و شرایط',
      href: '',
    },
    {
      tilte: 'بلیت‌های من',
      href: '/tickets',
    },
    {
      tilte: 'سوابق پرش',
      href: '/jumps',
    },
    {
      tilte: 'سوابق تراکنش ها',
      href: '/transactions',
    },
  ];

  const statusBgColorMap = new Map([
    [UserStatuses.AWAITING_COMPLETION, 'bg-yellow-300'],
    [UserStatuses.PENDING, 'bg-yellow-300'],
    [UserStatuses.ACTIVE, 'bg-green-200'],
    [UserStatuses.INACTIVE, 'bg-red-500'],
  ]);

  useEffect(() => {
    sendSettingsRequest(
      {
        url: '/settings',
      },
      (response) => {
        setLinks([
          {
            tilte: 'رویدادها',
            href: '/events',
          },
          {
            tilte: 'قوانین و شرایط',
            href: response.content.termsAndConditionsUrl,
            target: '_blank',
          },
          {
            tilte: 'بلیت‌های من',
            href: '/tickets',
          },
          {
            tilte: 'سوابق پرش',
            href: '/jumps',
          },
          {
            tilte: 'سوابق تراکنش ها',
            href: '/transactions',
          },
        ]);
      }
    );
  }, [sendSettingsRequest]);

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
      </div>
      <div className="flex flex-wrap justify-center">
        {
          links.map((link,index)=>{
            return (
              <HomeLink key={index}  {...link} />
            )
          })
        }
      </div>
    </main>
  </SDCard>;
};
export default Home;
