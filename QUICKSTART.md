# ToolVerse Quick Start Guide

Get ToolVerse running locally in 5 minutes.

## Prerequisites

- Node.js 18+ ([download](https://nodejs.org/))
- pnpm 8+ (or npm/yarn)

## Installation

1. **Install dependencies**
   ```bash
   pnpm install
   ```

2. **Start development server**
   ```bash
   pnpm dev
   ```

3. **Open in browser**
   - Navigate to [http://localhost:3000](http://localhost:3000)
   - You should see the ToolVerse homepage with 100+ tools

## What You Get

### Out of the Box
- ✅ Home page with tool showcase
- ✅ Tools grid with search and filtering
- ✅ 13 fully functional tools
- ✅ Framework for 87 more tools
- ✅ Dark theme with neon green accents
- ✅ Mobile-responsive design
- ✅ Tool sharing and favorites system (UI ready)
- ✅ Beautiful animations

### Working Tools
1. **Word Counter** - Analyze text statistics
2. **Character Counter** - Count characters with/without spaces
3. **Case Converter** - Convert between 7 text cases
4. **Text Reverser** - Reverse text or words
5. **JSON Formatter** - Format and validate JSON
6. **Base64 Encoder** - Encode/decode Base64
7. **UUID Generator** - Generate unique IDs
8. **Age Calculator** - Calculate age from birth date
9. **Percentage Calculator** - 4 calculation types
10. **Password Generator** - Create secure passwords
11. **QR Code Generator** - Generate QR codes
12. **Color Picker** - Convert color formats (HEX/RGB/HSL)
13. **Markdown Preview** - Real-time markdown rendering

## Project Structure

```
/app              - Next.js pages and routes
/components       - React components
/lib              - Utilities and helpers
/types            - TypeScript definitions
/public           - Static assets
```

## Common Tasks

### Add a New Tool

1. **Create the component** (`/components/tools/[tool-name].tsx`)
   ```typescript
   'use client';
   
   export function MyTool() {
     const [input, setInput] = useState('');
     
     return (
       <div className="space-y-6">
         {/* Your tool UI */}
       </div>
     );
   }
   ```

2. **Register it** in `/app/tools/[toolId]/page.tsx`
   ```typescript
   import { MyTool } from '@/components/tools/my-tool';
   TOOL_COMPONENTS['MyTool'] = MyTool;
   ```

3. **Add to definitions** in `/lib/tools/definitions.ts`
   ```typescript
   {
     id: 'my-tool',
     name: 'My Tool',
     component: 'MyTool',
     // ... other properties
   }
   ```

### Change Theme Colors

Edit `/app/globals.css`:
```css
:root {
  --accent: #22c55e;  /* Change neon green */
  --background: #ffffff;
  --foreground: #0a0a0a;
}

.dark {
  --background: #0a0a0a;
  --foreground: #f5f5f5;
}
```

### Add Dependencies

```bash
pnpm add [package-name]
```

Recommended packages:
- `qrcode` - QR code generation
- `sharp` - Image processing
- `pdfkit` - PDF generation
- `crypto-js` - Encryption utilities

## Build for Production

```bash
# Build optimized version
pnpm build

# Test production build locally
pnpm start
```

## Environment Variables

Create `.env.local` file (copy from `.env.example`):
```
JWT_SECRET=your-secret-key
DATABASE_URL=mongodb://localhost/toolverse
```

## Troubleshooting

### Port already in use
```bash
# Change port
pnpm dev -- -p 3001
```

### Clear cache
```bash
rm -rf .next node_modules
pnpm install
pnpm dev
```

### TypeScript errors
```bash
# Check for type errors
pnpm tsc --noEmit
```

## Debugging

### Enable debug logging
```typescript
console.log("[ToolVerse] Debug message", variable);
```

### React DevTools
Install React DevTools browser extension for component inspection.

### Network tab
Use browser DevTools Network tab to check API calls to `/api/tools`.

## File Conventions

### Component Files
- Functional components only
- Use `'use client'` for interactive components
- Named exports
- File name: kebab-case, component name: PascalCase

### Pages
- One component per file
- Default export
- File path becomes route

### API Routes
- File path becomes API endpoint
- `GET`, `POST`, `PUT`, `DELETE` methods
- Return JSON responses

## Styling

### Utility Classes
```tsx
<div className="flex items-center justify-between gap-4 p-6">
  <span className="text-sm text-muted-foreground">Label</span>
  <Button size="sm">Action</Button>
</div>
```

### Component Classes
```tsx
<Card className="border border-border bg-card p-6">
  <h3 className="font-semibold text-foreground">Title</h3>
</Card>
```

### Dark Mode
- Automatically applied
- Use CSS variables: `var(--foreground)`, `var(--background)`

## Performance Tips

1. **Use next/image** for images
2. **Lazy load components** with `dynamic()`
3. **Debounce search/input** with utilities
4. **Memoize expensive calculations** with `useMemo`
5. **Code splitting** happens automatically

## Common Patterns

### Input + Output Tool
```typescript
const [input, setInput] = useState('');
const output = processInput(input);

<Textarea value={input} onChange={(e) => setInput(e.target.value)} />
<Button onClick={() => copy(output)}>Copy</Button>
```

### Multi-option Calculator
```typescript
const [type, setType] = useState('option1');

{['option1', 'option2'].map(t => (
  <Button
    key={t}
    variant={type === t ? 'default' : 'outline'}
    onClick={() => setType(t)}
  >
    {t}
  </Button>
))}
```

### Stats Display
```typescript
const stats = [
  { label: 'Words', value: 42 },
  { label: 'Characters', value: 256 }
];

{stats.map(s => (
  <Card key={s.label} className="p-4">
    <p className="text-muted-foreground">{s.label}</p>
    <p className="text-2xl font-bold">{s.value}</p>
  </Card>
))}
```

## Useful Links

- **Next.js Docs**: https://nextjs.org/docs
- **React Docs**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com
- **Shadcn UI**: https://ui.shadcn.com
- **TypeScript**: https://www.typescriptlang.org

## Getting Help

1. Check `README.md` for full documentation
2. Review `BUILD_SUMMARY.md` for architecture
3. Check `DEPLOYMENT.md` for deployment help
4. Review existing tool components for patterns
5. Open an issue on GitHub

## Next Steps

1. ✅ Run the app locally
2. Try out the existing 13 tools
3. Implement 3 new tools from the placeholders
4. Deploy to Vercel
5. Share with others!

---

**Happy building! 🚀**
