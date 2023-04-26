import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Loader from "./components/Loader";
import { routes } from "./Helper/routesHelper";

const RoutesFile = () => {
  const state = useSelector((state) => state);
  const appRoutes = useMemo(() => {
    return routes(state);
  }, [state?.userData]);

  if (state?.loader) {
    return (
      <>
        <div className="loader">
          <Loader />
        </div>
      </>
    );
  }
  return (
    <>
      <BrowserRouter>
        <Routes>
          {appRoutes?.map((val, id) => {
            return (
              <Route
                key={id}
                path={val?.path}
                element={
                  val?.isNavigate ? (
                    <Navigate to={val?.navigatePath} />
                  ) : (
                    <val.element />
                  )
                }
              />
            );
          })}
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default RoutesFile;
