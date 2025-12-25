# EdgeOne Monitoring Dashboard (Next.js 版本)

> [!CAUTION]
> 新demo 本地部署版本，功能较少仅供参考： https://eoddos.2x.nz/
> 
> 原项目Demo已被DDoS炸
![27d1b418ff2918a4926e98db778dd554](https://github.com/user-attachments/assets/fc437ef0-b5a6-4113-ab1f-9da91e20be06)

> [!NOTE]
> 提示：本项目已全面支持腾讯云 EdgeOne 全球版（中国站与国际站账号均可直接使用）。

### 效果图
<img width="2087" height="11971" alt="image" src="https://github.com/user-attachments/assets/cc71dc11-8a5d-4d59-9543-e0dbabac4b33" />

这是一个基于 Next.js 和 Tencent Cloud EdgeOne API 构建的实时监控大屏，旨在提供直观的流量和请求分析。

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

## 🚀 快速部署

### 方式一：本地运行

1. 克隆仓库：
   ```bash
   git clone https://github.com/afoim/eo_monitior
   cd eo_monitior
   ```

2. 安装依赖：
   ```bash
   npm install
   ```

3. 配置密钥：
   - **方法 A (环境变量)**：创建 `.env.local` 文件，内容参考 `.env.example`
   - **方法 B (文件配置)**：在项目根目录创建 `key.txt` 文件，内容格式如下（注意使用中文冒号）：
     ```text
     SecretId：您的SecretId
     SecretKey：您的SecretKey
     ```

4. 启动开发服务器：
   ```bash
   npm run dev
   ```

5. 访问 `http://localhost:3000`。

### 方式二：生产部署

1. 构建项目：
   ```bash
   npm run build
   ```

2. 启动生产服务器：
   ```bash
   npm start
   ```

### 方式三：Vercel 部署 (推荐)

1. Fork 本仓库到您的 GitHub 账号。
2. 前往 [Vercel](https://vercel.com) 创建新项目。
3. 连接您的 GitHub 仓库。
4. 在环境变量中添加以下配置：
   - `SECRET_ID`: 您的腾讯云 SecretId
   - `SECRET_KEY`: 您的腾讯云 SecretKey
   - `SITE_NAME`: (可选) 自定义大屏标题
   - `SITE_ICON`: (可选) 自定义网页图标
5. 部署项目。

## 🔑 权限说明

使用的腾讯云访问密钥必须拥有 **EdgeOne 只读访问权限** (`QcloudTEOReadOnlyaccess`)。
请前往访问管理控制台创建和管理密钥（只需要 **编程访问**）：
- **国内版 (China Station)**: [https://console.cloud.tencent.com/cam/user/userType](https://console.cloud.tencent.com/cam/user/userType)
- **海外版 (International Station)**: [https://console.tencentcloud.com/cam/user/userType](https://console.tencentcloud.com/cam/user/userType)

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

## 🔄 从原 Express 版本迁移

原项目已成功迁移到 Next.js 架构，所有功能保持不变：

- ✅ 所有 API 端点保持相同
- ✅ 所有前端功能完全一致
- ✅ 相同的样式和用户体验
- ✅ 支持相同的配置方式
- ✅ 保持向后兼容性

## 🐛 故障排除

### 常见问题

1. **API 返回 500 错误**
   - 检查 `SECRET_ID` 和 `SECRET_KEY` 是否正确配置
   - 确认密钥拥有 EdgeOne 只读权限

2. **图表不显示**
   - 检查网络连接
   - 确认 ECharts 脚本已正确加载

3. **数据不更新**
   - 检查时间范围设置
   - 确认站点选择正确

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
```

## 📄 许可证

MIT License