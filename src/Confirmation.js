import React from 'react';
import './index.css';
import successLogo from './images/new_logo_stacked.jpg';
import doneGif from './images/done.gif';

function Confirmation() {
    return (
        <>
        <div className="min-h-screen bg-gradient-to-r from-ffbd00 to-[#eca600]">
            <br/>
            <div className="container mx-auto px-4 ">
        <div id="successcontainer" className="text-center">
          <img
            id="image"
            src={successLogo}
            alt="successLogo"
            className="mx-auto"
          />
          <br />
          <h3 className="text-xl font-semibold my-4">
            2023 Student Research Poster Competition
          </h3>
          <p className="text-xl mb-4">
            Thank you for registering to be a judge on Saturday, April 22, 2023
            from 9 am – 2 pm in the UWM Union Ballroom. Watch your email in early
            April for more details about the event.
            <br />
            <b className="font-bold">
              Questions? Contact ceas-events@uwm.edu
            </b>
          </p>
          <br />
          <img id="image" src={doneGif} alt="done" className="mx-auto" />
          <p id="status" className="text-sm mt-2"></p>
        </div>
      </div>
    </div>
    </>
    );
  }
  

export default Confirmation;
