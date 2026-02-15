"use client";
import { useEffect } from "react";

export default function WakeServer() {
  const logo = `
 ________                               
|\   ____\                              
\ \  \___|                              
 \ \  \                                 
  \ \  \____                            
   \ \_______\                          
    \|_______|                          
                                        
                                        
                                        
        ________                        
       |\   __  \                       
       \ \  \|\  \                      
        \ \   __  \                     
         \ \  \ \  \                    
          \ \__\ \__\                   
           \|__|\|__|                   
                                        
                                        
                                        
              ________                  
             |\   __  \                 
             \ \  \|\  \                
              \ \   _  _\               
               \ \  \\  \|              
                \ \__\\ _\              
                 \|__|\|__|             
                                        
                                        
                                        
                    ___  ___            
                   |\  \|\  \           
                   \ \  \\\  \          
                    \ \  \\\  \         
                     \ \  \\\  \        
                      \ \_______\       
                       \|_______|       
                                        
                                        
                                        
                          ________      
                         |\   ____\     
                         \ \  \___|_    
                          \ \_____  \   
                           \|____|\  \  
                             ____\_\  \ 
                            |\_________\
                            \|_________|
                                        
                                        
    `;
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_RENDER_API_URL}/health`, {
      mode: "no-cors",
    }).catch((err) => console.log("Server waking up!", err));

    const titleStyle = `
      color: #2ecc71; 
      font-size: 24px; 
      font-weight: bold; 
      font-family: sans-serif; 
      text-shadow: 2px 2px 0px #000;
    `;

    const subTitleStyle = `
      color: #3498db; 
      font-size: 14px; 
      font-style: italic;
    `;

    const noteStyle = `
      color: #95a5a6; 
      font-size: 12px;
    `;

    console.log(`%c${logo}`, "color: #27ae60; font-weight: bold;");
    console.log("%c♻️ Welcome to Carus Recycling", titleStyle);
    console.log("%cEnjoy your browsing experience!", subTitleStyle);
    console.log(
      "%c--------------------------------------------------\n" +
        "Powered by Rahmlad Solutions. \n" +
        "--------------------------------------------------",
      noteStyle,
    );
  }, [logo]);

  return null;
}
