import React from "react";
import { Box, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CircleIcon from "@mui/icons-material/Circle";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down("md"));

  const handleCircleIconClick = () => {
    navigate("/");
  };

  return (
    <Box
      component="nav"
      display="flex"
      justifyContent={isMobileOrTablet ? "center" : "flex-end"}
      alignItems="center"
      flexDirection={isMobileOrTablet ? "column" : "row"}
      padding="16px"
    >
      <Typography
        variant="h6"
        marginBottom={isMobileOrTablet ? "8px" : "0"}
        marginRight={isMobileOrTablet ? "0" : "8px"}
        style={{
          color: "#162427",
          textTransform: "uppercase",
          fontSize: "16px",
          fontWeight: "bold",
        }}
      >
        ADMIN
      </Typography>
      <IconButton>
        <ArrowDropDownIcon
          style={{
            color: "#162427",
            fontSize: "28px",
          }}
        />
      </IconButton>
      <IconButton onClick={handleCircleIconClick}>
        <CircleIcon
          style={{
            color: "#001EB9",
            fontSize: "35px",
          }}
        />
      </IconButton>
    </Box>
  );
};

export default Navbar;
