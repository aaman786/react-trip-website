import React from "react";

const ShowPhoto = ({ place, index = 0, classname = null }) => {
  if (!place.photos?.length) {
    return "";
  }

  if (!classname) {
    classname = "object-cover";
  }
  return (
    <img
      className={classname}
      src={"http://localhost:4000/uploads/" + place.photos[index]}
      alt=""
    />
  );
};

export default ShowPhoto;
