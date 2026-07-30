# Environment Setup Guide

Local environment setup for contributing to the Motadata React Library on **Linux** and **macOS**.

For project conventions, available scripts, code style, and testing details, see the other docs:

- [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md) - Development workflow and code style
- [DEVELOPER_GUIDE_DETAILED.md](./DEVELOPER_GUIDE_DETAILED.md) - Comprehensive reference
- [TESTING_GUIDE.md](./TESTING_GUIDE.md) - Testing strategy and commands
- [CODE_QUALITY.md](./CODE_QUALITY.md) - Linting, formatting, and quality gates
- [CI_CD.md](./CI_CD.md) - Pipeline and deployment

---

## 1. Install Node.js

The project requires **Node.js 18+** (recommended: **20 LTS**). The repository includes an `.nvmrc` file pinned to Node 20.

### Option A: nvm (Recommended)

**Install nvm:**

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
```

Reload your shell, then:

```bash
nvm install       # reads .nvmrc and installs Node 20
nvm use           # activates the correct version
node --version    # should print v20.x.x
npm --version     # should print 10.x.x
```

If `nvm: command not found` appears after install, add the following to your shell config (`~/.bashrc`, `~/.zshrc`, or `~/.bash_profile`):

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
```

Then reload:

```bash
source ~/.bashrc   # or source ~/.zshrc
```

### Option B: System package manager

**macOS (Homebrew):**

```bash
brew install node@20
```

**Ubuntu / Debian:**

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**Fedora / RHEL:**

```bash
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
sudo dnf install -y nodejs
```

**Arch Linux:**

```bash
sudo pacman -S nodejs npm
```

---

## 2. Clone, Install, and Verify

```bash
git clone <repository-url>
cd motadata-react-library
npm install
```

`npm install` also sets up Husky git hooks automatically.

Verify the installation:

```bash
npm run build       # compiles TypeScript and bundles with Vite
npm run test        # runs the full test suite
```

Both commands should complete without errors.

---

## 3. Start Developing

```bash
npm run storybook   # opens Storybook at http://localhost:6006
```

This is the primary development workflow. See [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md) for the full list of available scripts.

---

## 4. Playwright Setup (E2E Tests)

Playwright requires browser binaries installed separately:

```bash
npx playwright install --with-deps
```

On **Linux**, this also installs system-level dependencies (libraries required by Chromium, Firefox, and WebKit). On **macOS**, the `--with-deps` flag handles any missing libraries.

Run E2E tests:

```bash
npm run storybook &          # Storybook must be running
npm run test:e2e
```

### Linux: missing system libraries

If `npx playwright install --with-deps` fails, install dependencies manually:

**Ubuntu / Debian:**

```bash
sudo apt-get update
sudo apt-get install -y \
  libnss3 libatk1.0-0 libatk-bridge2.0-0 libcups2 \
  libdrm2 libxkbcommon0 libxcomposite1 libxdamage1 \
  libxrandr2 libgbm1 libpango-1.0-0 libcairo2 libasound2
```

**Fedora / RHEL:**

```bash
sudo dnf install -y \
  nss atk at-spi2-atk cups-libs libdrm libxkbcommon \
  libXcomposite libXdamage libXrandr mesa-libgbm \
  pango cairo alsa-lib
```

---

## 5. Troubleshooting

### Port 6006 already in use

```bash
lsof -i :6006
kill -9 <PID>
npm run storybook
```

### Stale cache / corrupted node_modules

```bash
rm -rf node_modules package-lock.json
npm install
```

### Storybook cache issues

```bash
rm -rf .storybook/cache node_modules/.cache
npm run storybook
```
