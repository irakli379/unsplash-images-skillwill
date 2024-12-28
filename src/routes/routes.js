import ImagePage from "../pages/ImagePage";
import MainPage from "../pages/MainPage";

const routes = [
  {
    element: <MainPage />,
    path: "/",
  },
  {
    element: <ImagePage />,
    path: "/:imageId",
  },
];

export default routes;
