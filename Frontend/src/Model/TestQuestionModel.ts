
interface answer  {
    A : { text : string},
    B : { text : string},
    C : { text : string},
    D : { text : string},
}
export interface TestQuestionModel{
    id : number,
    text : string,
    answers : answer,
    correctAnswerId : string,
    picture? : string
}