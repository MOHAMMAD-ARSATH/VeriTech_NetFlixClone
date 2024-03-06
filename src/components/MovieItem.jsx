import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { doc, arrayUnion, updateDoc } from "firebase/firestore";

import { createImageUrl } from "../services/moviesServices";
import { db } from "../services/firebase";
import { UserAuth } from "../context/AuthContext";

const MovieItem = ({ movie }) => {
  const { title, backdrop_path, poster_path } = movie;

  const [like, setLike] = useState(false);

  const { user } = UserAuth();

  const markFavShow = async () => {
    const userEmail = user?.email;

    if (userEmail) {
      const userDoc = doc(db, "users", userEmail);
      setLike(!like);
      await updateDoc(userDoc, {
        favShows: arrayUnion({ ...movie }),
      });
    } else {
      alert("Please login to save your movie");
    }
  };

  return (
    <div className="relative w-[120px] sm:w-[160px] md:w-[200px] lg:w-[220px] inline-block rounded-lg overflow-hidden cursor-pointer m-2">
      <img
        className="w-full h-40 block object-cover object-top"
        src={createImageUrl(backdrop_path ?? poster_path, "w500")}
        alt={title}
      />
      <div className="absolute top-0 left-0 w-full h-40 bg-black/80 opacity-0 hover:opacity-100">
        <p className="whitespace-normal text-xs md:text-sm flex justify-center items-center h-full font-nsans-bold">
          {movie.title}
        </p>
        <p onClick={markFavShow} className="cursor-pointer">
          {like ? (
            <FaHeart
              size={20}
              className="absolute top-2 left-2 text-gray-300"
            />
          ) : (
            <FaRegHeart
              size={20}
              className="absolute top-2 left-2 text-gray-300"
            />
          )}
        </p>
      </div>
    </div>
  );
};

export default MovieItem;
