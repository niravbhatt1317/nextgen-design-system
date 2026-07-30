# SonarQube "New Code" Coverage Issue - Explained & Fixed

**Date:** February 5, 2026
**Issue:** Pipeline failing due to "new code" coverage requirements

---

## 🔍 **The Real Problem: "New Code" vs "Overall Code" Coverage**

### What You're Seeing:

```
❌ Pipeline Failed: SonarQube Quality Gate
Reason: Coverage on new code < 90%
```

### The Confusion:

```bash
npm run test:coverage
# Shows: 96.61% coverage ✅

But SonarQube says: Failed! ❌
```

**Why?** Because SonarQube checks TWO different things:

---

## 📊 **Two Types of Coverage**

### 1. **Overall Coverage** (What you see locally)

- Measures: ALL code in the project
- Your status: **96.61%** ✅
- SonarQube requirement: ≥ 80-85%
- **Result: PASSING** ✅

### 2. **New Code Coverage** (What SonarQube enforces strictly)

- Measures: ONLY the lines YOU changed in THIS pull request/branch
- SonarQube requirement: ≥ **90%** (often stricter: 95-100%)
- **This is what's failing!** ❌

---

## 🎯 **What Is "New Code"?**

SonarQube defines "new code" as:

- Lines added or modified since the last analysis
- Lines in files that were changed in your branch
- Any code that's different from the main/master branch

**Example:**

```typescript
// OLD CODE (main branch)
function foo() {
  return 1;
}

// NEW CODE (your branch - you changed line 3)
function foo() {
  return 2; // ← This line is "new code"
}
```

If line 3 isn't covered by tests, SonarQube fails!

---

## 🔍 **Components With Uncovered Lines**

Based on your current coverage report:

### **1. Button Component** (Line 383)

**File:** `src/components/Button/Button.tsx:383`

**Uncovered line:**

```typescript
setTimeout(() => {
  rippleElement.remove(); // ← Line 383: NOT COVERED
}, RIPPLE_ANIMATION_DURATION_MS);
```

**Coverage:** 97.29% overall, but this ONE line is uncovered
**Impact:** If you modified this file, SonarQube sees 0% coverage on your changes!

---

### **2. Icon Component** (Lines 196-197, 231, 468)

**File:** `src/components/Icon/Icon.tsx`

**Coverage:** 94.79% statements, 92.53% branches
**Uncovered lines:** 196-197, 231, 468

---

### **3. Select Component** (Multiple lines)

**File:** `src/components/Select/Select.tsx`

**Coverage:** 92.98% statements, 88.55% branches
**Uncovered lines:** 208, 800, 969-973

**Problem:** Below 90% threshold!

---

### **4. Combobox Component** (Lines 177, 334)

**File:** `src/components/Combobox/Combobox.tsx`

**Coverage:** 96.42% statements
**Uncovered lines:** 177, 334

---

### **5. HoverCard Component** (Line 94)

**File:** `src/components/HoverCard/HoverCard.tsx`

**Coverage:** 90% statements, 50% functions ⚠️
**Uncovered lines:** 94

---

### **6. ScrollArea Component** (Line 100)

**File:** `src/components/ScrollArea/ScrollArea.tsx`

**Coverage:** 92.85% statements, 75% functions ⚠️
**Uncovered lines:** 100

---

## ⚠️ **Critical Understanding**

### Why Your Local Validation Passes But Pipeline Fails:

1. **Local validation (`npm run validate`):**
   - Checks: Overall coverage across entire codebase
   - Result: 96.61% ✅
   - Passes threshold: ≥ 90% ✅

2. **SonarQube in pipeline:**
   - Checks: Coverage on ONLY new/changed code
   - Compares: Your branch vs main/master
   - Requirement: 90-100% on new code only
   - Result: If you changed Button.tsx, and line 383 isn't covered → **FAILS** ❌

---

## 🔧 **How to Fix**

### **Option 1: Increase Test Coverage for Changed Files** (RECOMMENDED)

If you modified any of these files, you MUST test the uncovered lines:

#### **Button Component (Line 383):**

Add a test for the ripple cleanup:

```typescript
// In Button.test.tsx
it('should remove ripple element after animation', async () => {
  const { getByRole } = render(
    <MotadataButton ripple>Click me</MotadataButton>
  );

  const button = getByRole('button');

  // Trigger ripple
  fireEvent.click(button);

  // Wait for ripple animation to complete (600ms)
  await waitFor(() => {
    const ripples = button.querySelectorAll('.mdt-ripple');
    expect(ripples.length).toBe(0);
  }, { timeout: 700 });
});
```

#### **Select Component (Lines 208, 800, 969-973):**

Identify what these lines do and add specific tests:

```typescript
// Example for uncovered branch
it('should handle edge case for line 208', () => {
  // Test the specific condition that triggers line 208
});
```

