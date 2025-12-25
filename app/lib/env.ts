// 环境变量配置和验证
import dotenv from 'dotenv'

// 加载环境变量
dotenv.config()

// 验证必需的环境变量
export function validateEnv() {
  const missingVars: string[] = []
  
  if (!process.env.SECRET_ID) {
    missingVars.push('SECRET_ID')
  }
  
  if (!process.env.SECRET_KEY) {
    missingVars.push('SECRET_KEY')
  }
  
  if (missingVars.length > 0) {
    console.error(`❌ 缺少必需的环境变量: ${missingVars.join(', ')}`)
    console.error('请在Cloudflare Pages的环境变量设置中添加:')
    console.error('- SECRET_ID: 腾讯云API密钥ID')
    console.error('- SECRET_KEY: 腾讯云API密钥')
    console.error('- SITE_NAME (可选): 站点名称')
    console.error('- SITE_ICON (可选): 站点图标URL')
    
    // 在开发环境中抛出错误，在生产环境中使用默认值
    if (process.env.NODE_ENV === 'development') {
      throw new Error(`缺少必需的环境变量: ${missingVars.join(', ')}`)
    }
  } else {
    console.log('✅ 环境变量验证通过')
  }
}

// 获取环境变量，提供默认值
export function getEnvVar(key: string, defaultValue?: string): string {
  const value = process.env[key]
  
  if (value === undefined || value === '') {
    if (defaultValue !== undefined) {
      return defaultValue
    }
    
    // 在开发环境中警告缺失的环境变量
    if (process.env.NODE_ENV === 'development') {
      console.warn(`⚠️  环境变量 ${key} 未设置`)
    }
    
    return ''
  }
  
  return value
}

// 获取站点配置
export function getSiteConfig() {
  return {
    siteName: getEnvVar('SITE_NAME', 'AcoFork 的 EdgeOne 监控大屏'),
    siteIcon: getEnvVar('SITE_ICON', 'https://q2.qlogo.cn/headimg_dl?dst_uin=2726730791&spec=0')
  }
}

// 获取API密钥
export function getApiKeys() {
  return {
    secretId: getEnvVar('SECRET_ID'),
    secretKey: getEnvVar('SECRET_KEY')
  }
}

// 检查是否是Cloudflare Pages环境
export function isCloudflarePages(): boolean {
  return process.env.CF_PAGES === '1' || 
         process.env.CLOUDFLARE_PAGES === 'true' ||
         process.env.NEXT_PUBLIC_CF_PAGES === '1'
}

// 初始化环境变量
export function initEnv() {
  console.log('🌍 初始化环境变量...')
  console.log(`环境: ${process.env.NODE_ENV || 'development'}`)
  console.log(`Cloudflare Pages: ${isCloudflarePages() ? '是' : '否'}`)
  
  validateEnv()
  
  return {
    isCloudflarePages: isCloudflarePages(),
    siteConfig: getSiteConfig(),
    apiKeys: getApiKeys()
  }
}