import { Box, Typography, useMediaQuery } from "@mui/material";
import { FriendWidget } from "./FriendWidget";
import { WidgetWrapper } from "./WidgetWrapper";

import { useDispatch, useSelector } from "react-redux";
// import { addFriends } from "state";

import { addFriend, selectFriends, setFriends } from "../../store/authSlice";
import { GhDataApi } from "../../utils/axiosConfig";
import { getFriendsEndpoint } from "../../utils";
import { useEffect } from "react";

type FriendListWidgetProps = {
  userId: string;
};

export const FriendListWidget: React.FC<FriendListWidgetProps> = ({
  userId,
}) => {
  //const dispatch = useDispatch();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const dispatch = useDispatch();
  const getFriends = async () => {
    await GhDataApi.get(getFriendsEndpoint(userId)).then((response) => {
      dispatch(setFriends(response.data));
    });
  };
  const friends = useSelector(selectFriends);

  useEffect(() => {
    getFriends();
  }, [addFriend]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper
      margin={isNonMobileScreens ? "0 40px 0 10px" : "0"}
      sx={{
        backgroundColor: "#f3f2f2",
        color: "#161616",
      }}
    >
      <Typography
        color="black"
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends ? (
          friends.map((friend) => (
            <FriendWidget
              key={friend._id}
              friendId={friend._id}
              name={friend.name}
              userPicturePath={friend.userPicturePath}
            />
          ))
        ) : (
          <div>Loading...</div>
        )}
      </Box>
    </WidgetWrapper>
  );
};
