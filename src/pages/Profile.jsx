import React, { useEffect, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { UserAuth } from "../context/AuthContext";
import { db } from "../services/firebase";

import { createImageUrl } from "../services/moviesServices";
import { arrayRemove, doc, onSnapshot, updateDoc } from "firebase/firestore";

const Profile = () => {
  const [movies, setMovies] = useState([]);
  const { user } = UserAuth();

  useEffect(() => {
    if (user) {
      onSnapshot(doc(db, "users", `${user.email}`), (doc) => {
        if (doc.data()) setMovies(doc.data().favShows);
      });
    }
  }, [user?.email]);

  const slide = (offset) => {
    const slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + offset;
  };

  const handleUnlikeShow = async (movie) => {
    const userDoc = doc(db, "users", user.email);

    await updateDoc(userDoc, {
      favShows: arrayRemove(movie),
    });
  };

  if (!user) {
    return (
      <>
        <p>Fetching shows...</p>
      </>
    );
  }

  console.log(movies);

  return (
    <>
      <div>
        <div>
          <img
            className="bloc w-full h-[500px] object-cover"
            src="https://assets.nflxext.com/ffe/siteui/vlv3/93da5c27-be66-427c-8b72-5cb39d275279/94eb5ad7-10d8-4cca-bf45-ac52e0a052c0/IN-en-20240226-popsignuptwoweeks-perspective_alpha_website_small.jpg"
            alt="//"
          />
          <div className="bg-black/60 fixed top-0 left-0 w-full h-[500px]" />

          <div className="absolute top-[20%] p-4 md:p-8">
            <h1 className="text-3xl md:text-5xl font-nsans-bold my-2">
              My Shows
            </h1>
            <p className="font-nsans-light text-gray-400 text-lg">
              {user.email}
            </p>
          </div>
        </div>

        {/* Movie Row */}
        <h2 className="font-nsans-bold md:text-xl  p-4 capitalize">
          {movies.title}
        </h2>

        <div className="relative flex items-center group">
          <MdChevronLeft
            size={40}
            onClick={() => slide(-500)}
            className="bg-white rounded-full absolute left-2 opacity-80 text-gray-700 z-10 hidden group-hover:block"
          />
          <div
            id={`slider`}
            className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide"
          >
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="relative w-[120px] sm:w-[160px] md:w-[200px] lg:w-[220px] inline-block rounded-lg overflow-hidden cursor-pointer m-2"
              >
                <img
                  className="w-full h-40 block object-cover object-top"
                  src={createImageUrl(
                    movie.backdrop_path ?? movie.poster_path,
                    "w500"
                  )}
                  alt={movie.title}
                />

                <div className="absolute top-0 left-0 w-full h-40 bg-black/80 opacity-0 hover:opacity-100">
                  <p className="whitespace-normal text-xs md:text-sm flex justify-center items-center h-full font-nsans-bold">
                    {movie.title}
                  </p>

                  <p>
                    <AiOutlineClose
                      size={30}
                      className="absolute top-2 right-2"
                      onClick={() => handleUnlikeShow(movie)}
                    />
                  </p>
                </div>
              </div>
            ))}
          </div>
          <MdChevronRight
            size={40}
            onClick={() => slide(500)}
            className="bg-white rounded-full absolute right-2 opacity-80 text-gray-700 z-10 hidden group-hover:block"
          />
        </div>
      </div>
    </>
  );
};

export default Profile;