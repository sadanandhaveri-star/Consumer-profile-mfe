# Quick Start Guide - Consumer Profile MFE

## ✅ Project Successfully Created!

Your React + TypeScript + Redux + Cypress project is ready to go!

## 🚀 Get Started in 3 Steps

### 1. Navigate to the project directory
```bash
cd consumer-profile-mfe
```

### 2. Start the development server
```bash
npm run dev
```
The app will open at [http://localhost:5173](http://localhost:5173)

### 3. Open Cypress in another terminal
```bash
npm run cypress:open
```

## 📂 What's Included

✅ **React 19.2** with TypeScript 5.9
✅ **Redux Toolkit** with pre-configured store
✅ **Cypress 15.9** for E2E testing
✅ **Vite 7.2** for fast development
✅ **User Profile Redux Slice** (ready to use)
✅ **Sample Cypress Tests**
✅ **Custom Cypress Commands** (getByTestId, login)
✅ **TypeScript strict mode enabled**

## 📋 Key Files Created

```
src/
├── store/
│   ├── store.ts           # Redux store configuration
│   └── hooks.ts           # useAppDispatch, useAppSelector
├── features/
│   └── userProfile/
│       └── userProfileSlice.ts  # Complete user profile state management

cypress/
├── e2e/
│   └── app.cy.ts          # Sample E2E tests
├── support/
│   ├── commands.ts        # Custom Cypress commands
│   ├── e2e.ts            # E2E test configuration
│   └── component.ts       # Component test configuration

cypress.config.ts          # Cypress configuration
```

## 🧪 Run Tests

### Interactive Mode (Recommended)
```bash
npm run cypress:open
```
Then:
1. Click "E2E Testing"
2. Choose your browser (Chrome recommended)
3. Click on "app.cy.ts" to run tests

### Headless Mode (CI/CD)
```bash
npm run cypress:run
```

### Automated Testing
```bash
# Starts dev server, runs tests, stops server
npm run test:e2e
```

## 📚 Using Redux

The project includes a complete User Profile Redux slice. Here's how to use it:

```typescript
import { useAppDispatch, useAppSelector } from './store/hooks';
import {
  fetchUserProfile,
  startEditing,
  updateField,
  saveUserProfile
} from './features/userProfile/userProfileSlice';

function MyComponent() {
  const dispatch = useAppDispatch();
  const { profile, isEditing, status } = useAppSelector(
    state => state.userProfile
  );

  // Load profile
  useEffect(() => {
    dispatch(fetchUserProfile('user-123'));
  }, [dispatch]);

  // Start editing
  const handleEdit = () => {
    dispatch(startEditing());
  };

  // Update field
  const handleChange = (field: string, value: string) => {
    dispatch(updateField({ field, value }));
  };

  // Save changes
  const handleSave = () => {
    if (profile) {
      dispatch(saveUserProfile(profile));
    }
  };

  return (
    <div>
      {status === 'LOADING' && <p>Loading...</p>}
      {profile && (
        <>
          <h1>{profile.firstName} {profile.lastName}</h1>
          {isEditing ? (
            <button onClick={handleSave}>Save</button>
          ) : (
            <button onClick={handleEdit}>Edit</button>
          )}
        </>
      )}
    </div>
  );
}
```

## 🧪 Writing Cypress Tests

Use the custom `getByTestId` command:

```typescript
describe('My Feature', () => {
  it('should work correctly', () => {
    cy.visit('/');
    cy.getByTestId('my-button').click();
    cy.getByTestId('result').should('contain', 'Success');
  });
});
```

## 🎯 Next Steps

1. **Create Components** - Build your UI components in `src/components/`
2. **Add More Redux Slices** - Create slices in `src/features/`
3. **Write Tests First** - Follow Specification-Driven Development
4. **Add API Integration** - Update API URLs in userProfileSlice.ts
5. **Add Routing** - Install React Router if needed: `npm install react-router-dom`

## 📖 Full Documentation

See [README.md](./README.md) for complete documentation including:
- Project structure details
- Redux state management guide
- Cypress testing strategies
- Specification-Driven Development approach
- Configuration details

## 🐛 Troubleshooting

### Port 5173 already in use?
```bash
# Kill the process using the port or change port in vite.config.ts
```

### Cypress won't open?
```bash
# Clear Cypress cache and reinstall
npx cypress cache clear
npm install -D cypress
```

### TypeScript errors?
```bash
# Restart TypeScript server in VS Code
# Ctrl+Shift+P → "TypeScript: Restart TS Server"
```

## 💡 Pro Tips

1. **Use TypeScript** - The project is configured for strict type checking
2. **Use Redux Hooks** - Always use `useAppDispatch` and `useAppSelector`
3. **Use data-testid** - Add `data-testid` attributes for Cypress testing
4. **Write Tests First** - Follow the SDD approach outlined in README.md
5. **Hot Reload** - Both Vite and Cypress support hot reload during development

## 🎉 Happy Coding!

You're all set! Start building amazing features with confidence.

For questions or issues, check:
- [README.md](./README.md) - Full documentation
- [Cypress Docs](https://docs.cypress.io)
- [Redux Toolkit Docs](https://redux-toolkit.js.org)
- [React Docs](https://react.dev)

---

**Project created with Specification-Driven Development in mind** 🚀
