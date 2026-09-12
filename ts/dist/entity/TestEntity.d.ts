import { GameDevelopmentEntityBase } from '../GameDevelopmentEntityBase';
import type { GameDevelopmentSDK } from '../GameDevelopmentSDK';
import type { Control } from '../types';
import type { Test, TestLoadMatch, TestListMatch, TestCreateData } from '../GameDevelopmentTypes';
declare class TestEntity extends GameDevelopmentEntityBase<Test> {
    constructor(client: GameDevelopmentSDK, entopts: any);
    make(this: TestEntity): TestEntity;
    load(this: any, reqmatch?: TestLoadMatch, ctrl?: Control): Promise<TestEntity>;
    list(this: any, reqmatch?: TestListMatch, ctrl?: Control): Promise<TestEntity[]>;
    create(this: any, reqdata?: TestCreateData, ctrl?: Control): Promise<TestEntity>;
}
export { TestEntity };
