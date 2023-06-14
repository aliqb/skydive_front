import SDCard from "../../../components/shared/Card";
import HomeLink, { HomeLinkProps } from "../../../components/userPanel/home/HomeLink";

const Home: React.FC = () => {
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
    <main className="w-full max-w-xl">
      <div className="flex flex-wrap">
        {
          links.map(link=>{
            return (
              <HomeLink  {...link} />
            )
          })
        }
      </div>
    </main>
  </SDCard>;
};
export default Home;
