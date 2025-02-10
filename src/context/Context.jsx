

// import { createContext, useState } from "react";
// import run from "../config/gemini";

// export const Context = createContext();

// const ContextProvider = (props) => {
//     const [input, setInput] = useState("");  // Stores input field value
//     const [recentPrompt, setRecentPrompt] = useState("");  // Stores the most recent prompt
//     const [prevPrompts, setPrevPrompts] = useState([]);  // Stores previous prompts
//     const [showResult, setShowResult] = useState(false);  // Controls whether to show the result
//     const [loading, setLoading] = useState(false);  // Indicates loading state
//     const [resultData, setResultData] = useState("");  // Stores the result from API
 
//     const delayPara=(index,nextWord)=>{


//     }



//     const onSent = async (prompt) => {
//         if (!prompt.trim()) return; // Prevent empty input

//         setResultData("");  // Clear previous result
//         setLoading(true);  // Set loading state
//         setShowResult(true);  // Show the result area
//         setRecentPrompt(prompt);  // ✅ Correctly updating recentPrompt
//         setPrevPrompts(prev => [...prev, prompt]);  // ✅ Store the question in history

//         try {
//             const response = await run(prompt);  // Call API
//             setResultData(response);  // ✅ Store API response
//         } catch (error) {
//             console.error("Error fetching response:", error);
//             setResultData("An error occurred. Please try again.");  // Handle error gracefully
//         }
// let responseArray=response.split("**");

// let newResponse;
// for(let i=0;i<responseArray.length;i++){
//     if(i===0 || i%2 !==1){
//           newResponse+=responseArray[i];

        
//     }
//     else{
//         newResponse+="<b>"+responseArray[i]+"</b>";
//     }
// }
//         setLoading(false);  // ✅ Stop loading after getting response
//         setInput("");  // ✅ Clear input after submitting
//     };

//     return (
//         <Context.Provider value={{ prevPrompts, setPrevPrompts, onSent, recentPrompt, setRecentPrompt, showResult, loading, resultData, input, setInput }}>
//             {props.children}
//         </Context.Provider>
//     );
// };

// export default ContextProvider;
import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");  // Stores input field value
    const [recentPrompt, setRecentPrompt] = useState("");  // Stores the most recent prompt
    const [prevPrompts, setPrevPrompts] = useState([]);  // Stores previous prompts
    const [showResult, setShowResult] = useState(false);  // Controls whether to show the result
    const [loading, setLoading] = useState(false);  // Indicates loading state
    const [resultData, setResultData] = useState("");  // Stores the result from API

    // Function to delay the word-by-word display
    const delayPara = (index, nextWord) => {
        setTimeout(function () {
            setResultData(prev => prev + nextWord);  // Append the next word to the result
        }, 75 * index);  // 75ms delay per word
    }
    const  newChat=()=>{
        setLoading(false)
        setShowResult(false)
    }

    const onSent = async (prompt) => {
        if (!prompt.trim()) return; // Prevent empty input

        setResultData("");  // Clear previous result
        setLoading(true);  // Set loading state
        setShowResult(true); 
        let response;
        if(prompt !==undefined){
         response =await run(prompt);
         setRecentPrompt(prompt)
        }
        else{
            setPrevPrompts(prev=>[...prev,input])
            setRecentPrompt(input)
            response=await run(input)
        }
        setRecentPrompt(prompt);  // ✅ Correctly updating recentPrompt
        setPrevPrompts(prev => [...prev, prompt]);  // ✅ Store the question in history

        try {
            const response = await run(prompt);  // Call API

            // ✅ Processing the response for bold formatting
            let responseArray = response.split("**");
            let newResponse = "";  // ✅ Initialize newResponse correctly

            for (let i = 0; i < responseArray.length; i++) {
                if (i % 2 === 0) {
                    newResponse += responseArray[i];  // Normal text
                } else {
                    newResponse += "<b>" + responseArray[i] + "</b>";  // Bold text
                }
            }

            // ✅ Additional Processing: Replace "*" with line breaks
            let newResponse2 = newResponse.split("*").join("</br>");

            // ✅ Split the text into words
            let newResponseArray = newResponse2.split(" ");
            setResultData("");  // Reset resultData to display the text dynamically

            // ✅ Delay word-by-word display
            for (let i = 0; i < newResponseArray.length; i++) {
                const nextWord = newResponseArray[i];
                delayPara(i, nextWord + " ");  // Add a space after each word
            }

        } catch (error) {
            console.error("Error fetching response:", error);
            setResultData("An error occurred. Please try again.");  // Handle error gracefully
        }

        setLoading(false);  // ✅ Stop loading after getting response
        setInput("");  // ✅ Clear input after submitting
    };

    return (
        <Context.Provider value={{ prevPrompts, setPrevPrompts, onSent, recentPrompt, setRecentPrompt, showResult, loading, resultData, input, setInput,newChat }}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
