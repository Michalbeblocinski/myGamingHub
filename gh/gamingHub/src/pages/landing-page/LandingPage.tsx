import React from "react";
import {
  FriendListWidget,
  MyPostWidget,
  Navbar,
  PostsWidget,
  UserWidget,
} from "../../components";

import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { User } from "../../utils";
import { selectUser } from "../../store/authSlice";

export const LandingPage: React.FC = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const user = useSelector(selectUser);
  const { _id, userPicturePath } = user as User;

  return (
    <>
      <Navbar />;
      <Box
        padding={isNonMobileScreens ? "0" : "20px"}
        sx={{
          maxWidth: "100vw",
        }}
      >
        <Box
          width="100%"
          padding="2rem 6%"
          display={isNonMobileScreens ? "flex" : "block"}
          gap="0.5rem"
          justifyContent="space-between"
          sx={{
            padding: "20px 0",
          }}
        >
          <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
            <UserWidget userId={_id} picturePath={userPicturePath} />
          </Box>
          <Box
            flexBasis={isNonMobileScreens ? "42%" : undefined}
            mt={isNonMobileScreens ? undefined : "2rem"}
          >
            <MyPostWidget picturePath={userPicturePath} />
            <PostsWidget userId={null} />
          </Box>
          {isNonMobileScreens && (
            <Box flexBasis="26%">
              <Box />
              <FriendListWidget userId={_id} />
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};
