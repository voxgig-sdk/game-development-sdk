import { GameDevelopmentEntityBase } from '../GameDevelopmentEntityBase';
import type { GameDevelopmentSDK } from '../GameDevelopmentSDK';
import type { Control } from '../types';
import type { Analytics, AnalyticsListMatch, AnalyticsCreateData } from '../GameDevelopmentTypes';
declare class AnalyticsEntity extends GameDevelopmentEntityBase<Analytics> {
    constructor(client: GameDevelopmentSDK, entopts: any);
    make(this: AnalyticsEntity): AnalyticsEntity;
    list(this: any, reqmatch?: AnalyticsListMatch, ctrl?: Control): Promise<AnalyticsEntity[]>;
    create(this: any, reqdata?: AnalyticsCreateData, ctrl?: Control): Promise<AnalyticsEntity>;
}
export { AnalyticsEntity };
