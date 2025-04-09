import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { RootState } from '../../Redux/store';

export interface RouteItem {
  path: string;
  isPrivate?: boolean | false;
  isPublicOnly?: boolean | false;
  element: React.ReactNode;
}

export interface AppRoutesProps {
  routes: RouteItem[];
}

const AppRoutes: React.FC<AppRoutesProps> = ({ routes }) => {
  const { loggedIn } = useSelector(
    (state: RootState) => ({
      loggedIn: state.user.loggedIn,
    }),
    shallowEqual,
  );

  return (
    <Routes>
      {routes.map((route, index) => {
        if (route.isPublicOnly && loggedIn) return null;
        if (route.isPrivate && !loggedIn) return null;

        return <Route key={index} path={route.path} element={route.element} />;
      })}
    </Routes>
  );
};

export { AppRoutes };
