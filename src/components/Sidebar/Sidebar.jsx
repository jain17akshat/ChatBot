// import React, { useState } from 'react'
// import './Sidebar.css'
// // Correct assets path
// import assets from '../../assets/assets'
// import { Context } from '../../context/Context'

// const Sidebar = () => {
//   const [extended, setextended] = useState(false)
// const{onSent ,prevPrompts,setRecentPrompt}=useContext(Context)
//   return (
//     <div className="Sidebar">
//       <div className="top">
//         <img 
//           onClick={() => setextended(prev => !prev)} 
//           className="menu" 
//           src={assets.menu_icon} 
//           alt="Menu Icon" 
//         />
//         <div className="new-chat">
//           <img src={assets.plus_icon} alt="Plus Icon" />
//           {extended ? <p>New Chat</p> : null}
//         </div>
//         {extended ? (
//           <div className="recent">
//             <p className="recent-title">Recent</p>
//             {prevPrompts.map((item,index)=>{
//               return(
//                 <div className="recent-entry">
//                 <img src={assets.message_icon} alt="Message Icon" />
//                 <p>{item}...</p>
//               </div>
//               )
//             })}
           
//           </div>
//         ) : null}
//       </div>
      
//       <div className="bottom">
//         <div className="bottomitem recent-entry">
//           <img src={assets.question_icon} alt="Question Icon" />
//           {extended ? <p>Help</p> : null}
//         </div>
//         <div className="bottomitem recent-entry">
//           <img src={assets.history_icon} alt="History Icon" />
//           {extended ? <p>Activity</p> : null}
//         </div>
//         <div className="bottomitem recent-entry">
//           <img src={assets.setting_icon} alt="Settings Icon" />
//           {extended ? <p>Settings</p> : null}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Sidebar
import React, { useState, useContext } from 'react';  // Import useContext here
import './Sidebar.css'
// Correct assets path
import assets from '../../assets/assets'
import { Context } from '../../context/Context'  // Import your context from the correct path

const Sidebar = () => {
  const [extended, setextended] = useState(false);
  
  // Use useContext hook to access context values
  const { onSent, prevPrompts, setRecentPrompt,newChat } = useContext(Context);
const loadPrompt=async(prompt)=>{
  setRecentPrompt(prompt)
   await onSent(prompt)
}
  return (
    <div className="Sidebar">
      <div className="top">
        <img 
          onClick={() => setextended(prev => !prev)} 
          className="menu" 
          src={assets.menu_icon} 
          alt="Menu Icon" 
        />
        <div onClick={()=>newChat()}className="new-chat">
          <img src={assets.plus_icon} alt="Plus Icon" />
          {extended ? <p>New Chat</p> : null}
        </div>
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((item, index) => (
              <div onClick={()=>loadPrompt(item)} className="recent-entry" key={index}>
                <img src={assets.message_icon} alt="Message Icon" />
                <p>{item.slice(0,18)}...</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <div className="bottom">
        <div className="bottomitem recent-entry">
          <img src={assets.question_icon} alt="Question Icon" />
          {extended ? <p>Help</p> : null}
        </div>
        <div className="bottomitem recent-entry">
          <img src={assets.history_icon} alt="History Icon" />
          {extended ? <p>Activity</p> : null}
        </div>
        <div className="bottomitem recent-entry">
          <img src={assets.setting_icon} alt="Settings Icon" />
          {extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  )
}

export default Sidebar;
