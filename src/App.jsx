import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes/routes";

function App() {
  return <RouterProvider router={createBrowserRouter(routes)}></RouterProvider>;
}

export default App;
