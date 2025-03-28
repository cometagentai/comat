import { CONFIG } from '../../sdklegacy';
import { ChainsConfig } from '../types';

const { chains } = CONFIG.TESTNET;

export const TESTNET_CHAINS: ChainsConfig = {
  Bsc: {
    ...chains.Bsc!,
    displayName: 'BSC',
    explorerUrl: 'https://testnet.bscscan.com/',
    explorerName: 'BscScan',
    gasToken: 'BNB',
    chainId: 97,
    icon: 'Bsc',
    maxBlockSearch: 2000,
    symbol: 'BSC',
    sdkName: 'Bsc',
    wrappedGasToken: '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd',
  },
  Avalanche: {
    ...chains.Avalanche!,
    displayName: 'Fuji',
    explorerUrl: 'https://testnet.avascan.info/blockchain/c/',
    explorerName: 'Avascan',
    gasToken: 'AVAX',
    chainId: 43113,
    icon: 'Avalanche',
    maxBlockSearch: 2000,
    symbol: 'AVAX',
    sdkName: 'Avalanche',
    wrappedGasToken: '0xd00ae08403B9bbb9124bB305C09058E32C39A48c',
  },
  Fantom: {
    ...chains.Fantom!,
    displayName: 'Fantom',
    explorerUrl: 'https://testnet.ftmscan.com/',
    explorerName: 'FtmScan',
    gasToken: 'FTM',
    chainId: 4002,
    icon: 'Fantom',
    maxBlockSearch: 2000,
    symbol: 'FTM',
    sdkName: 'Fantom',
    wrappedGasToken: '0xf1277d1Ed8AD466beddF92ef448A132661956621',
  },
  Celo: {
    ...chains.Celo!,
    displayName: 'Alfajores',
    explorerUrl: 'https://explorer.celo.org/alfajores/',
    explorerName: 'Celo Explorer',
    gasToken: 'CELO',
    chainId: 44787,
    icon: 'Celo',
    maxBlockSearch: 2000,
    symbol: 'CELO',
    sdkName: 'Celo',
  },
  Moonbeam: {
    ...chains.Moonbeam!,
    displayName: 'Moonbase',
    explorerUrl: 'https://moonbase.moonscan.io/',
    explorerName: 'Moonscan',
    gasToken: 'GLMR',
    chainId: 1287,
    icon: 'Moonbeam',
    maxBlockSearch: 2000,
    symbol: 'GLMR',
    sdkName: 'Moonbeam',
    wrappedGasToken: '0xD909178CC99d318e4D46e7E66a972955859670E1',
  },
  Solana: {
    ...chains.Solana!,
    displayName: 'Solana',
    explorerUrl: 'https://explorer.solana.com/',
    explorerName: 'Solana Explorer',
    gasToken: 'SOL',
    chainId: 0,
    icon: 'Solana',
    maxBlockSearch: 2000,
    symbol: 'SOL',
    sdkName: 'Solana',
    wrappedGasToken: 'So11111111111111111111111111111111111111112',
  },
  Sui: {
    ...chains.Sui!,
    displayName: 'Sui',
    explorerUrl: 'https://suiscan.xyz/testnet/',
    explorerName: 'Suiscan',
    gasToken: 'SUI',
    chainId: 0,
    icon: 'Sui',
    maxBlockSearch: 0,
    symbol: 'SUI',
    sdkName: 'Sui',
  },
  Aptos: {
    ...chains.Aptos!,
    displayName: 'Aptos',
    explorerUrl: 'https://explorer.aptoslabs.com/',
    explorerName: 'Aptos Explorer',
    gasToken: 'APT',
    chainId: 0,
    icon: 'Aptos',
    maxBlockSearch: 0,
    symbol: 'APT',
    sdkName: 'Aptos',
  },
  Klaytn: {
    ...chains.Klaytn!,
    displayName: 'Kaia',
    explorerUrl: 'https://kairos.kaiascope.com/',
    explorerName: 'Kaia Scope',
    gasToken: 'KLAY',
    chainId: 1001,
    icon: 'Klaytn',
    maxBlockSearch: 2000,
    symbol: 'KLAY',
    sdkName: 'Klaytn',
    wrappedGasToken: '0x0339d5Eb6D195Ba90B13ed1BCeAa97EbD198b106',
  },
  Sepolia: {
    ...chains.Sepolia!,
    displayName: 'Sepolia',
    explorerUrl: 'https://sepolia.etherscan.io/',
    explorerName: 'Etherscan',
    gasToken: 'ETHsepolia',
    chainId: 11155111,
    icon: 'Ethereum',
    maxBlockSearch: 2000,
    symbol: 'ETH',
    sdkName: 'Sepolia',
    wrappedGasToken: '0xeef12A83EE5b7161D3873317c8E0E7B76e0B5D9c',
  },
  ArbitrumSepolia: {
    ...chains.ArbitrumSepolia!,
    displayName: 'Arbitrum Sepolia',
    explorerUrl: 'https://sepolia.arbiscan.io/',
    explorerName: 'Etherscan',
    gasToken: 'ETHarbitrum_sepolia',
    chainId: 421614,
    icon: 'Arbitrum',
    maxBlockSearch: 2000,
    symbol: 'ARB',
    sdkName: 'ArbitrumSepolia',
    wrappedGasToken: '0x980B62Da83eFf3D4576C647993b0c1D7faf17c73',
  },
  BaseSepolia: {
    ...chains.BaseSepolia!,
    displayName: 'Base Sepolia',
    explorerUrl: 'https://base-sepolia.blockscout.com/',
    explorerName: 'Etherscan',
    gasToken: 'ETHbase_sepolia',
    chainId: 84532,
    icon: 'Base',
    maxBlockSearch: 2000,
    symbol: 'BASE',
    sdkName: 'BaseSepolia',
    wrappedGasToken: '0x4200000000000000000000000000000000000006',
  },
  OptimismSepolia: {
    ...chains.OptimismSepolia!,
    displayName: 'Optimism Sepolia',
    explorerUrl: 'https://sepolia-optimistic.etherscan.io/',
    explorerName: 'Etherscan',
    gasToken: 'ETHoptimism_sepolia',
    chainId: 11155420,
    icon: 'Optimism',
    maxBlockSearch: 2000,
    symbol: 'OP',
    sdkName: 'OptimismSepolia',
    wrappedGasToken: '0x4200000000000000000000000000000000000006',
  },
  Scroll: {
    ...chains.Scroll!,
    displayName: 'Scroll',
    explorerUrl: 'https://sepolia.scrollscan.dev/',
    explorerName: 'Scrollscan',
    gasToken: 'ETHscroll',
    chainId: 534351,
    icon: 'Scroll',
    maxBlockSearch: 2000,
    symbol: 'SCR',
    sdkName: 'Scroll',
    wrappedGasToken: '0x5300000000000000000000000000000000000004',
  },
  Blast: {
    ...chains.Blast!,
    displayName: 'Blast',
    explorerUrl: 'https://testnet.blastscan.io/',
    explorerName: 'Blastscan',
    gasToken: 'ETHblast',
    chainId: 168587773,
    icon: 'Blast',
    maxBlockSearch: 2000,
    symbol: 'BLAST',
    sdkName: 'Blast',
    wrappedGasToken: '0x9D020B1697035d9d54f115194c9e04a1e4Eb9aF7',
  },
  Xlayer: {
    ...chains.Xlayer!,
    displayName: 'X Layer',
    explorerUrl: 'https://www.okx.com/web3/explorer/xlayer-test/',
    explorerName: 'OKX Explorer',
    gasToken: 'OKB',
    chainId: 195,
    icon: 'Xlayer',
    maxBlockSearch: 2000,
    symbol: 'OKX',
    sdkName: 'Xlayer',
    wrappedGasToken: '0xa2aFfd8301BfB3c5b815829f2F509f053556D21B',
  },
  Mantle: {
    ...chains.Mantle!,
    displayName: 'Mantle',
    explorerUrl: 'https://explorer.testnet.mantle.xyz/',
    explorerName: 'Mantle Explorer',
    gasToken: 'MNT',
    chainId: 5003,
    icon: 'Mantle',
    maxBlockSearch: 2000,
    symbol: 'MNT',
    sdkName: 'Mantle',
    wrappedGasToken: '0xa4c4cb2A072eE99f77212Fa18c2B7Ca26DA23905',
  },
  Worldchain: {
    ...chains.Worldchain!,
    displayName: 'World Chain',
    explorerUrl: 'https://worldchain-sepolia.explorer.alchemy.com/',
    explorerName: 'World Scan',
    gasToken: 'ETHworldchain',
    chainId: 4801,
    icon: 'Worldchain',
    maxBlockSearch: 2000,
    sdkName: 'Worldchain',
    symbol: 'WORLD',
  },
};
