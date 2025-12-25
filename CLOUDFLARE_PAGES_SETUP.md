# Cloudflare Pages 环境变量配置指南

## 问题描述
在Cloudflare Pages上部署时，环境变量无法正确读取。

## 原因分析
1. Next.js在Cloudflare Pages上有特殊的环境变量处理规则
2. 缺少dotenv配置加载
3. 环境变量命名可能需要调整

## 解决方案

### 1. 在Cloudflare Pages中设置环境变量

在Cloudflare Pages项目的设置中，添加以下环境变量：

#### 必需的环境变量：
- `SECRET_ID` - 腾讯云API密钥ID
- `SECRET_KEY` - 腾讯云API密钥

#### 可选的环境变量：
- `SITE_NAME` - 站点名称（默认：AcoFork 的 EdgeOne 监控大屏）
- `SITE_ICON` - 站点图标URL（默认：https://q2.qlogo.cn/headimg_dl?dst_uin=2726730791&spec=0）

### 2. 环境变量命名规则

对于Next.js应用，在Cloudflare Pages上：

#### 服务器端环境变量（API路由使用）：
- 直接使用：`SECRET_ID`, `SECRET_KEY`
- 在构建时和运行时都可用

#### 客户端环境变量（浏览器端使用）：
- 需要以`NEXT_PUBLIC_`为前缀
- 例如：`NEXT_PUBLIC_SITE_NAME`, `NEXT_PUBLIC_SITE_ICON`

### 3. 调试环境变量

应用现在包含详细的调试信息。如果环境变量仍然无法读取：

1. 检查Cloudflare Pages的部署日志
2. 访问 `/api/config` 端点查看环境变量状态
3. 查看浏览器控制台日志

### 4. 验证步骤

1. **部署后**，访问：`https://你的域名/api/config`
2. 检查返回的JSON中的`debug.envKeys`字段
3. 确保看到`SECRET_ID`和`SECRET_KEY`

### 5. 常见问题排查

#### 问题：环境变量已设置但无法读取
**解决方案**：
1. 确保环境变量名称完全匹配（大小写敏感）
2. 重新部署应用
3. 检查Cloudflare Pages的"环境变量"页面，确保已保存

#### 问题：API调用返回"Missing credentials"
**解决方案**：
1. 检查部署日志中的环境变量调试信息
2. 确保`SECRET_ID`和`SECRET_KEY`已正确设置
3. 验证腾讯云API密钥是否有访问EdgeOne的权限

#### 问题：开发环境正常，生产环境失败
**解决方案**：
1. 确保生产环境的环境变量已设置
2. 检查Cloudflare Pages的生产分支设置
3. 可能需要为生产环境单独设置环境变量

### 6. 环境变量安全注意事项

1. **不要**在代码中硬编码API密钥
2. **不要**将`.env`文件提交到Git仓库
3. 使用Cloudflare Pages的环境变量管理功能
4. 定期轮换API密钥

### 7. 更新后的代码改进

1. **添加了环境变量验证**：在应用启动时检查必需的环境变量
2. **增强的调试信息**：在API响应中包含环境变量状态
3. **更好的错误处理**：提供清晰的错误消息和调试信息
4. **Cloudflare Pages检测**：自动检测部署环境

### 8. 测试命令

在本地测试环境变量：

```bash
# 设置环境变量
export SECRET_ID="your_secret_id"
export SECRET_KEY="your_secret_key"

# 启动开发服务器
npm run dev

# 测试API端点
curl http://localhost:3000/api/config
curl http://localhost:3000/api/zones
```

### 9. 联系支持

如果问题仍然存在，请提供：
1. Cloudflare Pages的部署日志
2. `/api/config`端点的响应
3. 环境变量设置的截图