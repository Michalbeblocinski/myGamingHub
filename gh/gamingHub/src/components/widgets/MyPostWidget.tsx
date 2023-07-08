import {
  EditOutlined,
  DeleteOutlined,
  ImageOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import FlexBetween from "../structure/FlexBetween";
import Dropzone from "react-dropzone";
import { UserImage } from "./UserImage";
import { WidgetWrapper } from "./WidgetWrapper";
import { useState } from "react";
import { addPhotoProfileCluudEndpoint, addPostEndpoint } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../store/authSlice";
import { GhDataApi, GhDataApiFile } from "../../utils/axiosConfig";
import { addPost } from "../../store/postSlice";

type MyPostWidgetProps = {
  picturePath: string;
};

export const MyPostWidget: React.FC<MyPostWidgetProps> = ({ picturePath }) => {
  const [isImage, setIsImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [post, setPost] = useState("");
  const { palette } = useTheme();
  const user = useSelector(selectUser);

  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = "#161616";
  const medium = "blue";
  const dispatch = useDispatch();

  const handlePost = async () => {
    const formData = new FormData();
    let imgPath = "";
    if (selectedImage) {
      formData.append("file", selectedImage);
      const imgUploadResponse = await GhDataApiFile.post(
        addPhotoProfileCluudEndpoint(),
        formData
      );
      imgPath = imgUploadResponse.data.url;
    }

    const values = {
      userId: user?._id,
      content: post,
      imagePath: imgPath,
      category: "asd",
    };

    const response = await GhDataApi.post(addPostEndpoint(), values);
    const postResponse = await response.data;
    dispatch(addPost(postResponse));
    setSelectedImage(null);
    setPost("");
  };

  return (
    <WidgetWrapper sx={{ backgroundColor: "#f3f2f2", color: "#161616" }}>
      <FlexBetween gap="1.5rem">
        <UserImage image={picturePath} size="60px" />
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: "#dde3ed",
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>
      {isImage && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            multiple={false}
            onDrop={(acceptedFiles: Array<File>) =>
              setSelectedImage(acceptedFiles[0])
            }
          >
            {({ getRootProps, getInputProps }: any) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!selectedImage ? (
                    <p>Add Image Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{selectedImage.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {selectedImage && (
                  <IconButton
                    onClick={() => setSelectedImage(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexBetween>
        <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
          >
            Image
          </Typography>
        </FlexBetween>

        {isNonMobileScreens ? (
          <></>
        ) : (
          <FlexBetween gap="0.25rem">
            <MoreHorizOutlined sx={{ color: "#161616" }} />
          </FlexBetween>
        )}

        <Button
          disabled={!post}
          onClick={handlePost}
          sx={{
            color: "#505050 !important",
            backgroundColor: "#a2bcd7",
            borderRadius: "3rem",
          }}
        >
          POST
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};
