import { Controller, Get, Route, Post, BodyProp, Put, Delete } from "tsoa";
import { Score } from "../entities/Score";
import { getRepository, DeepPartial } from "typeorm";

@Route('musicscores')
export class MusicScoreController extends Controller {
    @Get('/')
    public async getAllMusicScores() {
        const musicScores: Score[] = await getRepository(Score).find();
        return { musicScores };
    }
    
    @Get('/{title}')
    public async getMusicScoreByTitle(title: string) {
        try {
            const musicScore: Score | undefined = await getRepository(Score).findOneOrFail({ title: title });
            return { musicScore: musicScore };
        } catch (error) {
            console.error(error);
            this.setStatus(404);
            return error;
        }
    }
    
    @Post('/')
    public async saveMusicScore(@BodyProp('musicscore') musicscore: DeepPartial<Score>) {
        try {
            const musicScoreModel = getRepository(Score).create(musicscore);
            const results = await getRepository(Score).save(musicScoreModel);
            return results;
        } catch (error) {
            console.error(error);
            this.setStatus(400);
            return error;
        }
    }
    
    @Put('/{title}')
    public async updateMusicScore(title: string, @BodyProp('musicscore') musicscore: DeepPartial<Score>) {
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
