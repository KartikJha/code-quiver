export interface IJoke {
    id: string;
    userId: string;
    joke: string;
    battleId: string;
    createdAt: Date;
    updatedAt: Date;
    score: BigInt
    // How should the score be stored ? How will it be calculated ?
}

export class Joke implements IJoke {
    id: string;

}   