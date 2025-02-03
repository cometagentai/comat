import React from 'react';

import AgentPage from '../_components';

import { bridgeAgent } from './_data';

const BridgeAgentPage: React.FC = () => {
  return <AgentPage agent={bridgeAgent} />;
};

export default BridgeAgentPage;
