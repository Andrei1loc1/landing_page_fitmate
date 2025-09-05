# Firebase Studio

This is a Next.js starter in Firebase Studio.

## Prerequisites
- Node.js 20 LTS (recommended) or >= 18.18.0
- npm 10+

Check your versions:
- `node -v`
- `npm -v`

If you don't have Node.js, install from https://nodejs.org (choose LTS).

## Install dependencies
From the project root (folder that contains `package.json`):

```powershell
# In PowerShell or Command Prompt
npm install
```

## Run the dev server
```powershell
npm run dev
```
The app will start at http://localhost:9002

## Troubleshooting: `'next' is not recognized`
This usually means dependencies are not installed (no `node_modules`) or you're using an incompatible Node/npm.

Try the following steps in order:
1. Ensure you're in the project root (the directory that has `package.json`).
2. Install deps:
   ```powershell
   npm install
   ```
3. If it still fails, clean and reinstall:
   ```powershell
   rmdir node_modules -Recurse -Force  # PowerShell
   del package-lock.json               # optional
   npm cache verify
   npm install
   ```
4. Verify Next is installed:
   ```powershell
   npx next --version
   ```
   If this prints a version, try `npm run dev` again.
5. Check Node version (Next.js 15 requires Node >= 18.18):
   ```powershell
   node -v
   ```
   If it's lower, install Node 20 LTS and retry.

If you still have issues, please share the full console output and your `node -v`/`npm -v`.

## Project quickstart
- Main page: `src/app/page.tsx`
- Dev server script: `npm run dev` (uses Turbopack and port 9002)
