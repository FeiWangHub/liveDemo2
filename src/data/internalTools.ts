export interface InternalTool {
  id: string;
  name: string;
  owner: string;
  link: string;
  wikiLink: string;
  description: string;
}

export const internalTools: InternalTool[] = [
  {
    id: 'ai-platform',
    name: 'AI Platform',
    owner: 'AI Infrastructure Team',
    link: 'https://ai-platform.internal.com',
    wikiLink: 'https://wiki.internal.com/ai-platform',
    description: 'The core platform for managing and deploying AI models internally.',
  },
  {
    id: 'rack-studio',
    name: 'Reck Studio',
    owner: 'Knowledge Management Team',
    link: 'https://rack-studio.internal.com',
    wikiLink: 'https://wiki.internal.com/rack-studio',
    description: 'A comprehensive studio for building and optimizing Retrieval-Augmented Generation workflows.',
  },
  {
    id: 'pomed-book',
    name: 'pomed book',
    owner: 'AI UX Team',
    link: 'https://pomed-book.internal.com',
    wikiLink: 'https://wiki.internal.com/pomed-book',
    description: 'A curated collection of effective prompts for various internal use cases.',
  },
  {
    id: 'mcp-hub',
    name: 'MCP Hub',
    owner: 'Developer Tools Team',
    link: 'https://mcp-hub.internal.com',
    wikiLink: 'https://wiki.internal.com/mcp-hub',
    description: 'Centralized hub for Model Context Protocol (MCP) servers and tools.',
  },
];
