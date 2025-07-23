import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/40 backdrop-blur-md shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Brand */}
        <h1 className="text-2xl font-bold text-blue-700 tracking-wide">
          <Link to="/" className="hover:text-blue-900 transition-all duration-200">
            JobTrackr
          </Link>
        </h1>

        {/* Links */}
        <div className="space-x-6 text-sm font-semibold text-gray-800">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="hover:text-blue-600 transition duration-200">
                Dashboard
              </Link>
              <Link to="/add-job" className="hover:text-blue-600 transition duration-200">
                Add Job
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md shadow-md transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/" className="hover:text-blue-600 transition duration-200">
                Register
              </Link>
              <Link to="/login" className="hover:text-blue-600 transition duration-200">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
