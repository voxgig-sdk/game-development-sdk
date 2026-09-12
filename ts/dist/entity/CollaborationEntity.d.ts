import { GameDevelopmentEntityBase } from '../GameDevelopmentEntityBase';
import type { GameDevelopmentSDK } from '../GameDevelopmentSDK';
import type { Control } from '../types';
import type { Collaboration, CollaborationListMatch, CollaborationRemoveMatch } from '../GameDevelopmentTypes';
declare class CollaborationEntity extends GameDevelopmentEntityBase<Collaboration> {
    constructor(client: GameDevelopmentSDK, entopts: any);
    make(this: CollaborationEntity): CollaborationEntity;
    list(this: any, reqmatch?: CollaborationListMatch, ctrl?: Control): Promise<CollaborationEntity[]>;
    remove(this: any, reqmatch?: CollaborationRemoveMatch, ctrl?: Control): Promise<CollaborationEntity>;
}
export { CollaborationEntity };