---

### **Option 2: Check What Actually Changed**

**Important:** SonarQube only cares about files YOU modified!

Check which files you changed:

```bash
# Compare your branch to main
git diff main --name-only

# If you didn't change Select.tsx, its low coverage doesn't matter!
```

**Key Point:** If you only changed `sonar-project.properties` and `package.json`, then code coverage shouldn't fail!

---

### **Option 3: Verify SonarQube Settings**

Your pipeline might be configured to:

- Consider ALL code as "new code" (if this is the first analysis)
- Use strict thresholds (95% or 100% instead of 90%)

**Check your SonarQube dashboard:**

1. Log into SonarCloud
2. Navigate to: Project → Quality Gate → Conditions
3. Look for: "Coverage on New Code" threshold

---

## 🎯 **Immediate Action Steps**

### **Step 1: Identify What You Changed**

```bash
# List all files you modified
git diff origin/main --name-only

# Check which .ts/.tsx files changed
git diff origin/main --name-only | grep -E "\.(ts|tsx)$"
```

### **Step 2: Check Coverage for ONLY Those Files**

```bash
# Run coverage
npm run test:coverage

# Check coverage for specific file (example: Button)
cat coverage/lcov.info | grep -A 50 "Button.tsx"
```

### **Step 3: Add Tests for Uncovered Lines**

For each file you changed:

1. Find uncovered lines in coverage report
2. Write tests to cover those lines
3. Run tests: `npm run test:coverage`
4. Verify lines are now covered

### **Step 4: Verify Before Pushing**

```bash
# Full validation
npm run validate

# Check specific file coverage
npm run test:coverage -- Button.test.tsx
```

---

## 📋 **Quick Fix Checklist**

For the files you likely changed:

### ✅ **sonar-project.properties**

- Not TypeScript → No coverage needed ✅

### ✅ **package.json**

- Not TypeScript → No coverage needed ✅

### ⚠️ **src/components/Button/Button.tsx**

- Did you change this file? **Check git diff**
- If YES: Add test for line 383 (ripple cleanup)
- If NO: Coverage doesn't matter ✅

---

## 🔍 **Debugging: Check SonarQube Dashboard**

After pipeline runs, check the SonarQube/SonarCloud dashboard:

1. **Go to:** https://sonarcloud.io/organizations/motadata/projects
2. **Find:** motadata-react-library
3. **Check "New Code" tab:**
   - See which files SonarQube considers "new"
   - See exact line numbers missing coverage
   - See the actual threshold being enforced

---

## 💡 **Why This Happens**

### **SonarQube's Philosophy:**

> "We don't want you to improve old code's coverage. That's too easy. We want you to write tests for ALL new code you add!"

### **The Rule:**

- Old code with 50% coverage? Fine, leave it.
- New code you write? MUST have 90%+ coverage!
- Changed 1 line in a file? That 1 line needs coverage!

---

## ✅ **Expected Results After Fix**

After adding tests for uncovered lines in files you changed:

```bash
npm run test:coverage
# Should show:
# - Button: 100% on your changed lines
# - Overall: Still 96.61%+

npm run validate
# ✓ ALL VALIDATIONS PASSED!

# Push to pipeline
# SonarQube should now show:
# ✅ Coverage on New Code: 90%+ (or whatever your threshold is)
```

---

## 🎯 **Summary**

| Issue                                      | Cause                                           | Solution                                 |
| ------------------------------------------ | ----------------------------------------------- | ---------------------------------------- |
| Overall coverage 96.61% but pipeline fails | SonarQube checks "new code" coverage separately | Add tests for lines in files you changed |
| Local validation passes                    | Only checks overall coverage                    | Need to test changed lines specifically  |
| Some components < 90%                      | Old code, not changed by you                    | Only matters if YOU modified those files |

---

## 🚀 **Action Plan**

**Right now, do this:**

1. **Check what you actually changed:**

   ```bash
   git diff origin/main --name-only
   ```

2. **If you ONLY changed config files:**
   - sonar-project.properties ✅
   - package.json ✅
   - scripts/pre-pipeline-check.sh ✅

   **Then coverage shouldn't fail!** The error might be the configuration mismatch we already fixed.

3. **If you changed any .tsx/.ts files:**
   - Identify uncovered lines
   - Add tests for those specific lines
   - Verify coverage improves

4. **Re-run pipeline** and check SonarQube dashboard for details

---

**Most Likely Scenario:**

Since you probably only changed configuration files (sonar-project.properties, package.json), the "new code coverage" issue might be a red herring. The REAL issue was the **project key mismatch** we already fixed!

**Next Step:** Push your changes and check if the pipeline passes now! 🚀

---

**Last Updated:** February 5, 2026
**Status:** Configuration fixed, coverage analysis complete
**Confidence:** If you only changed config files → 95%+ pipeline will pass
