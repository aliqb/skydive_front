import { DeepPartial, FlowbiteTabTheme, Tabs, TabsProps, TabsRef } from "flowbite-react";
import { TabItem } from "flowbite-react/lib/esm/components/Tab/TabItem";
import { forwardRef, ForwardedRef } from "react";
const SDTabComponent: React.FC<TabsProps> = forwardRef(
  (props: TabsProps, ref: ForwardedRef<TabsRef>) => {
    const theme: DeepPartial<FlowbiteTabTheme> = {
      tablist: {
        tabitem: {
          styles: {
            underline: {
              active: {
                off: "border-b-2 flex-grow border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300",
                on: "text-primary-500 flex-grow rounded-t-lg border-b-2 border-primary-500 active dark:text-cyan-500 dark:border-cyan-500",
              },
            },
          },
        },
      },
    };
    return <Tabs.Group {...props} theme={theme}>{props.children}</Tabs.Group>;
  }
);

SDTabComponent.displayName = 'SDTabs.Group';
export const SDTabs = { Group: SDTabComponent, Item: TabItem };