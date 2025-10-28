# Contributing to Focus Timer Hub

Thank you for your interest in contributing to Focus Timer Hub! This document provides guidelines and instructions for contributing to the project.

## 🏛️ Constitutional Alignment

All contributions must align with our 6 core constitutional principles:

1. **Focus-first Experience** - Keep interactions minimal (1-2 steps to start)
2. **Simple and Consistent UI** - Follow the established design system
3. **Accessibility and Mobile-first** - WCAG AA compliance required
4. **Lightweight Performance** - Bundle size <150KB, TTI <2s
5. **Maintainable Development** - TypeScript, tests, documentation
6. **Local-first Security** - No tracking, localStorage only, privacy by design

See `.specify/memory/constitution.md` for complete details.

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm 9+ or pnpm 8+
- Git

### Development Setup

```bash
# 1. Fork the repository on GitHub

# 2. Clone your fork
git clone https://github.com/YOUR_USERNAME/focus-time.git
cd focus-time

# 3. Install dependencies
npm install

# 4. Start development server
npm run dev

# 5. Open http://localhost:5173
```

### Development Workflow

```bash
# Create a feature branch
git checkout -b feature/your-feature-name

# Make your changes and test locally
npm run dev

# Verify code quality
npm run typecheck  # TypeScript type checking
npm run lint       # ESLint linting
npm run format     # Prettier formatting

# Commit your changes
git add .
git commit -m "feat: add your feature description"

# Push to your fork
git push origin feature/your-feature-name

# Open a Pull Request on GitHub
```

---

## 📝 Contribution Guidelines

### Code Style

**TypeScript:**
- Use strict mode (already configured)
- No `any` types unless absolutely necessary
- Prefer interfaces over types for objects
- Use meaningful variable names

**React:**
- Functional components with hooks
- Use TypeScript for props
- Keep components small and focused
- Extract reusable logic into custom hooks

**Styling:**
- Use Tailwind CSS utility classes
- Follow mobile-first approach
- Use design tokens from `tailwind.config.ts`
- Maintain 44×44px minimum touch targets

**Naming Conventions:**
- Components: `PascalCase` (e.g., `FocusCard.tsx`)
- Hooks: `camelCase` starting with `use` (e.g., `useToast.ts`)
- Utilities: `camelCase` (e.g., `formatTime`)
- Constants: `UPPER_SNAKE_CASE` (e.g., `STORAGE_KEYS`)

### Commit Messages

Follow Conventional Commits specification:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic changes)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Build process or auxiliary tool changes

**Examples:**
```
feat(timer): add session snapshot and restore
fix(tasks): resolve task deletion bug
docs(readme): update deployment instructions
refactor(store): simplify timerSlice logic
perf(components): add lazy loading for modals
```

---

## 🧪 Testing Requirements

### Before Submitting a PR

1. **Type Safety:**
   ```bash
   npm run typecheck  # Must pass with 0 errors
   ```

2. **Linting:**
   ```bash
   npm run lint       # Must pass with 0 errors/warnings
   ```

3. **Formatting:**
   ```bash
   npm run format     # Auto-format code
   ```

4. **Build:**
   ```bash
   npm run build      # Must build successfully
   ```

5. **Manual Testing:**
   - Test your changes in the browser
   - Test on mobile viewport (320px minimum)
   - Test keyboard navigation
   - Verify accessibility (screen reader if possible)

### Writing Tests (Recommended)

While unit tests are not yet implemented, you're encouraged to add them:

```typescript
// src/store/timerSlice.test.ts
import { describe, it, expect } from 'vitest';
import { createTimerSlice } from './timerSlice';

describe('timerSlice', () => {
  it('should start timer correctly', () => {
    const slice = createTimerSlice(/* ... */);
    slice.start('work', 1500);
    expect(slice.status).toBe('running');
  });
});
```

---

## 🎨 Design System

### Colors

Use the defined color tokens:

```typescript
// Primary (Work sessions)
className="bg-primary hover:bg-primary-dark text-white"

// Secondary (Break sessions)
className="bg-secondary hover:bg-secondary-dark text-white"

// Neutral
className="bg-white/10 text-white/80"
```

### Typography

```typescript
// Body text
className="font-sans text-base"

// Display/Headings
className="font-display text-2xl font-bold"

// Timer
className="font-display text-5xl md:text-8xl font-bold tabular-nums"
```

### Spacing

Follow Tailwind's spacing scale:
- Mobile: `p-4 md:p-6`
- Desktop: `p-6 lg:p-8`
- Gaps: `gap-2 md:gap-4`

### Components

Use existing UI components when possible:
- `Button` - For all button actions
- `Modal` - For dialogs and overlays
- `Toast` - For notifications

---

## ♿ Accessibility Requirements

