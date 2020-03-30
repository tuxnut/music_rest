import { getRepository } from "typeorm";
import { Request, Response } from 'express';
import { Composer } from "../entities/Composer";
import { Score } from "../entities/Score";

export const getAllComposers = async (_req: Request, res: Response) => {
    const composers: Composer[] = await getRepository(Composer).find();
    res.json({ composers });
}

export const getComposerByName = async (req: Request, res: Response) => {
    try {
        const composer: Composer | undefined = await getRepository(Composer).findOneOrFail({ commonname: req.params.name });
        res.json({ composer });
    } catch (error) {
        console.error(error);
        res.status(404).send(error);
    }
}

export const getMusicScoreByComposer = async (req: Request, res: Response) => {
    try {
        const composer: Composer | undefined = await getRepository(Composer)
            .createQueryBuilder("composer")
            .leftJoinAndSelect("composer.composer_id", "composerId")
            .where("composer.commonname = :name", { name: req.params.name })
            .getOne();

        const composerWorks = composer?.composer_id;

        res.json({ composerWorks });
    } catch (error) {
        console.error(error);
        res.status(404).send(error);
    }
}

export const saveComposer = async (req: Request, res: Response) => {
    try {
        const composer = getRepository(Composer).create(req.body);
        const results = await getRepository(Composer).save(composer);
        return res.send(results);
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
}

export const updateComposer = async (req: Request, res: Response) => {
    try {
        const composer: Composer | undefined = await getRepository(Composer).findOneOrFail({ commonname: req.params.name });
        getRepository(Composer).merge(composer, req.body);
        const results = await getRepository(Composer).save(composer);
        return res.send(results);
    } catch (error) {
        console.error(error);
        res.status(404).send(error);
    }
}

export const deleteComposer = async (req: Request, res: Response) => {
    try {
        const results = await getRepository(Composer).delete({ commonname: req.params.name });
        return res.send(results);
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
}
