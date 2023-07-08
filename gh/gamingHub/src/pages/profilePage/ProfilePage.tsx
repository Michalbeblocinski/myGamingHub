import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  MyPostWidget,
  Navbar,
  PostsWidget,
  UserWidget,
} from "../../components";
import { GhDataApi } from "../../utils/axiosConfig";
import { User, getUserEndpoint } from "../../utils";
import { useDispatch } from "react-redux";
import { setToken } from "../../store/authSlice";

export const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  const { userId } = useParams();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const dispatch = useDispatch();

  const getUser = () => {
    GhDataApi.get(getUserEndpoint(userId as string)).then((response) =>
      setUser(response.data)
    );
  };

  useEffect(() => {
    dispatch(setToken());
    getUser();
  }, []);

  if (!user) return null;

  return (
    <Box>
      <Navbar />
      <Box
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget
            userId={userId as string}
            picturePath={user.userPicturePath}
          />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <Box m={isNonMobileScreens ? "-2rem 0" : "2rem"} />
          <PostsWidget userId={userId as string} isProfile />
        </Box>
      </Box>
    </Box>
  );
};