All contributions must meet WCAG AA standards:

### Mandatory Checks

1. **Keyboard Navigation:**
   - All interactive elements accessible via Tab
   - Enter/Space activate buttons
   - Escape closes modals

2. **ARIA Labels:**
   ```tsx
   <button aria-label="Start 25-minute focus session">
     Start
   </button>
   ```

3. **Focus States:**
   ```tsx
   className="focus-ring" // Provides 2px outline with offset
   ```

4. **Touch Targets:**
   ```tsx
   className="min-h-[44px]" // Minimum 44×44px
   ```

5. **Color Contrast:**
   - Text: 4.5:1 minimum
   - UI components: 3:1 minimum
   - Use WebAIM Contrast Checker

6. **Reduced Motion:**
   - Respect `prefers-reduced-motion`
   - Already handled in `src/index.css`

---

## 📦 Pull Request Process

### Before Submitting

- [ ] Code follows style guidelines
- [ ] All tests pass (typecheck, lint, build)
- [ ] Manual testing completed
- [ ] Accessibility verified
- [ ] Documentation updated (if needed)
- [ ] Commit messages follow convention
- [ ] Branch is up to date with `main`

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested locally
- [ ] Tested on mobile viewport
- [ ] Keyboard navigation verified
- [ ] No console errors

## Screenshots (if applicable)
[Add screenshots for UI changes]

## Constitutional Alignment
Which principle(s) does this support?
- [ ] Principle 1: Focus-first
- [ ] Principle 2: Simple UI
- [ ] Principle 3: Accessibility
- [ ] Principle 4: Performance
- [ ] Principle 5: Maintainability
- [ ] Principle 6: Privacy

## Additional Notes
[Any other context about the PR]
```

### Review Process

1. **Automated Checks:**
   - TypeScript type checking
   - ESLint code linting
   - Build verification

2. **Code Review:**
   - At least one maintainer approval required
   - Address all review comments
   - Re-request review after changes

3. **Merge:**
   - Squash and merge preferred
   - Delete branch after merge

---

## 🐛 Reporting Bugs

### Before Reporting

1. Check existing issues for duplicates
2. Verify bug exists in latest version
3. Try to reproduce in clean browser/incognito

### Bug Report Template

```markdown
## Bug Description
Clear description of the bug

## Steps to Reproduce
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- Browser: [e.g., Chrome 120]
- OS: [e.g., Windows 11, macOS 14]
- Device: [e.g., Desktop, iPhone 14]
- Version: [e.g., v1.0.0]

## Screenshots/Console Errors
[If applicable]

## Additional Context
[Any other relevant information]
```

---

## 💡 Feature Requests

### Feature Request Template

```markdown
## Feature Description
Clear description of the feature

## Problem It Solves
What problem does this solve for users?

## Proposed Solution
How should it work?

## Alternatives Considered
What other solutions did you consider?

## Constitutional Alignment
How does this align with our principles?
- Focus-first: [explanation]
- Simple UI: [explanation]
- Accessibility: [explanation]
- Performance: [explanation]
- Maintainability: [explanation]
- Privacy: [explanation]

## Additional Context
[Mockups, examples, references]
```

---

## 📚 Documentation

### When to Update Documentation

Update documentation when:
- Adding new features
- Changing existing behavior
- Adding new dependencies
- Modifying build process
- Changing deployment process

### Documentation Locations

- `README.md` - User-facing documentation
- `CONTRIBUTING.md` - This file
- `specs/` - Technical specifications
- Inline code comments - For complex logic
- JSDoc comments - For public APIs

---

## 🏗️ Architecture Guidelines

### Adding New Features

1. **Plan First:**
   - Create or update specification in `specs/`
   - Define TypeScript types
   - Plan state management needs

2. **Zustand Store:**
   - Create new slice if needed
   - Keep slices focused and minimal
   - Document state transitions

3. **Components:**
   - Start with types/interfaces
   - Build UI component
   - Add accessibility features
   - Test responsiveness

4. **localStorage:**
   - Use versioned keys (e.g., `FT_FEATURE_v1`)
   - Handle missing/corrupt data gracefully
   - Document schema in `specs/data-model.md`

### Performance Guidelines

- Bundle budget: <150KB gzipped
- Use lazy loading for modals/heavy components
- Avoid unnecessary re-renders (React.memo, useCallback)
- Optimize images (use SVG when possible)
- Minimize dependencies

---

## 🤝 Community

### Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Keep discussions focused and productive

### Getting Help

- **GitHub Issues:** Bug reports and feature requests
- **Discussions:** Questions and general discussion
- **Pull Requests:** Code review and collaboration

---

## 📄 License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

**Thank you for contributing to Focus Timer Hub! Your efforts help create a better focus tool for everyone.** 🚀

