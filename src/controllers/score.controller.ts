import { Controller, Get, Route, Post, Put, Delete, Body } from "tsoa";
import { Score } from "../entities/Score";
import { getRepository } from "typeorm";
import { ScoreCreationRequest } from "../description/ScoreCreationRequest";
import { Composer } from "../entities/Composer";

@Route('musicscores')
export class MusicScoreController extends Controller {
    @Get('/')
    public async getAllMusicScores() {
        const musicScores = await getRepository(Score)
                .createQueryBuilder("s")
                .leftJoinAndSelect("s.composer", "c")
                .getMany();

        return { musicScores };
    }
    
    @Get('/{title}')
    public async getMusicScoreByTitle(title: string) {
        try {
            const musicScore: Score | undefined = await getRepository(Score)
                .createQueryBuilder("s")
                .leftJoinAndSelect("s.composer", "c")
                .where("s.title = :title", { title: title })
                .getOne();

            return { musicScore };
        } catch (error) {
            console.error(error);
            this.setStatus(404);
            return error;
        }
    }
    
    @Post('/')
    public async saveMusicScore(@Body() musicscore: ScoreCreationRequest) {
        try {
            const composer: Composer | undefined = await getRepository(Composer).findOneOrFail({ commonname: musicscore.composerName });
            const musicScoreModel = getRepository(Score).create({...musicscore, composer: composer});
            const results = await getRepository(Score).save(musicScoreModel);
            return results;
        } catch (error) {
            console.error(error);
            this.setStatus(400);
            return error;
        }
    }
    
    @Put('/{title}')
    public async updateMusicScore(title: string, @Body() musicscore: ScoreCreationRequest) {
        try {
            const musicScoreModel: Score | undefined = await getRepository(Score).findOneOrFail({ title: title });
            getRepository(Score).merge(musicScoreModel, musicscore);
            const results = await getRepository(Score).save(musicScoreModel);
            return results;
        } catch (error) {
            console.error(error);
            this.setStatus(404);
            return error;
        }
    }
    
    @Delete('/{title}')
    public async deleteMusicScore(title: string) {
        try {
            const results = await getRepository(Score).delete({ title: title });
            return results.affected;
        } catch (error) {
            console.error(error);
            this.setStatus(400);
            return error;
        }
    }
}
