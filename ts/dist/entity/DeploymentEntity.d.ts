import { GameDevelopmentEntityBase } from '../GameDevelopmentEntityBase';
import type { GameDevelopmentSDK } from '../GameDevelopmentSDK';
import type { Control } from '../types';
import type { Deployment, DeploymentLoadMatch, DeploymentListMatch, DeploymentCreateData } from '../GameDevelopmentTypes';
declare class DeploymentEntity extends GameDevelopmentEntityBase<Deployment> {
    constructor(client: GameDevelopmentSDK, entopts: any);
    make(this: DeploymentEntity): DeploymentEntity;
    load(this: any, reqmatch?: DeploymentLoadMatch, ctrl?: Control): Promise<DeploymentEntity>;
    list(this: any, reqmatch?: DeploymentListMatch, ctrl?: Control): Promise<DeploymentEntity[]>;
    create(this: any, reqdata?: DeploymentCreateData, ctrl?: Control): Promise<DeploymentEntity>;
}
export { DeploymentEntity };
