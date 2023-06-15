import SDCard from "../../../components/shared/Card";
import HomeLink, { HomeLinkProps } from "../../../components/userPanel/home/HomeLink";
import { useAppSelector } from "../../../hooks/reduxHooks";

const Home: React.FC = () => {
  const name = useAppSelector(state=>state.auth.name);
  const status = useAppSelector(state=>state.auth.userStatus);
  const links : HomeLinkProps[] = [
    {
      tilte: 'رویدادها',
      href:''
    },
    {
      tilte: 'قوانین و شرایط',
      href:''
    },
    {
      tilte: 'رویدادها',
      href:''
    },
    {
      tilte: 'قوانین و شرایط',
      href:''
    }
  ]
  return <SDCard className="flex justify-center">
    <main className="w-full max-w-xl flex flex-col justify-center">
      <div className="mb-6">
        <div className="text-center">
          <p className="mb-2 text-lg">{name}</p>
          <p className="text-xs bg-yellow-300 inline py-1 px-3 rounded-2xl">{status}</p>
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
