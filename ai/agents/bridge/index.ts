import { BRIDGE_AGENT_CAPABILITIES } from './capabilities';
import { BRIDGE_AGENT_DESCRIPTION } from './description';
import { BRIDGE_AGENT_NAME } from './name';
import { BRIDGE_TOOLS } from './tools';

import type { Agent } from '@/ai/agent';

export const bridgeAgent: Agent = {
  name: BRIDGE_AGENT_NAME,
  slug: 'bridge',
  tools: BRIDGE_TOOLS,
  systemPrompt: BRIDGE_AGENT_DESCRIPTION,
  capabilities: BRIDGE_AGENT_CAPABILITIES,
};
