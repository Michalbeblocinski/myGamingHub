import { Box } from "@mui/material";
import React from "react";
import UserImageJPG from "../../assets/user.png";
type UserImageProps = {
  image?: string;
  size: string;
};

export const UserImage: React.FC<UserImageProps> = ({
  image,
  size = "60px",
}) => {
  const image2 = image || UserImageJPG;
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={image2}
      />
    </Box>
  );
};
