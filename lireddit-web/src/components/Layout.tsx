import { NavBar } from "./NavBar";
import { Wrapper, WrapperVariant } from "./Wrappers";



interface LayoutProps{
  variant?: WrapperVariant;
}

export const Layout: React.FC<LayoutProps> =({
  children,
  variant 
}) =>{

  return(
    <>
      <NavBar/>
    <Wrapper variant={variant}>
      {children}
    </Wrapper>
    </>
  );


}