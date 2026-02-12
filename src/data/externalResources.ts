export interface ChartItem {
  rank: number;
  name: string;
  description: string;
  link?: string;
}

export interface TopChart {
  title: string;
  items: ChartItem[];
  source?: string;
}

export const externalResources = {
  models: {
    title: 'Top AI Models',
    source: 'SWE-bench Verified',
    items: [
      { rank: 1, name: 'Claude 3.5 Sonnet', description: 'Industry leader in coding and reasoning tasks.' },
      { rank: 2, name: 'GPT-4o', description: 'OpenAI\'s flagship multimodal model with high speed and intelligence.' },
      { rank: 3, name: 'Claude 3 Opus', description: 'Highly capable model for complex analysis and creative tasks.' },
      { rank: 4, name: 'DeepSeek V3', description: 'Powerful open-weights model with exceptional coding performance.' },
      { rank: 5, name: 'Gemini 1.5 Pro', description: 'Google\'s model featuring a massive 2M token context window.' },
      { rank: 6, name: 'Llama 3.1 405B', description: 'Meta\'s largest open-source model competing with top proprietary models.' },
      { rank: 7, name: 'DeepSeek Coder V2', description: 'Specialized coding model with state-of-the-art results.' },
      { rank: 8, name: 'GPT-4 Turbo', description: 'High-performance predecessor to 4o, still widely used.' },
      { rank: 9, name: 'Qwen 2.5 72B', description: 'Alibaba\'s top-tier open-source model with strong reasoning.' },
      { rank: 10, name: 'Mistral Large 2', description: 'Mistral\'s most capable model designed for complex tasks.' },
    ],
  },
  ides: {
    title: 'Popular AI IDEs',
    items: [
      { rank: 1, name: 'Cursor', description: 'The current gold standard for AI-integrated code editing.', link: 'https://cursor.com' },
      { rank: 2, name: 'Windsurf', description: 'New agentic IDE with deep context understanding.', link: 'https://codeium.com/windsurf' },
      { rank: 3, name: 'Trae', description: 'ByteDance\'s adaptive AI IDE built for seamless development.', link: 'https://trae.ai' },
      { rank: 4, name: 'VS Code + Copilot', description: 'The most popular editor with powerful official AI extensions.', link: 'https://github.com/features/copilot' },
      { rank: 5, name: 'Zed', description: 'Ultra-fast code editor with built-in AI capabilities.', link: 'https://zed.dev' },
      { rank: 6, name: 'PearAI', description: 'Open-source AI code editor designed for privacy and speed.', link: 'https://trypear.ai' },
    ],
  },
  providers: {
    title: 'Model Providers',
    items: [
      { rank: 1, name: 'OpenRouter', description: 'Unified API to access almost every available LLM.', link: 'https://openrouter.ai' },
      { rank: 2, name: 'Together AI', description: 'Fastest inference for open-source models.', link: 'https://together.ai' },
      { rank: 3, name: 'Hugging Face', description: 'The home of open-source AI and model sharing.', link: 'https://huggingface.co' },
      { rank: 4, name: 'Groq', description: 'Ultra-fast inference using specialized LPU hardware.', link: 'https://groq.com' },
      { rank: 5, name: 'AWS Bedrock', description: 'Enterprise-grade access to foundation models.', link: 'https://aws.amazon.com/bedrock' },
      { rank: 6, name: 'Azure AI', description: 'Microsoft\'s cloud platform for AI development.', link: 'https://azure.microsoft.com/en-us/solutions/ai' },
    ],
  },
  cli: {
    title: 'AI CLI Tools',
    items: [
      { rank: 1, name: 'Claude Code', description: 'Anthropic\'s official agentic CLI tool for coding.', link: 'https://claude.ai' },
      { rank: 2, name: 'Open Interpreter', description: 'Natural language interface for your computer\'s terminal.', link: 'https://openinterpreter.com' },
      { rank: 3, name: 'Aider', description: 'Popular CLI tool for pair programming with AI.', link: 'https://aider.chat' },
      { rank: 4, name: 'Mentat', description: 'AI coding assistant that coordinates changes across multiple files.', link: 'https://mentat.ai' },
      { rank: 5, name: 'Gpt-engineer', description: 'Specify what you want to build and let AI generate the code.', link: 'https://gptengineer.app' },
    ],
  },
};
