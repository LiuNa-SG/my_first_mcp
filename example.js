// Example of how to use the MCP server
const axios = require('axios');

// This assumes the MCP server is running locally on the default port
const MCP_SERVER_URL = 'http://localhost:3000';

async function callGreetingTool() {
  try {
    const response = await axios.post(`${MCP_SERVER_URL}/tools/generate_greeting`, {
      name: 'User',
      language: 'en'
    });
    
    console.log('Response from MCP server:');
    console.log(response.data);
    
    // Try with a different language
    const responseZh = await axios.post(`${MCP_SERVER_URL}/tools/generate_greeting`, {
      name: '用户',
      language: 'zh'
    });
    
    console.log('\nResponse in Chinese:');
    console.log(responseZh.data);
  } catch (error) {
    console.error('Error calling MCP server:', error.message);
    if (error.response) {
      console.error('Server response:', error.response.data);
    }
  }
}

// Call the function
callGreetingTool();

// Example output:
// Response from MCP server:
// { greeting: 'Hello, User! Welcome to your first MCP server.', timestamp: '2025-04-27T08:07:30.000Z' }
//
// Response in Chinese:
// { greeting: '你好，用户！欢迎使用你的第一个MCP服务器。', timestamp: '2025-04-27T08:07:30.100Z' }
