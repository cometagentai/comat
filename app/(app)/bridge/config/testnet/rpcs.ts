import { populateRpcField } from '../utils';
const {
  REACT_APP_SEPOLIA_RPC,
  REACT_APP_BSC_TESTNET_RPC,
  REACT_APP_FUJI_RPC,
  REACT_APP_FANTOM_TESTNET_RPC,
  REACT_APP_ALFAJORES_RPC,
  REACT_APP_SOLANA_DEVNET_RPC,
  REACT_APP_MOONBASE_RPC,
  REACT_APP_SUI_TESTNET_RPC,
  REACT_APP_APTOS_TESTNET_RPC,
  REACT_APP_SEI_TESTNET_RPC,
  REACT_APP_BASE_SEPOLIA_RPC,
  REACT_APP_OSMOSIS_TESTNET_RPC,
  REACT_APP_INJECTIVE_TESTNET_RPC,
  REACT_APP_WORMCHAIN_TESTNET_RPC,
  REACT_APP_EVMOS_TESTNET_RPC,
  REACT_APP_COSMOSHUB_TESTNET_RPC,
  REACT_APP_KUJIRA_TESTNET_RPC,
  REACT_APP_KLAYTN_TESTNET_RPC,
  REACT_APP_SEI_REST,
  REACT_APP_EVMOS_REST,
  REACT_APP_ARBITRUM_SEPOLIA_RPC,
  REACT_APP_OPTIMISM_SEPOLIA_RPC,
  REACT_APP_APTOS_TESTNET_GRAPHQL,
  REACT_APP_SCROLL_TESTNET_RPC,
  REACT_APP_BLAST_TESTNET_RPC,
  REACT_APP_XLAYER_TESTNET_RPC,
  REACT_APP_MANTLE_TESTNET_RPC,
  REACT_APP_WORLDCHAIN_TESTNET_RPC,
} = process.env;

export const TESTNET_RPC_MAPPING = {
  ...populateRpcField('Sepolia', REACT_APP_SEPOLIA_RPC),
  ...populateRpcField('Bsc', REACT_APP_BSC_TESTNET_RPC),
  ...populateRpcField('Avalanche', REACT_APP_FUJI_RPC),
  ...populateRpcField('Fantom', REACT_APP_FANTOM_TESTNET_RPC),
  ...populateRpcField('Celo', REACT_APP_ALFAJORES_RPC),
  ...populateRpcField('Solana', REACT_APP_SOLANA_DEVNET_RPC),
  ...populateRpcField('Moonbeam', REACT_APP_MOONBASE_RPC),
  ...populateRpcField('Sui', REACT_APP_SUI_TESTNET_RPC),
  ...populateRpcField('Aptos', REACT_APP_APTOS_TESTNET_RPC),
  ...populateRpcField('Sei', REACT_APP_SEI_TESTNET_RPC),
  ...populateRpcField('BaseSepolia', REACT_APP_BASE_SEPOLIA_RPC),
  ...populateRpcField('Osmosis', REACT_APP_OSMOSIS_TESTNET_RPC),
  ...populateRpcField('Wormchain', REACT_APP_WORMCHAIN_TESTNET_RPC),
  ...populateRpcField('ArbitrumSepolia', REACT_APP_ARBITRUM_SEPOLIA_RPC),
  ...populateRpcField('OptimismSepolia', REACT_APP_OPTIMISM_SEPOLIA_RPC),
  ...populateRpcField('Cosmoshub', REACT_APP_COSMOSHUB_TESTNET_RPC),
  ...populateRpcField('Evmos', REACT_APP_EVMOS_TESTNET_RPC),
  ...populateRpcField('Kujira', REACT_APP_KUJIRA_TESTNET_RPC),
  ...populateRpcField('Injective', REACT_APP_INJECTIVE_TESTNET_RPC),
  ...populateRpcField('Klaytn', REACT_APP_KLAYTN_TESTNET_RPC),
  ...populateRpcField('Scroll', REACT_APP_SCROLL_TESTNET_RPC),
  ...populateRpcField('Blast', REACT_APP_BLAST_TESTNET_RPC),
  ...populateRpcField('Xlayer', REACT_APP_XLAYER_TESTNET_RPC),
  ...populateRpcField('Mantle', REACT_APP_MANTLE_TESTNET_RPC),
  ...populateRpcField('Worldchain', REACT_APP_WORLDCHAIN_TESTNET_RPC),
};

export const TESTNET_REST_MAPPING = {
  ...populateRpcField('Sei', REACT_APP_SEI_REST),
  ...populateRpcField('Evmos', REACT_APP_EVMOS_REST),
};

export const TESTNET_GRAPHQL_MAPPING = {
  ...populateRpcField('Aptos', REACT_APP_APTOS_TESTNET_GRAPHQL),
};
