import { Inject, Injectable, Logger } from '@nestjs/common';
import BigNumber from 'bignumber.js';
import { CacheInfo } from '../../../models/caching/cache.info';
import { STAKEGOLD_ELROND_API_SERVICE, STAKEGOLD_PROXY_SERVICE } from '../../utils/constants';
import { AbiStakingService } from './staking.abi.service';
import { CachingService, Constants } from '@elrondnetwork/erdnest';
import { generateGetLogMessage } from '../../utils/generate-log-message';
import { StakeGoldProxyService } from '../../proxy/proxy.service';
import { StakeGoldElrondApiService } from 'src/endpoints/elrond-communication/elrond-api.service';
import { Address } from '@elrondnetwork/erdjs/out';
import { EsdtToken, NftCollection } from 'src/models';

@Injectable()
export class StakingGetterService {
  private readonly logger: Logger;

  constructor(
    private readonly abiService: AbiStakingService,
    private readonly cachingService: CachingService,
    @Inject(STAKEGOLD_ELROND_API_SERVICE)
    private readonly elrondApiService: StakeGoldElrondApiService,
    @Inject(STAKEGOLD_PROXY_SERVICE)
    private readonly proxyService: StakeGoldProxyService,
  ) {
    this.logger = new Logger(StakingGetterService.name);
  }

  private async getData(
    cacheKey: string,
    createValueFunc: () => any,
    ttl: number = Constants.oneHour(),
  ): Promise<any> {
    try {
      return await this.cachingService.getOrSetCache(cacheKey, createValueFunc, ttl);
    } catch (error) {
      const logMessage = generateGetLogMessage(
        StakingGetterService.name,
        createValueFunc.name,
        cacheKey,
        error,
      );
      this.logger.error(logMessage);
      throw error;
    }
  }

  async calculateRewardsForGivenPosition(
    farmAddress: string,
    amount: string,
    attributes: string,
  ): Promise<BigNumber> {
    return await this.abiService.calculateRewardsForGivenPosition(farmAddress, amount, attributes);
  }

  async getFarmTokenSupply(farmAddress: string): Promise<string> {
    return await this.getData(
      CacheInfo.FarmTokenSupply(farmAddress).key,
      () => this.abiService.getFarmTokenSupply(farmAddress),
      CacheInfo.FarmTokenSupply(farmAddress).ttl,
    );
  }

  async getAnnualPercentageRewards(farmAddress: string): Promise<string> {
    return await this.getData(
      CacheInfo.AnnualPercentageRewards(farmAddress).key,
      () => this.abiService.getAnnualPercentageRewards(farmAddress),
      CacheInfo.AnnualPercentageRewards(farmAddress).ttl,
    );
  }

  async getCurrentEpoch(): Promise<number> {
    return await this.getData(
      CacheInfo.CurrentEpoch.key,
      async () => (await this.proxyService.getStats()).epoch,
      CacheInfo.CurrentEpoch.ttl,
    );
  }

  async getPerBlockRewardAmount(farmAddress: string): Promise<string> {
    return await this.getData(
      CacheInfo.PerBlockRewardAmount(farmAddress).key,
      () => this.abiService.getPerBlockRewardAmount(farmAddress),
      CacheInfo.PerBlockRewardAmount(farmAddress).ttl,
    );
  }

  async getShardCurrentBlockNonce(shardID: number): Promise<number> {
    return await this.getData(
      CacheInfo.ShardCurrentBlockNonce(shardID.toString()).key,
      () => this.elrondApiService.getCurrentBlockNonce(shardID),
      CacheInfo.ShardCurrentBlockNonce(shardID.toString()).ttl,
    );
  }

  async getLastRewardBlockNonce(farmAddress: string): Promise<number> {
    return await this.getData(
      CacheInfo.getLastRewardBlockNonce(farmAddress).key,
      () => this.abiService.getLastRewardBlockNonce(farmAddress),
      CacheInfo.getLastRewardBlockNonce(farmAddress).ttl,
    );
  }

  async getRewardsPerBlock(farmAddress: string): Promise<string> {
    return await this.getData(
      CacheInfo.getRewardsPerBlock(farmAddress).key,
      () => this.abiService.getRewardsPerBlock(farmAddress),
      CacheInfo.getRewardsPerBlock(farmAddress).ttl,
    );
  }

  async getUndistributedFees(farmAddress: string): Promise<string> {
    return await this.getData(
      CacheInfo.getUndistributedFees(farmAddress).key,
      () => this.abiService.getUndistributedFees(farmAddress),
      CacheInfo.getUndistributedFees(farmAddress).ttl,
    );
  }

