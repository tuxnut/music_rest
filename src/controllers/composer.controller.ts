import { Controller, Get, Route, Post, Put, Delete, Body } from "tsoa";
import { Composer } from "../entities/Composer";
import { getRepository } from "typeorm";
import { ComposerCreationRequest } from "../description/ComposerCreationRequest";

@Route('/composers')
export class ComposerController extends Controller {
    @Get('/')
    public async getAllComposers() {
        const composers: Composer[] = await getRepository(Composer).find();
        return { composers };
    }

    @Get('/{name}')
    public async getComposerByName(name: string) {
        try {
            const composer: Composer | undefined = await getRepository(Composer).findOneOrFail({ commonname: name });
           return { composer };
        } catch (error) {
            console.error(error);
            this.setStatus(404);
            return error;
        }
    }
    
    @Get('/{name}/musicscores')
    public async getMusicScoreByComposer(name: string) {
        try {
            const composer: Composer | undefined = await getRepository(Composer)
                .createQueryBuilder("composer")
                .leftJoinAndSelect("composer.scores", "scores")
                .where("composer.commonname = :name", { name: name })
                .getOne();
    
            const scores = composer?.scores;
    
            return { scores };
        } catch (error) {
            console.error(error);
            this.setStatus(404);
            return error;
        }
    }
    
    @Post('/')
    public async saveComposer(@Body() composer: ComposerCreationRequest) {
        try {
            const composerModel = getRepository(Composer).create(composer);
            const results = await getRepository(Composer).save(composerModel);
            return results;
        } catch (error) {
            console.error(error);
            this.setStatus(400);
            return error;
        }
    }
    
    @Put('/{name}')
    public async updateComposer(name: string, @Body() composer: ComposerCreationRequest) {
        try {
            const composerModel: Composer | undefined = await getRepository(Composer).findOneOrFail({ commonname: name });
            getRepository(Composer).merge(composerModel, composer);
            const results = await getRepository(Composer).save(composerModel);
            return results;
        } catch (error) {
            console.error(error);
            this.setStatus(404);
            return error;
        }
    }
    
    @Delete('/{name}')
    public async deleteComposer(name: string) {
        try {
            const results = await getRepository(Composer).delete({ commonname: name });
            return results.affected;
        } catch (error) {
            console.error(error);
            this.setStatus(400);
            return error;
        }
    }
}