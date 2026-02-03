# Consumer Profile MFE

A modern React application with TypeScript, Redux Toolkit, and Cypress E2E testing for managing consumer profiles.

## 🚀 Tech Stack

- **React 19.2** - UI library
- **TypeScript 5.9** - Type safety
- **Redux Toolkit 2.11** - State management
- **Vite 7.2** - Build tool and dev server
- **Cypress 15.9** - E2E and component testing
- **ESLint** - Code linting

## 📦 Project Structure

```
consumer-profile-mfe/
├── src/
│   ├── features/
│   │   └── userProfile/
│   │       └── userProfileSlice.ts    # User profile Redux slice
│   ├── store/
│   │   ├── store.ts                   # Redux store configuration
│   │   └── hooks.ts                   # Typed Redux hooks
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── cypress/
│   ├── e2e/
│   │   └── app.cy.ts                  # E2E tests
│   ├── support/
│   │   ├── commands.ts                # Custom Cypress commands
│   │   ├── e2e.ts                     # E2E support file
│   │   └── component.ts               # Component testing support
│   └── fixtures/                      # Test data
├── cypress.config.ts                   # Cypress configuration
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🛠️ Installation

```bash
# Install dependencies
npm install
```

## 🏃 Development

```bash
# Start development server (runs on http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🧪 Testing with Cypress

### Interactive Mode (Recommended for Development)

```bash
# Open Cypress Test Runner
npm run cypress:open
```

This opens the Cypress UI where you can:
- Choose between E2E and Component testing
- Select browser (Chrome, Firefox, Edge)
- Run tests interactively with live reload
- Debug tests with DevTools

### Headless Mode (CI/CD)

```bash
# Run all tests headlessly
npm run cypress:run

# Run with specific browser
npm run cypress:run:chrome
npm run cypress:run:firefox
```

### Automated E2E Testing

```bash
# Starts dev server, runs tests, then stops server
npm run test:e2e

# Same as above but opens Cypress UI
npm run test:e2e:headed
```

## 📋 Redux Store Structure

### User Profile State

The application includes a pre-configured user profile Redux slice with:

**State Shape:**
```typescript
{
  status: ProfileStatus;        // IDLE | LOADING | LOADED | EDITING | SAVING | ERROR
  profile: UserProfile | null;
  originalProfile: UserProfile | null;
  isEditing: boolean;
  isSaving: boolean;
  validationErrors: ValidationError[];
  error: string | null;
  lastSavedAt: string | null;
}
```

**Actions:**
- `fetchUserProfile(userId)` - Async thunk to load profile
- `saveUserProfile(profile)` - Async thunk to save changes
- `startEditing()` - Enable edit mode
- `cancelEditing()` - Cancel and revert changes
- `updateField({ field, value })` - Update a profile field
- `setValidationErrors(errors)` - Set validation errors
- `clearError()` - Clear error state

### Using Redux Hooks

```typescript
import { useAppDispatch, useAppSelector } from './store/hooks';

function MyComponent() {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(state => state.userProfile.profile);

  // Fetch user profile
  dispatch(fetchUserProfile('user-123'));

  // Start editing
  dispatch(startEditing());

  // Update field
  dispatch(updateField({ field: 'firstName', value: 'John' }));

  // Save changes
  dispatch(saveUserProfile(profile));
}
```

## 🧪 Cypress Custom Commands

### getByTestId
Get element by data-testid attribute:
```typescript
cy.getByTestId('submit-button').click();
```

### login
Reusable login command with session caching:
```typescript
cy.login('user@example.com', 'password');
```

## 📝 Writing Tests

### E2E Test Example

Create a file in `cypress/e2e/`:

```typescript
describe('User Profile', () => {
  beforeEach(() => {
    cy.visit('/profile/user-123');
  });

  it('should load user profile', () => {
    cy.getByTestId('profile-container').should('be.visible');
    cy.getByTestId('profile-first-name').should('contain', 'John');
  });

  it('should validate first name', () => {
    cy.getByTestId('edit-button').click();
    cy.getByTestId('input-firstName').clear().type('J');
    cy.getByTestId('input-lastName').focus();
    cy.getByTestId('error-firstName')
      .should('contain', 'First name must be at least 2 characters');
  });
});
```

### Component Test Example

Create a file in `src/components/`:

```typescript
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    cy.mount(<MyComponent name="Test" />);
    cy.contains('Test').should('be.visible');
  });
});
```

## 🎯 Specification-Driven Development

This project follows Specification-Driven Development (SDD) principles:

1. **Write Specifications First** - Define requirements, edge cases, and validation rules
2. **Write Tests from Specs** - Create Cypress tests that verify each specification
3. **Implement to Pass Tests** - Build features to satisfy test requirements
4. **Maintain Traceability** - Each test maps back to a specific requirement

### Example: Field Validation

**Specification:**
```yaml
firstName:
  Min: 2 characters
  Max: 50 characters
  Pattern: Letters, spaces, hyphens only
  Error: "First name must be 2-50 characters..."
```

**Cypress Test:**
```typescript
it('should reject first name with 1 character', () => {
  cy.getByTestId('input-firstName').clear().type('J');
  cy.getByTestId('error-firstName')
    .should('contain', 'First name must be at least 2 characters');
});
```

## 🔧 Configuration Files

### cypress.config.ts
- E2E tests run against `http://localhost:5173`
- Viewport: 1280x720
- Video recording disabled (enable for CI/CD)
- Screenshots on failure enabled

### tsconfig.json
TypeScript configuration for React with strict type checking

### vite.config.ts
Vite configuration with React plugin

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org)
- [Cypress Documentation](https://docs.cypress.io)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Vite Documentation](https://vite.dev)

## 🤝 Contributing

1. Follow the existing code structure
2. Write tests for new features
3. Ensure all tests pass before committing
4. Use TypeScript for type safety
5. Follow the SDD approach: Spec → Test → Implementation

## 📄 License

MIT

---

**Built with ❤️ using Specification-Driven Development**
