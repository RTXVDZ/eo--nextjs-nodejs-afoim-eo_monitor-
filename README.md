# EdgeOne Monitoring Dashboard (EdgeOne 监控大屏的Next.js版本)

> [!NOTE]
> 提示：本项目已全面支持腾讯云 EdgeOne 全球版（中国站与国际站账号均可直接使用）。

>[!NOTE]
>本版本来自于二叉树树的Node.js版本，此版本的诞生离不开他！。我这个项目的初衷是想让更多的CI/CD部署器部署上这个项目！
### 效果图
---
>[!TIP]
>
>这是一个基于 Next.js 和 Tencent Cloud EdgeOne API 构建的实时监控大屏，旨在提供直观的流量和请求分析。

## ✨ 主要功能

- **实时概览**：展示站点总请求数、总流量、总带宽等关键指标。
- **多维度分析**：
  - **国家/地区排行**：支持中英文显示，直观展示流量来源。
  - **省份/状态码/域名/URL/资源类型**：全方位的 Top N 分析。
- **回源分析**：监控回源流量、带宽及请求数，掌握源站负载。
- **灵活查询**：
  - 支持自定义时间段（近1小时 - 近31天）。
  - 支持切换数据粒度（分钟/小时/天/自动）。
- **个性化配置**：支持自定义站点名称。

## 🚀 快速开始
>[!TIP]
>
>可使用ci/cd容器如Vercel、Netlify、cloudflare Pages……这些支持Next.js的容器惊醒安装
### 环境准备
确保已安装 Next.js 15+ 和 npm/yarn。

### 1. 克隆项目
```bash
https://github.com/RTXVDZ/eo--nextjs-nodejs-afoim-eo_monitor-
eo--nextjs-nodejs-afoim-eo_monitor-
```

### 2. 安装依赖
```bash
npm install
```

### 3. 配置腾讯云密钥

#### 方法 A：环境变量（推荐）
> [!CAUTION]
> 
> 必填！
创建 `.env.local` 文件（也就是哪些ci/cf容器的变量啦）：
```env
SECRET_ID=你的腾讯云SecretId
SECRET_KEY=你的腾讯云SecretKey
SITE_NAME=我的EdgeOne监控大屏
SITE_ICON=https://example.com/favicon.ico
```

#### 方法 B：key.txt 文件`（超级无敌不推荐！！！！！）`
> [!CAUTION]
> 
> 这样会使key和id明文显示，实在要用就用仅读取权限的密钥！
在项目根目录创建 `key.txt` 文件：
```text
SecretId：您的SecretId
SecretKey：您的SecretKey
```

### 4. 启动开发服务器
```bash
npm run dev
```
访问 `http://localhost:3000`

## 🔧 详细配置

### 环境变量说明

| 变量名 | 必填 | 默认值 | 说明 |
|--------|------|--------|------|
| SECRET_ID | 是 | - | 腾讯云 SecretId |
| SECRET_KEY | 是 | - | 腾讯云 SecretKey |
| SITE_NAME | 否 | AcoFork 的 EdgeOne 监控大屏 | 网站标题 |
| SITE_ICON | 否 | 默认图标 | 网站 favicon |

### 权限说明
使用的腾讯云访问密钥必须拥有 **EdgeOne 只读访问权限** (`QcloudTEOReadOnlyaccess`)。

