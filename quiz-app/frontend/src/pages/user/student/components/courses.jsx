import { courseImage5 } from "../../../../config/constants/images";

const Courses = () => {
  return (
    <>
      <div>
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
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla
              vitae aliquid dignissimos.
            </p>
            <div className="flex justify-center">
              {" "}
              <button className="btn">Read more</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Courses;
