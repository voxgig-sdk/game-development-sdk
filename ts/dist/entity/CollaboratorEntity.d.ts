import { GameDevelopmentEntityBase } from '../GameDevelopmentEntityBase';
import type { GameDevelopmentSDK } from '../GameDevelopmentSDK';
import type { Control } from '../types';
import type { Collaborator, CollaboratorCreateData } from '../GameDevelopmentTypes';
declare class CollaboratorEntity extends GameDevelopmentEntityBase<Collaborator> {
    constructor(client: GameDevelopmentSDK, entopts: any);
    make(this: CollaboratorEntity): CollaboratorEntity;
    create(this: any, reqdata?: CollaboratorCreateData, ctrl?: Control): Promise<CollaboratorEntity>;
}
export { CollaboratorEntity };
