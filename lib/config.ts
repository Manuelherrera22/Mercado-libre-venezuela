// Configuration for different environments
export const config = {
  // API Configuration
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
    timeout: 10000,
  },
  
  // Environment detection
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
  
  // Feature flags
  features: {
    mockAuth: process.env.NEXT_PUBLIC_MOCK_AUTH === 'true' || process.env.NODE_ENV === 'development',
    enableAnalytics: process.env.NEXT_PUBLIC_ANALYTICS === 'true',
    enableDebug: process.env.NODE_ENV === 'development',
  },
  
  // Demo accounts (only for development)
  demo: {
    enabled: process.env.NODE_ENV === 'development',
    accounts: {
      user: {
        email: 'usuario@demo.com',
        password: 'demo123',
        role: 'user'
      },
      seller: {
        email: 'vendedor@demo.com', 
        password: 'demo123',
        role: 'seller'
      },
      admin: {
        email: 'admin@demo.com',
        password: 'demo123', 
        role: 'admin'
      }
    }
  }
}

// Helper functions
export const isMockAuthEnabled = () => config.features.mockAuth
export const getApiUrl = () => config.api.baseUrl
export const isDevelopment = () => config.isDevelopment
