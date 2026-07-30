# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial project setup with Vite, TypeScript, and Tailwind CSS
- Storybook 8.x configuration with essential addons
- Jest testing setup with React Testing Library
- ESLint and Prettier configuration
- Husky pre-commit hooks with lint-staged
- GitHub Actions CI/CD workflows
- Changesets for version management

### Components
- **Button**: Primary button component with variants (primary, secondary, outline, ghost, destructive, link)
- **Input**: Text input with label, error state, and adornment support
- **Card**: Container component with Header, Title, Description, Content, and Footer
- **Dialog**: Modal dialog built on Radix UI Dialog primitive
- **Dropdown**: Dropdown menu built on Radix UI Dropdown Menu primitive

### Utilities
- `cn()`: Class name utility combining clsx and tailwind-merge

## [0.1.0] - YYYY-MM-DD

### Added
- Initial release
