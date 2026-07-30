# CI/CD Pipeline Documentation

This document describes the Azure DevOps CI/CD pipeline configuration for the Motadata React Library.

## Table of Contents

- [Pipeline Overview](#pipeline-overview)
- [Pipeline Stages](#pipeline-stages)
- [Configuration Files](#configuration-files)
- [SonarQube Integration](#sonarqube-integration)
- [Quality Gates](#quality-gates)
- [Troubleshooting](#troubleshooting)
- [Manual Processes](#manual-processes)

---

## Pipeline Overview

The CI/CD pipeline runs automatically on:

- **Push** to `main` or `dev` branches
- **Pull requests** targeting `main`

### Pipeline Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                         Quality Stage                            │
│  ┌──────────────────┐    ┌──────────────────┐                   │
│  │  Lint & Type     │    │   Unit Tests     │                   │
│  │     Check        │    │   + Coverage     │                   │
│  └────────┬─────────┘    └────────┬─────────┘                   │
│           └──────────┬───────────┘                              │
└──────────────────────┼──────────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Build & Storybook Stage                       │
│  ┌──────────────────┐    ┌──────────────────┐                   │
│  │  Build Library   │    │ Build Storybook  │                   │
│  │  + Size Check    │    │                  │                   │
│  └────────┬─────────┘    └────────┬─────────┘                   │
│           └──────────┬───────────┘                              │
└──────────────────────┼──────────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                      E2E Stage (main only)                       │
│  ┌──────────────────┐                                           │
│  │  Playwright E2E  │                                           │
│  │     Tests        │                                           │
│  └──────────────────┘                                           │
└─────────────────────────────────────────────────────────────────┘
```

---

## Pipeline Stages

### Stage 1: Quality

Runs code quality checks in parallel:

**Job: Lint & Type Check**

| Step            | Command                | Purpose              |
| --------------- | ---------------------- | -------------------- |
| Install Node.js | `NodeTool@0`           | Set up Node.js 20.x  |
| Cache npm       | `Cache@2`              | Speed up builds      |
| Install deps    | `npm ci`               | Install dependencies |
| ESLint          | `npm run lint`         | Check code quality   |
| TypeScript      | `npm run typecheck`    | Type checking        |
| Prettier        | `npm run format:check` | Format checking      |

**Job: Unit Tests**

| Step             | Command                        | Purpose                 |
| ---------------- | ------------------------------ | ----------------------- |
| Install Node.js  | `NodeTool@0`                   | Set up Node.js 20.x     |
| Cache npm        | `Cache@2`                      | Speed up builds         |
| Install deps     | `npm ci`                       | Install dependencies    |
| Tests            | `npm run test:coverage`        | Run tests with coverage |
| Publish results  | `PublishTestResults@2`         | JUnit results to Azure  |
| Publish coverage | `PublishCodeCoverageResults@2` | Coverage to Azure       |

### Stage 2: Build

Runs after Quality stage succeeds:

**Job: Build Library**

| Step       | Command                   | Purpose               |
| ---------- | ------------------------- | --------------------- |
| Build      | `npm run build`           | Compile library       |
| Size check | `npm run size`            | Verify bundle size    |
| Publish    | `PublishBuildArtifacts@1` | Store dist/ artifacts |

### Stage 3: Storybook

Runs in parallel with Build stage:

**Job: Build Storybook**

| Step    | Command                   | Purpose                   |
| ------- | ------------------------- | ------------------------- |
| Build   | `npm run build-storybook` | Build Storybook           |
| Publish | `PublishBuildArtifacts@1` | Store storybook artifacts |

### Stage 4: E2E (main only)

Runs only on `main` branch after Build and Storybook succeed:

**Job: Playwright E2E Tests**

| Step               | Command                   | Purpose          |
| ------------------ | ------------------------- | ---------------- |
| Install Playwright | `npx playwright install`  | Install browsers |
| E2E tests          | `npm run test:e2e`        | Run E2E tests    |
| Publish results    | `PublishTestResults@2`    | JUnit results    |
| Publish report     | `PublishBuildArtifacts@1` | On failure only  |

---

## Configuration Files

### azure-pipelines.yml

Main pipeline configuration:

```yaml
trigger:
  branches:
    include:
      - main
      - dev

pr:
  branches:
    include:
      - main

pool:
  vmImage: 'ubuntu-latest'

variables:
  - name: NODE_VERSION
    value: '20.x'
```

### Required Pipeline Variables

Set these in Azure DevOps:

| Variable                  | Description          | Secret |
| ------------------------- | -------------------- | ------ |
| `NODE_VERSION`            | Node.js version      | No     |
| `SONAR_HOST_URL`          | SonarQube server URL | No     |
| `SONAR_TOKEN`             | SonarQube auth token | Yes    |
| `CHROMATIC_PROJECT_TOKEN` | Chromatic token      | Yes    |

---

## SonarQube Integration

### Setup Requirements

1. **Set up SonarQube server** (self-hosted)
2. **Create project** in SonarQube
3. **Generate authentication token**
4. **Install Azure DevOps extension** - Search "SonarQube" in Marketplace
5. **Create service connection** in Azure DevOps Project Settings

### Step-by-Step Setup

#### 1. Create SonarQube Project

- Log in to your SonarQube server
- Go to Projects > Create Project
- Enter project key: `motadata-react-library`
- Generate a project token

#### 2. Install Azure DevOps Extension

- Go to Azure DevOps Marketplace
- Search for "SonarQube"
- Install to your organization

#### 3. Create Service Connection

- Go to Azure DevOps > Project Settings > Service Connections
- Click "New service connection"
- Select "SonarQube"
- Enter your SonarQube server URL
- Enter authentication token
- Name it "SonarQube"

#### 4. Update Configuration

Update `sonar-project.properties`:

```properties
sonar.host.url=https://your-sonarqube-server.com
sonar.projectKey=motadata-react-library
```

#### 5. Enable Pipeline Job

Uncomment the SonarQube job in `azure-pipelines.yml` when your server is ready.

### SonarQube Configuration

See `sonar-project.properties`:

```properties
sonar.projectKey=motadata-react-library
sonar.sources=src
sonar.tests=src
sonar.javascript.lcov.reportPaths=coverage/lcov.info
```

---

## Quality Gates

### Azure DevOps Gates

| Check       | Threshold | Blocks PR |
| ----------- | --------- | --------- |
| ESLint      | 0 errors  | Yes       |
| TypeScript  | 0 errors  | Yes       |
| Unit Tests  | 100% pass | Yes       |
| Coverage    | ≥ 90%     | Yes       |
| Build       | Success   | Yes       |
| Bundle Size | ≤ 50KB    | Yes       |

### SonarQube Gates

| Metric          | Threshold | Rating   |
| --------------- | --------- | -------- |
| Coverage        | ≥ 90%     | Required |
| Duplications    | < 3%      | Required |
| Maintainability | A         | Required |
| Reliability     | A         | Required |
| Security        | A         | Required |

### PR Status Checks

Configure branch protection in Azure DevOps:

1. Go to **Repos** > **Branches**
2. Select `main` branch > **Branch policies**
3. Enable **Build validation**
4. Add pipeline as required check
5. Enable **Require reviewers**

---

## Troubleshooting

### Common Issues

**Tests failing in CI but passing locally:**

1. Check for environment-specific code
2. Verify all dependencies are in package.json
3. Check for timing issues (add explicit waits)
4. Review test output in Azure logs

**Coverage report not appearing:**

1. Verify `coverage/cobertura-coverage.xml` exists
2. Check `PublishCodeCoverageResults` task configuration
3. Ensure coverage is generated during test run

**Bundle size exceeding limits:**

1. Run `npm run analyze` locally
2. Review recent changes for large additions
3. Consider code splitting or lazy loading
4. Check for accidentally bundled dependencies

**SonarQube analysis failing:**

1. Verify service connection is valid
2. Check SonarQube server is accessible
3. Ensure token has proper permissions
4. Review sonar-project.properties configuration

**Playwright tests timing out:**

1. Increase webServer timeout
2. Check Storybook build succeeds
3. Verify selectors are correct
4. Add explicit waits for dynamic content

### Debug Commands

```bash
# Run locally with CI environment
CI=true npm run test

# Verbose test output
npm run test -- --verbose

# Debug Playwright
npm run test:e2e:debug

# Check what would be published
npm pack --dry-run
```

---

## Manual Processes

### Creating Releases

Releases are created manually using changesets:

```bash
# 1. Create changeset
npm run changeset

# 2. Version packages
npm run version

# 3. Build and publish
npm run release
```

### Running Chromatic

Visual testing is run manually:

```bash
npm run chromatic
```

### Updating Dependencies

```bash
# Check for updates
npm outdated

# Update dependencies
npm update

# Update major versions manually
npm install package@latest
```

---

## Pipeline Artifacts

### Generated Artifacts

| Artifact            | Contents                     | Retention |
| ------------------- | ---------------------------- | --------- |
| `library-dist`      | Compiled library (`dist/`)   | 30 days   |
| `storybook`         | Static Storybook site        | 30 days   |
| `playwright-report` | E2E test report (on failure) | 30 days   |

### Downloading Artifacts

From Azure DevOps:

1. Go to **Pipelines** > **Runs**
2. Select the run
3. Click **Artifacts** dropdown
4. Download desired artifact

### Using Artifacts

**Deploy Storybook:**

```bash
# Download storybook artifact
# Deploy to hosting service (Netlify, Vercel, Azure Static Web Apps)
```

**Publish Library:**

```bash
# Download library-dist artifact
# Verify contents
# Publish to npm (manual)
```

---

## Environment Setup

### Required Azure DevOps Extensions

- **SonarQube** - For code analysis
- **Node.js Tool Installer** - For Node.js setup

### Service Connections

| Connection     | Type      | Purpose            |
| -------------- | --------- | ------------------ |
| SonarQube      | SonarQube | Code analysis      |
| npm (optional) | npm       | Package publishing |

### Agent Requirements

- **Ubuntu latest** - Recommended
- **Node.js 20.x** - Required
- **npm 10.x** - Required

---

## Best Practices

### Pipeline Performance

1. **Cache dependencies** - Use `Cache@2` task
2. **Parallel jobs** - Run independent jobs simultaneously
3. **Fail fast** - Stop on first failure
4. **Conditional stages** - Skip E2E on non-main branches

### Security

1. **Never commit secrets** - Use Azure DevOps variables
2. **Use managed identity** - When possible
3. **Limit permissions** - Least privilege principle
4. **Audit regularly** - Review access and tokens

### Reliability

1. **Pin versions** - Use exact versions in package.json
2. **Lock dependencies** - Use package-lock.json
3. **Test locally first** - Reproduce CI environment
4. **Monitor pipelines** - Set up alerts for failures

---

## Resources

- [Azure Pipelines Documentation](https://docs.microsoft.com/azure/devops/pipelines/)
- [SonarQube Azure DevOps Extension](https://docs.sonarqube.org/latest/analysis/azuredevops-integration/)
- [Playwright Azure DevOps](https://playwright.dev/docs/ci#azure-pipelines)
- [npm Publish Automation](https://docs.npmjs.com/cli/v10/commands/npm-publish)
