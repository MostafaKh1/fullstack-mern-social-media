import React from "react";
import { Avatar } from "@mui/material";
import { apiUrl } from "../config";

interface userImageProps {
  picturePath: string;
}
function UserImage({ picturePath }: userImageProps) {
  return (
    <div>
      <Avatar
        alt="avatar"
        src={`${apiUrl}/assets/${picturePath}`}
        sx={{ width: 70, height: 70 }}
      />
    </div>
  );
}

export default UserImage;
