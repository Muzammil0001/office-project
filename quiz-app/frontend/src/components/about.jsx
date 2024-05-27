import { aboutImage } from "../config/constants/images";

const About = () => {
  return (
    <>
      <div className="mt-14 mb-10 md:mt-20 md:mb-12 min-h-[400px] px-5 lg:px-20">
        <h1 className="heading1">Quiz App Revolution</h1>
        <div className=" flex lg:flex-row flex-col gap-10">
          <div className=" outline-1 outline-blue-950  w-full flex justify-center lg:justify-start items-center ">
            <img
              src={aboutImage}
              alt="about-img"
              className="outline-1 outline-blue-950 ani p-2 lg:p-0 object-cover rounded-full lg:rounded-[50px] sm:h-[200px] w-[170px] h-[170px] sm:w-[200px] lg:h-[400px]  lg:w-full"
            />
          </div>
          <div className="max-h-full">
            <p className="pera">
              Welcome to the ultimate learning and assessment experience that
              will blow your mind! Our quiz app is not just any app; it's a
              game-changer for students, teachers, and administrators. Dive into
              a world where learning meets excitement!
            </p>
            <p className="pera">
              Students, get ready to embark on a journey of knowledge like never
              before. Access quizzes, track your progress, and ignite
              discussions that will spark your curiosity and challenge your
              intellect.
            </p>
            <p className="pera">
              Teachers, brace yourselves for a teaching revolution! Create
              quizzes, analyze performance with the precision of a hawk, and
              shower your students with feedback that will inspire greatness.
              It's time to take teaching to a whole new level!
            </p>
            <p className="pera">
              Teachers, brace yourselves for a teaching revolution! Create
              quizzes, analyze performance with the precision of a hawk, and
              shower your students with feedback that will inspire greatness.
              It's time to take teaching to a whole new level!
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
