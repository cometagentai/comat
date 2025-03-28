import { Edge, Node } from '@xyflow/react';

import { IconSaxName } from '@/types';

export type AgentInfo = {
  name: string;
  icon: IconSaxName;
  objective: string;
};

export type AgentGraph = {
  nodes: Node[];
  edges: Edge[];
};

export type Agent = {
  info: AgentInfo;
  graph: AgentGraph;
  sampleQueries: string[];
};
