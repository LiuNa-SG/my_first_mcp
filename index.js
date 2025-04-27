const { MCPServer, Tool } = require('@modelcontextprotocol/server');

// Create a new MCP server
const server = new MCPServer({
  name: 'my-first-mcp-server',
  description: 'A simple MCP server that provides basic tools',
  version: '1.0.0'
});

// Define a simple greeting tool
const greetingTool = new Tool({
  name: 'generate_greeting',
  description: 'Generates a personalized greeting message',
  inputSchema: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'The name of the person to greet'
      },
      language: {
        type: 'string',
        description: 'The language to use for the greeting (e.g., "en", "es", "fr")',
        default: 'en'
      }
    },
    required: ['name']
  },
  execute: async ({ name, language = 'en' }) => {
    const greetings = {
      en: `Hello, ${name}! Welcome to your first MCP server.`,
      es: `¡Hola, ${name}! Bienvenido a tu primer servidor MCP.`,
      fr: `Bonjour, ${name}! Bienvenue sur votre premier serveur MCP.`,
      de: `Hallo, ${name}! Willkommen bei deinem ersten MCP-Server.`,
      zh: `你好，${name}！欢迎使用你的第一个MCP服务器。`
    };

    return {
      greeting: greetings[language] || greetings.en,
      timestamp: new Date().toISOString()
    };
  }
});

// Register the tool with the server
server.registerTool(greetingTool);

// Start the server
server.start().then(() => {
  console.log(`MCP Server started on port ${server.port}`);
  console.log('Available tools:');
  server.tools.forEach(tool => {
    console.log(`- ${tool.name}: ${tool.description}`);
  });
}).catch(error => {
  console.error('Failed to start MCP server:', error);
});