  async getCurrentBlockFee(farmAddress: string): Promise<string> {
    return await this.getData(
      CacheInfo.getCurrentBlockFee(farmAddress).key,
      () => this.abiService.getCurrentBlockFee(farmAddress),
      CacheInfo.getCurrentBlockFee(farmAddress).ttl,
    );
  }

  async getDivisionSafetyConstant(farmAddress: string): Promise<string> {
    return await this.getData(
      CacheInfo.getDivisionSafetyConstant(farmAddress).key,
      () => this.abiService.getDivisionSafetyConstant(farmAddress),
      CacheInfo.getDivisionSafetyConstant(farmAddress).ttl,
    );
  }

  async getProduceRewardsEnabled(farmAddress: string): Promise<boolean> {
    return await this.getData(
      CacheInfo.getProduceRewardsEnabled(farmAddress).key,
      () => this.abiService.getProduceRewardsEnabled(farmAddress),
      CacheInfo.getProduceRewardsEnabled(farmAddress).ttl,
    );
  }

  async getRewardPerShare(farmAddress: string): Promise<string> {
    return await this.getData(
      CacheInfo.getRewardPerShare(farmAddress).key,
      () => this.abiService.getRewardPerShare(farmAddress),
      CacheInfo.getRewardPerShare(farmAddress).ttl,
    );
  }

  async getGroupIdentifiers(): Promise<string[]> {
    return await this.getData(
      CacheInfo.getGroupIdentifiers().key,
      () => this.abiService.getGroupIdentifiers(),
      CacheInfo.getGroupIdentifiers().ttl,
    );
  }

  async getAddressesByGroupId(groupId: string): Promise<Address[]> {
    return await this.getData(
      CacheInfo.getAddressesByGroupId(groupId).key,
      () => this.abiService.getAddressesByGroupId(groupId),
      CacheInfo.getAddressesByGroupId(groupId).ttl,
    );
  }

  async getFarmTokenId(childContractAddress: string): Promise<string> {
    return await this.getData(
      CacheInfo.getFarmTokenId(childContractAddress).key,
      () => this.abiService.getFarmTokenId(childContractAddress),
      CacheInfo.getFarmTokenId(childContractAddress).ttl,
    );
  }

  async getFarmingTokenId(childContractAddress: string): Promise<string> {
    return await this.getData(
      CacheInfo.getFarmingTokenId(childContractAddress).key,
      () => this.abiService.getFarmingTokenId(childContractAddress),
      CacheInfo.getFarmingTokenId(childContractAddress).ttl,
    );
  }

  async getRewardTokenId(childContractAddress: string): Promise<string> {
    return await this.getData(
      CacheInfo.getRewardTokenId(childContractAddress).key,
      () => this.abiService.getRewardTokenId(childContractAddress),
      CacheInfo.getRewardTokenId(childContractAddress).ttl,
    );
  }

  async areRewardsLocked(childContractAddress: string): Promise<boolean> {
    return await this.getData(
      CacheInfo.areRewardsLocked(childContractAddress).key,
      () => this.abiService.areRewardsLocked(childContractAddress),
      CacheInfo.areRewardsLocked(childContractAddress).ttl,
    );
  }

  async getVestingAddressByGroupIdentifier(groupId: string): Promise<string> {
    return await this.getData(
      CacheInfo.vestingAddressByGroupId(groupId).key,
      () => this.abiService.getVestingAddressByGroupIdentifier(groupId),
      CacheInfo.vestingAddressByGroupId(groupId).ttl,
    );
  }

  async getToken(identifier: string): Promise<EsdtToken | NftCollection | undefined> {
    try {
      return await this.getData(
        CacheInfo.stakeToken(identifier).key,
        async () => {
          if (!identifier || identifier.length === 0) {
            return undefined;
          }

          const esdtToken = await this.elrondApiService.getEsdtToken(identifier);
          if (esdtToken) {
            return esdtToken;
          }

          const nftCollection = await this.elrondApiService.getNftCollection(identifier);
          return nftCollection;
        },
        CacheInfo.stakeToken(identifier).ttl,
      );
    } catch {
      return undefined;
    }
  }

  async getLockedAssetTokenId(groupId: string): Promise<string> {
    const vestingAddress = await this.getVestingAddressByGroupIdentifier(groupId);
    return await this.abiService.getLockedAssetTokenId(vestingAddress);
  }
}
