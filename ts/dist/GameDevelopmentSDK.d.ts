import { AnalyticsEntity } from './entity/AnalyticsEntity';
import { AssetEntity } from './entity/AssetEntity';
import { BuildEntity } from './entity/BuildEntity';
import { CollaborationEntity } from './entity/CollaborationEntity';
import { CollaboratorEntity } from './entity/CollaboratorEntity';
import { DeploymentEntity } from './entity/DeploymentEntity';
import { ProjectEntity } from './entity/ProjectEntity';
import { TestEntity } from './entity/TestEntity';
export type * from './GameDevelopmentTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { GameDevelopmentEntityBase } from './GameDevelopmentEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class GameDevelopmentSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Analytics(entopts?: Record<string, any>): AnalyticsEntity;
    Asset(entopts?: Record<string, any>): AssetEntity;
    Build(entopts?: Record<string, any>): BuildEntity;
    Collaboration(entopts?: Record<string, any>): CollaborationEntity;
    Collaborator(entopts?: Record<string, any>): CollaboratorEntity;
    Deployment(entopts?: Record<string, any>): DeploymentEntity;
    Project(entopts?: Record<string, any>): ProjectEntity;
    Test(entopts?: Record<string, any>): TestEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): GameDevelopmentSDK;
    tester(testopts?: any, sdkopts?: any): GameDevelopmentSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof GameDevelopmentSDK;
export { stdutil, config, BaseFeature, GameDevelopmentEntityBase, GameDevelopmentSDK, SDK, };
