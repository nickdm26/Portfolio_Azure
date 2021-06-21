import React, { Component } from 'react';
import C_Sharp_logo from './Images/C_Sharp_logo.svg';
import HTML5_logo from './Images/HTML5_logo.svg';
import CSS3_logo from './Images/CSS3_logo.svg';
import JavaScript_logo from './Images/Unofficial_JavaScript_logo.svg';
import React_logo from './Images/React-logo.svg';
import Git_logo from './Images/Git-logo.svg';
import Python_logo from './Images/Python-logo.svg';
import MySql_logo from './Images/mysql_logo.svg';
import resume from './pdfs/Nicholas_Muldrew_CV_2020.pdf';

import Contactform from "./contactForm"
import Temperature from "./temperature_api"

class Home extends Component {
    render() {
        return (
            <>
                <div className="HomeContainer">
                    <div id="Intro" className="Section">
                        <h1>Nick Muldrew</h1>
                        <h1>Software Developer</h1>
                        <p>Based in Dunedin, New Zealand</p>
                        <Temperature />
                    </div>

                    <div id="AboutMe" className="Section">

                        <h3>About Me</h3>
                        <p className="left">
                            My passion is designing and creating new software, from a young age I’ve always enjoyed building and creating new things.
                            This interest developed my passion further where I completed my Bachelor of Information Technology.
                            I’m looking forward to progressing my skills and knowledge in a role that offers growth.
                        </p>
                    </div>
                    <div id="Interests" className="Section">
                        <h3>Interests</h3>
                        <p>Gaming <br />
                            Fitness
                        </p>

                    </div>

                    <div id="ExperiencedWith" className="Section">
                        <h3>Experienced With</h3>

                        <div className="Icons">
                            <a href="https://en.wikipedia.org/wiki/C_Sharp_(programming_language)">
                                <div className="icon">
                                    <img className="icon" src={C_Sharp_logo} alt="C Sharp Logo" />
                                    <span>C Sharp</span>
                                </div>
                            </a>
                            <a href="https://en.wikipedia.org/wiki/Python_(programming_language)">
                                <div className="icon">
                                    <img className="icon" src={Python_logo} alt="Python" />
                                    <span>Python</span>
                                </div>
                            </a>
                            <a href="https://en.wikipedia.org/wiki/MySQL">
                                <div className="icon">
                                    <img className="icon" src={MySql_logo} alt="MySql" />
                                    <span>MySql</span>
                                </div>
                            </a>
                            <a href="https://en.wikipedia.org/wiki/Git">
                                <div className="icon">
                                    <img className="icon" src={Git_logo} alt="Git" />
                                    <span>Git</span>
                                </div>
                            </a>
                            <a href="https://en.wikipedia.org/wiki/HTML">
                                <div className="icon">
                                    <img className="icon" src={HTML5_logo} alt="HTML 5" />
                                    <span>HTML</span>
                                </div>
                            </a>
                            <a href="https://en.wikipedia.org/wiki/Cascading_Style_Sheets">
                                <div className="icon">
                                    <img className="icon" src={CSS3_logo} alt="CSS 3" />
                                    <span>CSS</span>
                                </div>
                            </a>
                            <a href="https://en.wikipedia.org/wiki/JavaScript">
                                <div className="icon">
                                    <img className="icon" src={JavaScript_logo} alt="JavaScript" />
                                    <span>JavaScript</span>
                                </div>
                            </a>
                            <a href="https://en.wikipedia.org/wiki/React_(web_framework)">
                                <div className="icon">
                                    <img className="icon" src={React_logo} alt="React" />
                                    <span>React</span>
                                </div>
                            </a>

                        </div>
                    </div>
                    <div id="Resume" className="Section">
                        <h3>Resume</h3>
                        <a href={resume} document="Nick Muldrew Resume">View Resume</a>
                        <br />
                        <a href={resume} download="Nick Muldrew Resume">Download Resume</a>
                    </div>
                    <Contactform />

                </div>
            </>
        );
    }
}

export default Home;