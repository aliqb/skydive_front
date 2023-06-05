import { ComponentType, ReactNode, useState } from "react";

interface PanelShellProps {
  header: ComponentType<ShellElement>;
  sidebar: ComponentType<ShellElement>;
  children: ReactNode;
  mainContinerClassName?: string
}
export interface ShellElement {
  isMenuOpen: boolean;
  toggleMenu(): void;
}
const PanelShell: React.FC<PanelShellProps> = (props) => {
  const [isMenuOpen, setISMenuOpen] = useState<boolean>(false);
  function toggleMenu() {
    setISMenuOpen((open) => !open);
  }
  return (
    <div className="w-screen h-screen flex flex-col  overflow-hidden">
      <header className="w-full">
        <props.header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      </header>
      <div className="w-screen flex h-full relative">
        <aside
          className={`${
            isMenuOpen ? "w-[250px]" : "w-0"
          } h-full    absolute top-0 right-0 sm:static overflow-auto transition-all ease-linear duration-100 shadow-sideBar`}
        >
          <props.sidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
        </aside>
        <main className={`${props.mainContinerClassName || ''} flex-auto h-full overflow-auto`}>{props.children}</main>
      </div>
    </div>
  );
};

export default PanelShell;
