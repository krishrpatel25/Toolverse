# ToolVerse Deployment Guide

This guide covers deploying ToolVerse to production environments.

## Deployment Platforms

### Vercel (Recommended)

Vercel is the optimal platform for Next.js applications and offers seamless deployment.

#### Prerequisites
- Vercel account
- GitHub repository (recommended)

#### Steps

1. **Push code to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Select the repository

3. **Configure Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add all variables from `.env.example`:
     ```
     JWT_SECRET=your-random-secret
     DATABASE_URL=your-mongodb-url
     ```

4. **Deploy**
   - Vercel will automatically build and deploy on every push to main
   - Preview deployments are created for pull requests

#### Performance Optimization

- **Image Optimization**: Automatic with Next.js Image component
- **Code Splitting**: Enabled by default
- **Caching**: Set via `Cache-Control` headers
- **Edge Functions**: Optional for real-time personalization

### Docker

Deploy ToolVerse using Docker for maximum portability.

#### Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Copy source
COPY . .

# Build
RUN pnpm build

# Start
EXPOSE 3000
CMD ["pnpm", "start"]
```

#### Build & Run

```bash
# Build image
docker build -t toolverse .

# Run container
docker run -p 3000:3000 \
  -e JWT_SECRET=your-secret \
  -e DATABASE_URL=your-db \
  toolverse
```

### Self-Hosted (Linux/Unix)

For full control over your infrastructure.

#### Prerequisites
- Node.js 18+
- PM2 or systemd
- Nginx or Apache for reverse proxy
- MongoDB instance

#### Installation

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd toolverse
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Build application**
   ```bash
   pnpm build
   ```

4. **Create environment file**
   ```bash
   cp .env.example .env.local
   # Edit with your configuration
   nano .env.local
   ```

5. **Start with PM2**
   ```bash
   pnpm install -g pm2
   pm2 start "pnpm start" --name "toolverse"
   pm2 save
   pm2 startup
   ```

6. **Configure Nginx**
   ```nginx
   server {
       listen 80;
       server_name toolverse.app;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

7. **Enable HTTPS with Let's Encrypt**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d toolverse.app
   ```

## Database Setup

### MongoDB Atlas (Cloud)

Recommended for managed database hosting.

1. **Create account** at [mongodb.com/cloud](https://mongodb.com/cloud)
2. **Create cluster** with your preferred region
3. **Create database user** with strong password
4. **Whitelist IP addresses** for your servers
5. **Get connection string** and add to environment variables

### Self-Hosted MongoDB

For maximum control:

```bash
# Install MongoDB
sudo apt install mongodb-org

# Start service
sudo systemctl start mongod
sudo systemctl enable mongod

# Create database
mongosh
> use toolverse
> db.createUser({user: "user", pwd: "password", roles: ["dbOwner"]})
```

## Performance Optimization

### Caching Strategy

1. **Static Content (1 year)**
   - Images, fonts, CSS
   - Immutable assets with content hashing

2. **API Responses (5 minutes)**
   - Tool data
   - Category listings

3. **HTML Pages (1 hour)**
   - Dynamic pages with user data
   - Revalidate on demand

### Database Optimization

1. **Create Indexes**
   ```javascript
   db.tools.createIndex({ category: 1 });
   db.tools.createIndex({ tags: 1 });
   db.users.createIndex({ email: 1 });
   ```

2. **Connection Pooling**
   - MongoDB: Connection pool of 100
   - Update pool size based on load

### CDN Setup

Use a CDN for global distribution:

1. **Cloudflare** (Recommended)
   - Add CNAME record pointing to your server
   - Enable Page Rules for caching

2. **AWS CloudFront**
   - Create distribution pointing to your origin
   - Set TTL for different content types

## Monitoring & Logging

### Error Tracking

```bash
# Install Sentry (optional)
npm install @sentry/nextjs
```

### Performance Monitoring

- Use Vercel Analytics (if on Vercel)
- Or: Google Analytics, Mixpanel

### Logging

```bash
# Install logging package (optional)
npm install winston
```

## Security Checklist

- [ ] Enable HTTPS/TLS
- [ ] Set strong JWT secret (32+ characters)
- [ ] Enable CORS only for trusted domains
- [ ] Implement rate limiting
- [ ] Use environment variables for secrets
- [ ] Enable security headers:
  - X-Content-Type-Options: nosniff
  - X-Frame-Options: DENY
  - X-XSS-Protection: 1; mode=block
- [ ] Regular security updates
- [ ] Database backups (daily)
- [ ] Monitor for suspicious activity

## Backup Strategy

### Database Backups

```bash
# MongoDB backup
mongodump --uri mongodb+srv://user:pass@cluster.mongodb.net/toolverse \
          --out ./backups

# Restore
mongorestore --uri mongodb+srv://user:pass@cluster.mongodb.net/toolverse \
             ./backups
```

### Automated Backups

Use MongoDB Atlas:
- Automated backups (default: daily)
- Point-in-time recovery (last 7 days)

## Scaling

### Horizontal Scaling

1. **Load Balancing**
   - Use Nginx upstream with multiple application servers
   - Or use cloud load balancer

2. **Session Replication**
   - Use Redis for session store
   - Multiple application servers share session data

3. **Database Scaling**
   - MongoDB sharding for large datasets
   - Read replicas for read-heavy workloads

### Vertical Scaling

- Increase server CPU/RAM
- Upgrade database instance

## Troubleshooting

### High Memory Usage

```bash
# Check Node process memory
ps aux | grep node
# Restart application
pm2 restart toolverse
```

### Database Connection Issues

```bash
# Test MongoDB connection
mongo mongodb+srv://user:pass@cluster.mongodb.net/test

# Check connection pool exhaustion
db.serverStatus().connections
```

### Slow API Responses

1. Check database indexes
2. Monitor query performance
3. Enable caching
4. Scale horizontally

## Maintenance

### Regular Tasks

- **Weekly**: Check error logs
- **Monthly**: Review performance metrics
- **Quarterly**: Security audit
- **Yearly**: Infrastructure review

### Updates

```bash
# Update dependencies
pnpm update

# Update Next.js
pnpm add next@latest

# Rebuild and test
pnpm build
pnpm test

# Deploy
git push origin main
```

## Support

For deployment issues:
- Check Vercel docs: [vercel.com/docs](https://vercel.com/docs)
- Review Next.js deployment: [nextjs.org/docs/deployment](https://nextjs.org/docs/deployment)
- Contact support or open an issue
