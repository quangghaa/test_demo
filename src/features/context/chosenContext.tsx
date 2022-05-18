import React, { createContext, useContext, useState } from "react";
import { IChosen } from "../interface";


export type ChosenContextType = {
    chosens: IChosen[]
    addChosen: (chosen: IChosen) => void
    updateChosen: (chosen: IChosen) => void
}

export const MyChosenContext = createContext<ChosenContextType>({
    chosens: [] as IChosen[],
    addChosen: () => {},
    updateChosen: () => {}

})

export const useChosenContext = () => useContext(MyChosenContext);
