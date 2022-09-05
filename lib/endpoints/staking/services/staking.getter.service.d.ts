import BigNumber from "bignumber.js";
import { AbiStakingService } from "./staking.abi.service";
import { CachingService } from "@elrondnetwork/erdnest";
import { StakeGoldProxyService } from "../../proxy/proxy.service";
import { StakeGoldElrondApiService } from "src/endpoints/elrond-communication/elrond-api.service";
export declare class StakingGetterService {
    private readonly abiService;
    private readonly cachingService;
    private readonly elrondApiService;
    private readonly proxyService;
    private readonly logger;
    constructor(abiService: AbiStakingService, cachingService: CachingService, elrondApiService: StakeGoldElrondApiService, proxyService: StakeGoldProxyService);
    private getData;
    calculateRewardsForGivenPosition(farmAddress: string, amount: string, attributes: string): Promise<BigNumber>;
    getFarmTokenSupply(farmAddress: string): Promise<string>;
    getAnnualPercentageRewards(farmAddress: string): Promise<string>;
    getCurrentEpoch(): Promise<number>;
    getPerBlockRewardAmount(farmAddress: string): Promise<string>;
    getShardCurrentBlockNonce(shardID: number): Promise<number>;
    getLastRewardBlockNonce(farmAddress: string): Promise<number>;
    getRewardsPerBlock(farmAddress: string): Promise<string>;
    getUndistributedFees(farmAddress: string): Promise<string>;
    getCurrentBlockFee(farmAddress: string): Promise<string>;
    getDivisionSafetyConstant(farmAddress: string): Promise<string>;
    getProduceRewardsEnabled(farmAddress: string): Promise<boolean>;
    getRewardPerShare(farmAddress: string): Promise<string>;
}
