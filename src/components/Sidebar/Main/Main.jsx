// import React, { useContext } from "react";
// import './Main.css'
// import assets from "../../../assets/assets";
// import { Context } from "../../../context/context";

// const Main = () => {
//     const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context)
//     return (
//         <div className="main">
//             <div className="nav">
//                 <p>Gemini</p>
//                 <img src={assets.user_icon} alt="User Icon" />
//             </div>
//             <div className="main-container">
//                 {!showResult
//                     ? <>

//                         <div className="greet">
//                             <p><span>Hello User.</span></p>
//                             <p>How can I assist you today?</p>
//                         </div>
//                         <div className="cards">
//                             <div className="card">
//                                 <p>Suggest beautiful places to see on an upcoming road trip</p>
//                                 <img src={assets.compass_icon} alt="Compass Icon" />
//                             </div>

//                             <div className="card">
//                                 <p>Briefly summarize this concept: how life can be beautiful</p>
//                                 <img src={assets.bulb_icon} alt="Bulb Icon" />
//                             </div>

//                             <div className="card">
//                                 <p>Brainstorm team bonding activities for our work retreat</p>
//                                 <img src={assets.message_icon} alt="Message Icon" />
//                             </div>

//                             <div className="card">
//                                 <p>Improve the readability of the following code</p>
//                                 <img src={assets.code_icon} alt="Code Icon" />
//                             </div>
//                         </div>

//                     </>

//                     :<div className='result' >
//                         <div className="result-title">
//                             <img src={assets.user_icon} alt="" /> 
//                             <p>{recentPrompt}</p>
//                             </div>

//                             <div className="result-data">
//                         <img src={assets.gemini_icon} alt=""/>
//                         <p dangerouslySetInnerHTML={{__html:resultData}}></p>
//                         </div>
//                         </div>
            
//             }



//                         <div className="main-bottom">
//                             <div className="search-box">
//                                 <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder="Enter a prompt here" />
//                                 <div>



//                                     <img src={assets.gallery_icon} alt="" />
//                                     <img src={assets.mic_icon} alt="" />
//                                     <img onClick={() => onSent()} src={assets.send_icon} alt="" />

//                                 </div>
//                             </div>
//                             <p className="bottom-info">
//                                 Gemini can make mistakes, so double-check it


//                             </p>


//                         </div>
//                     </div>
//         </div>
//             );
// }

//             export default Main;


import React, { useContext } from "react";
import './Main.css';
import assets from "../../../assets/assets";
import { Context } from "../../../context/Context";  // Ensure this is just the import, no redeclaration

const Main = () => {
    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);

    return (
        <div className="main">
            <div className="nav">
                <p>Gemini</p>
                <img src={assets.user_icon} alt="User Icon" />
            </div>
            <div className="main-container">
                {!showResult
                    ? <>
                        <div className="greet">
                            <p><span>Hello User.</span></p>
                            <p>How can I assist you today?</p>
                        </div>

                        {/* Displaying the recent prompt */}
                        <div className="asked-question">
                            {recentPrompt && <p><strong>Your Question:</strong> {recentPrompt}</p>}
                        </div>

                        <div className="cards">
                            <div className="card">
                                <p>Suggest beautiful places to see on an upcoming road trip</p>
                                <img src={assets.compass_icon} alt="Compass Icon" />
                            </div>
                            <div className="card">
                                <p>Briefly summarize this concept: how life can be beautiful</p>
                                <img src={assets.bulb_icon} alt="Bulb Icon" />
                            </div>
                            <div className="card">
                                <p>Brainstorm team bonding activities for our work retreat</p>
                                <img src={assets.message_icon} alt="Message Icon" />
                            </div>
                            <div className="card">
                                <p>Improve the readability of the following code</p>
                                <img src={assets.code_icon} alt="Code Icon" />
                            </div>
                        </div>
                    </>
                    : <div className="result">
                        <div className="result-title">
                            <img src={assets.user_icon} alt="" />
                            <p>{recentPrompt}</p>  {/* Display recent prompt */}
                        </div>

                        <div className="result-data">
                            <img src={assets.gemini_icon} alt="" />
                            {loading
                            ? <div className='loader'>
                  <hr />
                  <hr />
                  <hr />
                            </div>
                            :<p dangerouslySetInnerHTML={{ __html: resultData }}></p>

                        }
                        </div>
                    </div>
                }

                {/* Display loading indicator if `loading` is true */}
                {loading && (
                    <div className="loading-spinner">
                        <p>Loading...</p>  {/* You can replace this with a spinner */}
                    </div>
                )}

                <div className="main-bottom">
                    <div className="search-box">
                        <input
                            onChange={(e) => setInput(e.target.value)}  // Update input state
                            value={input}  // Bind input value to state
                            type="text"
                            placeholder="Enter a prompt here"
                            onKeyPress={(e) => e.key === "Enter" && onSent(input)}  // Trigger `onSent` when Enter is pressed
                        />
                        <div>
                            <img src={assets.gallery_icon} alt="" />
                            <img src={assets.mic_icon} alt="" />
                           {input?<img onClick={() => onSent(input)} src={assets.send_icon} alt="Send Icon" />:null  } 
                        </div>
                    </div>
                    <p className="bottom-info">
                        Gemini can make mistakes, so double-check it
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Main;
