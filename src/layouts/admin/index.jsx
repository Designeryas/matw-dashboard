import React, { useState } from "react";
import {
  // Routes,
  // Route,
  // Navigate,
  useLocation
} from "react-router-dom";
import Navbar from "components/navbar";
import Sidebar from "components/sidebar";
import Footer from "components/footer/Footer";
import routes from "routes.js";

export default function Admin(props) {
  const { children, ...rest } = props;
  const location = useLocation();
  const [open, setOpen] = React.useState(true);
  const [isMinimize, setIsMinimize] = useState(true);
  const [currentRoute, setCurrentRoute] = React.useState("Main Dashboard");

  React.useEffect(() => {
    window.addEventListener("resize", () =>
      window.innerWidth < 1200 ? setOpen(false) : setOpen(true)
    );
  }, []);
  React.useEffect(() => {
    getActiveRoute(routes);
  }, [location.pathname]);

  const getActiveRoute = (routes) => {
    let activeRoute = "Main Dashboard";
    for (let i = 0; i < routes.length; i++) {
      // console.log("getActiveRoute==", routes[i].layout + "/" + routes[i].path)
      if (
        window.location.href.indexOf(
          routes[i].layout + routes[i].path
          // routes[i].layout + "/" + routes[i].path
        ) !== -1
      ) {
        setCurrentRoute(routes[i].name);
      }
    }
    return activeRoute;
  };
  const getActiveNavbar = (routes) => {
    // console.log("getActiveNavbar", routes)
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      // console.log("getActiveNavbar=", routes[i].layout + routes[i].path)
      if (window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1) {
        // console.log("in ifgetActiveNavbar=", routes[i].secondary)
        return routes[i].secondary;
      }
    }
    // console.log("getActiveNavbar", activeNavbar)
    return activeNavbar;
  };
  // const getRoutes = (routes) => {
  //   return routes.map((prop, key) => {
  //     if (prop.layout === "/admin") {
  //       return (
  //         <Route path={`/${prop.path}`} element={prop.component} key={key} />
  //       );
  //     } else {
  //       return null;
  //     }
  //   });
  // };

  document.documentElement.dir = "ltr";
  return (
    <div className="flex h-full w-full">
      <Sidebar open={open} onClose={() => setOpen(false)} onMinimize={() => setIsMinimize(!isMinimize)} />
      {/* Navbar & Main Content */}
      <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
        {/* Main Content */}
        <main
          className={`mx-[12px]- h-full flex-none transition-all
          ${isMinimize ? 'xl:ml-[50px]' : 'xl:ml-[313px]'}
          `}
        >
          {/* Routes */}
          <div className="h-full px-3 lg:px-6">
            <Navbar
              onOpenSidenav={() => setOpen(true)}
              logoText={"MATW Project"}
              brandText={currentRoute}
              secondary={getActiveNavbar(routes)}
              {...rest}
            />
            <div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
              {children}
              {/* <Routes>
                {getRoutes(routes)}

                <Route
                  path="/"
                  // element={<Navigate to="/" replace />}
                  // element={<Navigate to="/admin/default" replace />}
                />
              </Routes> */}
            </div>
            <div className="p-3">
              <Footer />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
