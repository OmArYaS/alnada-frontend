import { NavLink, Outlet } from "react-router";
import { motion } from "framer-motion";

export default function Dashboard() {
  const navItems = [
    { path: "control_products", label: "المنتجات", icon: "📦" },
    { path: "orders", label: "الطلبات", icon: "📋" },
    { path: "categories", label: "الفئات", icon: "🏷️" },
    { path: "contacts", label: "الرسائل", icon: "💬" },
  ];

  return (
    <div className="min-h-fit  bg-gray-50">
      {/* topbar */}
      <div className="   flex  bg-secondary justify-between items-center px-4 shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 ">لوحة التحكم</h1>
        <nav className=" flex h-fit ">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-6 py-3 text-gray-700 hover:bg-primary hover:text-white transition-colors ${
                  isActive
                    ? "bg-primary text-white border-r-4 border-x-rose-400"
                    : ""
                }`
              }
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className=" p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <Outlet />
        </motion.div>
      </div>
    </div>
  );
}
