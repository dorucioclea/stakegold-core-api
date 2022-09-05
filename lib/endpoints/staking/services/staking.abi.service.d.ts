import { Interaction, TypedOutcomeBundle } from "@elrondnetwork/erdjs/out";
import BigNumber from "bignumber.js";
import { StakeGoldElrondProxyService } from "../../elrond-communication/elrond-proxy.service";
import { SmartContractProfiler } from "../../utils/smartcontract.profiler";
export declare class AbiStakingService {
    private readonly elrondProxy;
    private readonly logger;
    private readonly resultParser;
    constructor(elrondProxy: StakeGoldElrondProxyService);
    getGenericData(contract: SmartContractProfiler, interaction: Interaction): Promise<TypedOutcomeBundle>;
    calculateRewardsForGivenPosition(farmAddress: string, amount: string, attributes: string): Promise<BigNumber>;
    getFarmTokenSupply(farmAddress: string): Promise<string>;
    getAnnualPercentageRewards(farmAddress: string): Promise<string>;
    getPerBlockRewardAmount(farmAddress: string): Promise<string>;
    getLastRewardBlockNonce(farmAddress: string): Promise<string>;
    getUndistributedFees(farmAddress: string): Promise<string>;
    getCurrentBlockFee(farmAddress: string): Promise<string>;
    getRewardsPerBlock(farmAddress: string): Promise<string>;
    getDivisionSafetyConstant(farmAddress: string): Promise<string>;
    getProduceRewardsEnabled(farmAddress: string): Promise<boolean>;
    getRewardPerShare(farmAddress: string): Promise<string>;
}
