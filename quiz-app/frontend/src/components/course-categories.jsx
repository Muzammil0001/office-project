import { useState } from "react";
import { courseImage5 } from "../config/constants/images";

const CourseCategories = () => {
  const [rating, setRating] = useState(50);
  return (
    <>
      <div>
        <h1 className="heading1">Explore Category</h1>
        <div className="p-3 md:p-10 min-h-[500px] flex-wrap w-full flex sm:flex-row flex-col justify-center gap-5 items-center">
          {[1, 2, 3, 4].map((item) => {
            return (
              <div className="hover:mt-[-5px] duration-300 cursor-pointer w-[300px] h-[400px] shadow-md shadow-gray-300 bg-white rounded-[20px]">
                <div>
                  <img
                    className="h-[200px] w-[300px] object-fit rounded-tl-[20px] rounded-tr-[20px]"
                    src={courseImage5}
                    alt={courseImage5}
                  />
                </div>
                <div className="px-5 py-3">
                  <h3 className="heading3">Web Development</h3>
                  <p className="text-center py-2">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Nulla vitae aliquid dignissimos.
                  </p>
                  <div className="flex justify-center">
                    {" "}
                    <button className="btn">Enroll Now</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default CourseCategories;
