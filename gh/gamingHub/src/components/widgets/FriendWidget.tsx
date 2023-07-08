import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  removeFriend,
  selectUser,
  setFriends,
  setToken,
  addUserFriend,
} from "../../store/authSlice";
import { FlexBetween } from "./FlexBetween";
import { UserImage } from "./UserImage";
import { addFriendEndpoint, deleteFriendEndpoint } from "../../utils";
import { GhDataApi } from "../../utils/axiosConfig";

type FriendProps = {
  friendId?: string;
  name?: string;
  userPicturePath?: string;
};

export const FriendWidget: React.FC<FriendProps> = ({
  friendId,
  name,
  userPicturePath,
}) => {
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(selectUser);
  let arrayFriends;
  if (user) {
    arrayFriends = user.friends;
  }

  const isFriend = arrayFriends?.find((item: string) => item === friendId);

  const patchFriend = async () => {
    dispatch(setToken());
    if (!isFriend) {
      await GhDataApi.put(addFriendEndpoint(user?._id, friendId)).then(
        (response) => {
          const updatedFriends = response.data;
          dispatch(setFriends(updatedFriends));
          dispatch(addUserFriend(friendId));
        }
      );
    } else {
      await GhDataApi.delete(deleteFriendEndpoint(user?._id, friendId)).then(
        (response) => {
          const updatedFriends = response.data;

          dispatch(setFriends(updatedFriends));
          dispatch(removeFriend(friendId)); 
        }
      );
    }
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color="#161616"
            variant="h5"
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
        </Box>
      </FlexBetween>
      <IconButton
        onClick={() => patchFriend()}
        sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
      >
        {isFriend ? (
          <PersonRemoveOutlined sx={{ color: primaryDark }} />
        ) : (
          <PersonAddOutlined sx={{ color: primaryDark }} />
        )}
      </IconButton>
    </FlexBetween>
  );
};
