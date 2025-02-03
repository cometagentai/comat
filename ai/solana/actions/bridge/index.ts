import { SOLANA_BRIDGE_NAME } from './name';
import { SOLANA_BRIDGE_PROMPT } from './prompt';
import { BridgeInputSchema } from './input-schema';

import type {
  SolanaBridgeResultBodyType,
  SolanaBridgeSchemaType,
} from './types';
import type { SolanaAction } from '../solana-action';

export class SolanaBridgeAction
  implements SolanaAction<SolanaBridgeSchemaType, SolanaBridgeResultBodyType>
{
  public name = SOLANA_BRIDGE_NAME;
  public description = SOLANA_BRIDGE_PROMPT;
  public argsSchema = BridgeInputSchema;
}
