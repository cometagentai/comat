import { queryBirdeye } from "./base";
import { WalletTokenList } from "./types/wallet-token-list";

export const getWalletTokenList = async (address: string): Promise<WalletTokenList> => {
    return await queryBirdeye<WalletTokenList>(
        'wallet/token_list',
        { address }
    );
} 