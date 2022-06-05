import { Box, Hidden } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';


const LogoWrapper = styled(Link)(
  ({ theme }) => `
        color: ${theme.palette.text.primary};
        padding: ${theme.spacing(0, 1, 0, 0)};
        display: flex;
        text-decoration: none;
        font-weight: ${theme.typography.fontWeightBold};
`
);


const LogoTextWrapper = styled(Box)(
  ({ theme }) => `
        padding-left: ${theme.spacing(1)};
`
);

const LogoText = styled(Box)(
  ({ theme }) => `
        font-size: ${theme.typography.pxToRem(20)};
        font-weight: ${theme.typography.fontWeightBold};
        margin : ${theme.spacing(7)};
`
);

function Logo() {
  return (
    <LogoWrapper to="/overview">
      <Hidden smDown>
        <LogoTextWrapper>
          <LogoText>HelpDesk</LogoText>
        </LogoTextWrapper>
      </Hidden>
    </LogoWrapper>
  );
}

export default Logo;
