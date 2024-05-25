import { useContext, useState } from "react";
import { Store } from "../Store";
import AdminUser from "../components/Admin/AdminUser.tsx";
import AdminProduct from "../components/Admin/AdminProduct.tsx";
import AdminOrder from "../components/Admin/AdminOrder.tsx";
import Chart from "../components/Admin/Chart.tsx";

const Dashboard = () => {
  const {
    state: { mode },
  } = useContext(Store);
  const textColor = mode === "dark" ? "white" : "black";
  const [keySelect, setKeySelect] = useState("");
  const menus = [
    {
      name: "user",
      route: "user",
      icon: "fa-user"
    },
    {
      name: "product",
      route: "product",
      icon: "fa-briefcase"
    },
    {
      name: "order",
      route: "order",
      icon: "fa-truck"
    },
  ];
  const renderPage = (key: string) => {
    switch (key) {
      case "user":
        return <AdminUser />;
      case "product":
        return <AdminProduct />;
      case "order":
        return <AdminOrder />;
      default:
        return <Chart/>;
    }
  };
  const handleClick = (key: any) => {
    setKeySelect(key);
    console.log(keySelect);
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          {/* <div className="col-2 d-none d-md-block sidebar"> */}
          <div className="left-sidebar">
            <ul className="nav flex-column sidebar-nav mx-3">
              {menus.map((menu) => (
                <li
                  className="nav-item"
                  onClick={() => handleClick(menu.route)}
                >
                  <div style={{ color: textColor }} className="my-3">
                    <i className={`fa ${menu.icon}`} style={{marginRight: "10px"}}/>
                    {menu.name}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {/* </div> */}
          <div className="sidebar-content">{renderPage(keySelect)}</div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
