import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import 'animate.css/animate.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbtack } from '@fortawesome/free-solid-svg-icons';
import CountdownTimer from './CountdownTimer';




const Home = () => {
  useState(() => {
    document.title = 'Home';
  }, []);
  

  return (
    <>
    <CountdownTimer targetDate={new Date('2023-04-22T09:00:00-05:00')} />
    <div className="min-h-screen bg-gradient-to-r from-ffbd00 to-[#eca600] flex items-center -mt-5">
      <div className="flex justify-center w-full">
        <div className="container mx-auto px-4 py-6">
          <div className="bg-white shadow-md rounded-lg p-8 animate__animated animate__fadeIn">
            <h1 className="text-4xl font-bold text-center mb-6 animate__animated animate__fadeInDown">
              Student Research Poster Competition - 2023
            </h1>
            <p className="mb-8">
              Please make every effort to judge at least 3 posters (all undergraduate
              or all graduate). Please enter scores numerically for one poster at a
              time. When you enter the poster ID, the student’s name and poster title
              will display. You will see a Scores Table below with the scores you have
              entered. You can edit your scores later if necessary.
            </p>
          </div>
          <br />
          
          <h3 className="text-2xl font-bold text-center mb-4 bg-white shadow-md rounded-lg p-4 animate__animated animate__fadeInDown">
            Scoring Rubric
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6">
            <div className="bg-white shadow-md rounded-lg p-6 mb-6 animate__animated animate__fadeInUp">
              <FontAwesomeIcon
                icon={faThumbtack}
                className="absolute top-[-15px] left-1/2 transform -translate-x-1/2 text-[black] text-[30px]"
                size="lg"
              />

              <h6 className="text-xl font-semibold mb-2">Research (up to 50 points)</h6>
              <ul className="list-disc list-inside">
                <li>Research is original and innovative.</li>
                <li>
                  Research has practical implications/research is relevant to current
                  industry needs.
                </li>
                <li>
                  Research methodology is sound (e.g., research process, data quantity
                  is sufficient).
                </li>
                <li>
                  The result/conclusion of the research is clear and easy to understand.
                </li>
              </ul>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6 mb-6 animate__animated animate__fadeInUp">
            <FontAwesomeIcon
                icon={faThumbtack}
                className="absolute top-[-15px] left-1/2 transform -translate-x-1/2 text-[black] text-[30px]"
                size="lg"
              />
              <h6 className="text-xl font-semibold mb-2">Communication (up to 30 points)</h6>
              <ul className="list-disc list-inside">
                <li>
                  Student clearly explains project, including initial problem or
                  question, the process, and the result/conclusion.
                </li>
                <li>
                  Student is able to explain the research in a way that is easily
                  understood by those outside the subject area or without the specific
                  technical expertise.
                </li>
                <li>Student speaks at an appropriate volume and pace.</li>
                <li>Student demonstrates enthusiasm for the topic.</li>
              </ul>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6 mb-6 animate__animated animate__fadeInUp">
            <FontAwesomeIcon
                icon={faThumbtack}
                className="absolute top-[-15px] left-1/2 transform -translate-x-1/2 text-[black] text-[30px]"
                size="lg"
              />
              <h6 className="text-xl font-semibold mb-2">Appearance (up to 20 points)</h6>
              <ul className="list-disc list-inside">
                <li>Research is displayed in a logical way.</li>
                <li>Data is displayed in such a way that lends itself to clear interpretation.</li>
                <li>Pictures, digital images and graphs are of high quality.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );

};
export default Home;
