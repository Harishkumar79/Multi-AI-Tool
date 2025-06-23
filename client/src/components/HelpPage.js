import React from "react";
import '../App.css';
import Navbar from './Navbar';
import img1 from '../assets/help1.png'
import img2 from '../assets/help2.png'
import img3 from '../assets/help3.png'

export default function HelpPage() {
    return (
        <div className="HelpPage">
            <Navbar />
            <div className="help-page-container">

                <h1>Welcome,To HelpPage...!</h1>

                <div className="help-tabs">
                    <img alt="help1" src={img1} />
                    <div>
                        <h1>Step : 1</h1>
                        <h1>Enter your prompt</h1>
                        <p>Please enter your prompt in the textarea give to perform your action</p>
                    </div>
                </div>
                <div className="help-tabs">
                    <img alt="help2" src={img2} />
                    <div>
                        <h1>Step : 2</h1>
                        <h1>Choose your AI-Tool</h1>
                        <p>Please click on the buttons to choose the ai tool from given options to use it</p>
                    </div>
                </div>
                <div className="help-tabs">
                    <img alt="help3" src={img3} />
                    <div>
                        <h1>Step : 3</h1>
                        <h1>Get Response</h1>
                        <p>Wait for some time to process the request <br />On successfully api call you will get a response in the output box. </p>
                    </div>
                </div>

            </div>
        </div>
    )
}