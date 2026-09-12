import { GameDevelopmentEntityBase } from '../GameDevelopmentEntityBase';
import type { GameDevelopmentSDK } from '../GameDevelopmentSDK';
import type { Control } from '../types';
import type { Asset, AssetLoadMatch, AssetListMatch, AssetCreateData, AssetRemoveMatch } from '../GameDevelopmentTypes';
declare class AssetEntity extends GameDevelopmentEntityBase<Asset> {
    constructor(client: GameDevelopmentSDK, entopts: any);
    make(this: AssetEntity): AssetEntity;
    load(this: any, reqmatch?: AssetLoadMatch, ctrl?: Control): Promise<AssetEntity>;
    list(this: any, reqmatch?: AssetListMatch, ctrl?: Control): Promise<AssetEntity[]>;
    create(this: any, reqdata?: AssetCreateData, ctrl?: Control): Promise<AssetEntity>;
    remove(this: any, reqmatch?: AssetRemoveMatch, ctrl?: Control): Promise<AssetEntity>;
}
export { AssetEntity };
