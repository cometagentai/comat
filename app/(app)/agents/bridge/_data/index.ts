import { bridgeAgentInfo } from './info';
import { bridgeAgentGraph } from './graph';
import { bridgeAgentSampleQueries } from './sample-queries';

import { Agent } from '../../_types/agent';

export const bridgeAgent: Agent = {
  info: bridgeAgentInfo,
  graph: bridgeAgentGraph,
  sampleQueries: bridgeAgentSampleQueries,
};
