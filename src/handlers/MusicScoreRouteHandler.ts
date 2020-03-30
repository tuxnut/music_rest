import { getRepository } from "typeorm";
import { Request, Response } from 'express';
import { Score } from "../entities/Score";

export const getAllMusicScores = async (_req: Request, res: Response) => {
    const musicScores: Score[] = await getRepository(Score).find();
    res.json({ musicScores });
}

export const getMusicScoreByTitle = async (req: Request, res: Response) => {
    try {
        const musicScore: Score | undefined = await getRepository(Score).findOneOrFail({ title: req.params.title });
        res.json({ musicScore: musicScore });
    } catch (error) {
        console.error(error);
        res.status(404).send(error);
    }
}

export const saveMusicScore = async (req: Request, res: Response) => {
    try {
        const musicScore = getRepository(Score).create(req.body);
        const results = await getRepository(Score).save(musicScore);
        return res.send(results);
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
}

export const updateMusicScore = async (req: Request, res: Response) => {
    try {
        const musicScore: Score | undefined = await getRepository(Score).findOneOrFail({ title: req.params.title });
        getRepository(Score).merge(musicScore, req.body);
        const results = await getRepository(Score).save(musicScore);
        return res.send(results);
    } catch (error) {
        console.error(error);
        res.status(404).send(error);
    }
}

export const deleteMusicScore = async (req: Request, res: Response) => {
    try {
        const results = await getRepository(Score).delete({ title: req.params.title });
        return res.send(results);
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
}
