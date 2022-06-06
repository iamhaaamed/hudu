import React, {useContext} from 'react';

const TabBarContext = React.createContext({
  hideTabBar: false,
  changeTabBarVisibility: (status: boolean) => {},
});

export function TabBarContextProvider({children}: ReactChildren) {
  const [hideTabBar, setHideTabBar] = React.useState(false);

  const changeTabBarVisibility = (status: boolean) => setHideTabBar(status);

  return (
    <TabBarContext.Provider
      value={{
        hideTabBar,
        changeTabBarVisibility,
      }}>
      {children}
    </TabBarContext.Provider>
  );
}

export function useTabBar() {
  const tabBar = useContext(TabBarContext);

  if (!tabBar) throw new Error('Is not in the context provider!');

  return tabBar;
}
