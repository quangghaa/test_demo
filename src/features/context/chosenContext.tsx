// import React, { createContext, useState } from "react";
// import { ChosenContextType, IChosen } from "../interface";

// export const ChosenContext = createContext<ChosenContextType | null>(null);

// const ChosenProvider: React.FC<React.ReactNode> = ({children}) => {
//     const [chosens, setChosens] = useState<IChosen[]>([
        
//     ])

//     const addChosen = (chosen: IChosen) => {
//         const newChosen: IChosen = {
//             id: chosen.id,
//             value: chosen.value
//         }
//         setChosens([...chosens, newChosen]);
//     }

//     const updateChosen = (chosen: IChosen) => {
//         chosens.filter((ch: IChosen) => {
//             if(chosen.id === ch.id) {
//                 ch.id = chosen.id;
//                 ch.value = chosen.value;
//                 setChosens(...[chosens]);
//             }
//         })
//     }
// }
export {}