import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useState} from "react";

type TextContextProviderProps = {
    children : ReactNode
}

type testContextProps = {
    setScore : Dispatch<SetStateAction<number>>,
    setIndex : Dispatch<SetStateAction<number>>,
    score : number,
    index : number,
}

const testContext = createContext({} as testContextProps)
export function UseTest(){
    return useContext(testContext)
}

export function TextContextProvider({children} : TextContextProviderProps){
    const [score, setScore] = useState<number>(0)
    const [index, setIndex] = useState<number>(1)

    console.log(score)

    return(
        <testContext.Provider value={{ score, setScore, setIndex, index}}>
            {children}
        </testContext.Provider>
    )
}