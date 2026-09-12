import { GameDevelopmentEntityBase } from '../GameDevelopmentEntityBase';
import type { GameDevelopmentSDK } from '../GameDevelopmentSDK';
import type { Control } from '../types';
import type { Build, BuildCreateData } from '../GameDevelopmentTypes';
declare class BuildEntity extends GameDevelopmentEntityBase<Build> {
    constructor(client: GameDevelopmentSDK, entopts: any);
    make(this: BuildEntity): BuildEntity;
    create(this: any, reqdata?: BuildCreateData, ctrl?: Control): Promise<BuildEntity>;
}
export { BuildEntity };
