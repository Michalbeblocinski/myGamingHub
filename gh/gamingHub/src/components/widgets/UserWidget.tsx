import { ManageAccountsOutlined } from "@mui/icons-material";
import {
  Box,
  Typography,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { UserImage } from "./UserImage";
import { FlexBetween } from "./FlexBetween";
import { WidgetWrapper } from "./WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { selectUser, setToken } from "../../store/authSlice";
import { GhDataApi } from "../../utils/axiosConfig";
import { User, getUserEndpoint } from "../../utils";

type UserWidgetProps = {
  userId?: string;
  picturePath: string;
};

export const UserWidget: React.FC<UserWidgetProps> = ({
  userId,
  picturePath,
}) => {
  const { palette } = useTheme();
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const dispatch = useDispatch();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (userId) {
      dispatch(setToken());
      GhDataApi.get(getUserEndpoint(userId as string)).then((response) =>
        setUser(response.data)
      );
    } else {
      setUser(useSelector(selectUser));
    }
  }, []);

  useEffect(() => {}, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return null;
  }

  const { name, friends } = user;

  return (
    <WidgetWrapper
      margin={isNonMobileScreens ? "0 10px 0 40px" : "0"}
      sx={{
        backgroundColor: "#f3f2f2",
        color: "#161616",
      }}
    >
      {/* FIRST ROW */}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} size="60px" />
          <Box>
            <Typography
              variant="h4"
              color="#161616"
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {name}
            </Typography>
            <Typography color="#161616">{friends.length} friends</Typography>
          </Box>
        </FlexBetween>
      </FlexBetween>

      <Divider />

      {/* SECOND ROW */}
    </WidgetWrapper>
  );
};
