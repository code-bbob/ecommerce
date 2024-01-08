import { Products } from "./Products";
import { HeaderBottom, HeaderMid, HeaderTop } from "./Header";

export const Home = () => {
  return (
    <>
      <HeaderTop />
      <HeaderMid />
      <HeaderBottom />
      <Products/>
    </>
  );
};
