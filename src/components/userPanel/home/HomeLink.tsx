import { Link } from "react-router-dom";
import { BsAirplaneEngines } from "react-icons/bs";
export interface HomeLinkProps {
  tilte: string;
  href: string;
}

const HomeLink: React.FC<HomeLinkProps> = (props) => {
  return (
    <div className="p-1 my-1 min-w-fit w-1/2 flex justify-center mb-4">
      <Link to={props.href} className="inline-flex gap-2 w-52" >
        <BsAirplaneEngines size="1.5rem"></BsAirplaneEngines>
        <span>{props.tilte}</span>
      </Link>
    </div>
  );
};

export default HomeLink;
