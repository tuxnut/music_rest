export interface ScoreCreationRequest {
    composerName: string;
    title: string;
    type: string;
    dateofcreation?: Date;
    difficulty: number;
    appreciation: number;
    comments?: string;
}
