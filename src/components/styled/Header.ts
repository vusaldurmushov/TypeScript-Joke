import styled from "styled-components";

import { DefaultTheme } from "styled-components";

interface HeaderProps {
  theme: DefaultTheme;
}

 const Header = styled.p<HeaderProps>`
 font-size: 20px;
 font-weight: 500;
 margin: 0px 32px;
 color: ${({theme}) => theme.colors.white}

 `

 export default Header