import React from "react";
import { Avatar } from "@mui/material";

interface userImageProps {
  picturePath: string;
}
function UserImage({ picturePath }: userImageProps) {
  return (
    <div>
      <Avatar
        alt="avatar"
        src={`http://localhost:5000/assets/${picturePath}`}
        sx={{ width: 70, height: 70 }}
      />
    </div>
  );
}

export default UserImage;
