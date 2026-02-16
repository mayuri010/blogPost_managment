import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import { ToastContainer } from "react-toastify";
import { AuthGuard } from "./auth/AuthGuard";
import Dashboard from "./Pages/DashBoard";
import CreatePost from "./Pages/Createpost";
import { PostDetails } from "./Pages/PostDetails";
import { Analystic } from "./Pages/Analytics";

const DefultRouter = () => {
  const data = JSON.parse(localStorage.getItem("blog_rdata"));
  if (data) {
  return  <Navigate to="/dashboard" replace />;
  } else {
   return <Navigate to="/login" replace />;
  }
};
function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <DefultRouter />,
    },
    {
      path: "/register",
      element: (
        <AuthGuard required={false}>
          <Register />
        </AuthGuard>
      ),
    },
    {
      path:"/create-post",
      element:(
        <AuthGuard required={true} >
          <CreatePost />
          </AuthGuard>
      ),
    },
    {
      path:"/edit-post/:id",
      element:(
        <AuthGuard >
        <CreatePost />
       </AuthGuard>
      ),
    },
    {
      path:"/postDetail/:id",
      element:(
        <AuthGuard required={true}>
          <PostDetails />
        </AuthGuard>
      )
    },
    {
      path: "/login",
      element: (
        <AuthGuard required={false}>
          <Login />
        </AuthGuard>
      ),
    },
    {
      path: "/dashboard",
      element: (
        <AuthGuard required={true}>
          <Dashboard />
        </AuthGuard>
      ),
    },
    {
      path:"/analytics",
      element:(
        <AuthGuard required={true}>
          <Analystic/>
        </AuthGuard>
      )
    }
  ]);

  return (
    <>
      <RouterProvider router={route} />
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHoverr
        theme="light"
      ></ToastContainer>
    </>
  );
}

export default App;