import {
  KNOWLEDGE_AGENT_NAME,
  MARKET_AGENT_NAME,
  STAKING_AGENT_NAME,
  WALLET_AGENT_NAME,
  TOKEN_ANALYSIS_AGENT_NAME,
  TRADING_AGENT_NAME,
  SOCIAL_AGENT_NAME,
  LIQUIDITY_AGENT_NAME,
} from '@/ai/agents/names';

import type { IconSaxName } from '@/types';
import type { ToolInvocation } from 'ai';

export const toolToAgent = {
  staking: STAKING_AGENT_NAME,
  wallet: WALLET_AGENT_NAME,
  market: MARKET_AGENT_NAME,
  knowledge: KNOWLEDGE_AGENT_NAME,
  trading: TRADING_AGENT_NAME,
  social: SOCIAL_AGENT_NAME,
  tokenanalysis: TOKEN_ANALYSIS_AGENT_NAME,
  liquidity: LIQUIDITY_AGENT_NAME,
};

export const getAgentName = (tool: ToolInvocation) => {
  const toolParts = tool.toolName.split('-');
  const agentName = toolParts[0];
  return toolToAgent[agentName as keyof typeof toolToAgent] || 'Unknown Agent';
};

export const getAgentIcon = (agentName: string): IconSaxName => {
  switch (agentName) {
    case STAKING_AGENT_NAME:
      return 'ArchiveBox';
    case WALLET_AGENT_NAME:
      return 'Archive';
    case MARKET_AGENT_NAME:
      return 'ArrangeHorizontal';
    case KNOWLEDGE_AGENT_NAME:
      return 'Activity';
    case TRADING_AGENT_NAME:
      return 'ArrangeVertical';
    case SOCIAL_AGENT_NAME:
      return 'Activity';
    case TOKEN_ANALYSIS_AGENT_NAME:
      return 'ArrowSwapHorizontal';
    case LIQUIDITY_AGENT_NAME:
      return 'Aave';
    default:
      return 'Activity';
  }
};