获取密钥位置：
- **国内版 (China Station)**: [https://console.cloud.tencent.com/cam/user/userType](https://console.cloud.tencent.com/cam/user/userType)
- **海外版 (International Station)**: [https://console.tencentcloud.com/cam/user/userType](https://console.tencentcloud.com/cam/user/userType)

## 🚢 部署指南

### 方式一：Vercel 部署（推荐）
1. Fork 本仓库到您的 GitHub 账号
2. 前往 [Vercel](https://vercel.com) 创建新项目
3. 连接您的 GitHub 仓库
4. 在环境变量中添加配置（同上）
5. 部署项目

### 方式二：本地生产部署
```bash
# 构建项目
npm run build

# 启动生产服务器
npm start

# 访问 http://localhost:3000
```

### 方式三：Docker 部署
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🛠️ 技术栈

- **前端框架**: Next.js 15, React 19, TypeScript
- **样式**: Tailwind CSS, Shadcn/UI 风格
- **图表**: ECharts, echarts-for-react
- **后端**: Next.js API Routes
- **云服务**: Tencent Cloud EdgeOne SDK
- **部署**: Vercel / 任意 Node.js 环境

## 📁 项目结构

```
eo_monitor-main/
├── app/                    # Next.js App Router
│   ├── api/               # API 路由
│   │   ├── config/
│   │   ├── zones/
│   │   ├── traffic/
│   │   └── pages/
│   ├── components/        # React 组件
│   │   ├── Header.tsx
│   │   ├── TimeControls.tsx
│   │   ├── TrafficSection.tsx
│   │   └── ...
│   ├── lib/              # 工具函数
│   ├── layout.tsx        # 根布局
│   ├── page.tsx          # 主页面
│   └── globals.css       # 全局样式
├── public/               # 静态资源
├── node-functions/       # 原 Express API (保留)
├── 辅助文件/             # 示例数据文件
├── package.json
├── tailwind.config.ts
├── next.config.ts
└── tsconfig.json
```

## 📊 功能使用指南

### 1. 时间范围控制
- **预设范围**：30分钟、1小时、6小时、今日、昨日、3天、7天、14天、31天
- **自定义范围**：可输入天、小时、分钟、秒的组合
- **数据粒度**：自动、1分钟、5分钟、1小时、1天

### 2. 站点选择
- 自动加载所有 EdgeOne 站点
- 支持选择特定站点监控
- 默认显示所有站点汇总数据

### 3. 监控面板说明

#### 流量分析 (Traffic)
- 总流量：站点访问总流量
- 请求流量：客户端到 EdgeOne 的流量
- 响应流量：EdgeOne 到客户端的流量

#### 带宽分析 (Bandwidth)
- 总带宽峰值：访问总带宽峰值
- 请求带宽峰值：客户端请求带宽峰值
- 响应带宽峰值：EdgeOne 响应带宽峰值

#### 回源分析 (Origin Pull)
- 回源请求流量：EdgeOne 节点到源站的流量
- 回源响应流量：源站到 EdgeOne 节点的流量
- 缓存命中率：1 - (源站响应 / EdgeOne 响应)

#### 边缘函数 (Edge Functions)
- 总请求数：Edge Functions 调用次数
- 总 CPU 时间：Edge Functions CPU 耗时

#### Pages 统计
- 构建次数：当日/当月 Pages 构建次数
- Cloud Functions：24小时/当月请求数和资源使用量

#### 请求与性能
- 总请求数：L7 访问总请求数
- 响应耗时：平均响应耗时和首字节耗时

#### 安全分析
- 防护命中次数：DDoS/CC 防护拦截次数

#### TOP 分析
- 全球请求分布：世界地图可视化
- 国家/地区排行：流量来源排行

## 🔍 故障排除

### 常见问题

#### 1. API 返回 500 错误
- 检查 `SECRET_ID` 和 `SECRET_KEY` 是否正确配置
- 确认密钥拥有 EdgeOne 只读权限

#### 2. 图表不显示
- 检查网络连接
- 确认 ECharts 脚本已正确加载

#### 3. 数据不更新
- 检查时间范围设置
- 确认站点选择正确

#### 4. 内存不足
```bash
# 增加 Node.js 内存限制
NODE_OPTIONS=--max-old-space-size=4096 npm run build
```

### 开发命令

```bash
# 开发模式
npm run dev

# 生产构建
npm run build

# 启动生产服务器
npm start

# 代码检查
npm run lint

# 使用 TurboPack 加速开发
npm run dev --turbo

# 清理缓存
rm -rf .next
```

## 🔐 安全建议

1. **密钥安全**
   - 不要将密钥提交到版本控制
   - 使用环境变量或密钥管理服务
   - 定期轮换密钥

2. **访问控制**
   - 建议部署在私有网络
   - 添加身份验证层
   - 限制访问 IP

3. **数据保护**
   - 监控数据不包含敏感信息
   - API 仅返回聚合数据
   - 遵循最小权限原则

## 🔄 从原 Express 版本迁移

原项目已成功迁移到 Next.js 架构，所有功能保持不变：
- ✅ 所有 API 端点保持相同
- ✅ 所有前端功能完全一致
- ✅ 相同的样式和用户体验
- ✅ 支持相同的配置方式
- ✅ 保持向后兼容性

## 📈 性能优化

### 构建优化
```bash
# 分析构建大小
npm run build --analyze
```

### 数据更新机制
- 页面加载时自动获取最新数据
- 切换时间范围或站点时自动刷新
- 支持手动刷新按钮
- API 响应缓存 60 秒
- 图表数据本地缓存
- 减少重复 API 调用

## 📱 移动端支持
- 响应式设计，支持手机和平板
- 触摸友好的图表交互
- 适配不同屏幕尺寸

## 📞 技术支持

### 问题反馈
1. 查看控制台错误信息
2. 检查网络请求状态
3. 查看服务器日志

### 资源链接
- [腾讯云 EdgeOne 文档](https://cloud.tencent.com/document/product/1552)
- [Next.js 文档](https://nextjs.org/docs)
- [项目 GitHub](https://github.com/afoim/eo_monitior)

## 📄 版本历史

### v1.0.0 (Next.js 版本)
- 从 Express 迁移到 Next.js
- 完整的 TypeScript 支持
- 组件化架构
- 保持所有原有功能

### 后续计划
- [ ] 实时数据推送
- [ ] 多站点对比
- [ ] 自定义报警规则
- [ ] 数据导出功能

---

**注意**：本监控大屏仅用于展示 EdgeOne 监控数据，不存储任何用户敏感信息。请合理使用腾讯云 API 调用配额。

## 📄 许可证

MIT License