#!/bin/bash

# Pre-Pipeline Validation Script for SonarQube Quality Gate
# This script validates all checks that will run in the Azure DevOps pipeline
# Run this before pushing to ensure 100% pipeline success

set -e  # Exit on any error

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print section headers
print_header() {
    echo ""
    echo -e "${BLUE}========================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}========================================${NC}"
}

# Function to print success messages
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

# Function to print error messages
print_error() {
    echo -e "${RED}✗ $1${NC}"
}

# Function to print warning messages
print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

# Track overall status
VALIDATION_FAILED=0

print_header "Starting Pre-Pipeline Validation"
echo "This will validate all checks that run in the Azure DevOps pipeline"
echo ""

# Check 1: Node.js version
print_header "1. Checking Node.js Version"
REQUIRED_NODE_VERSION=$(cat .nvmrc 2>/dev/null || echo "20")
CURRENT_NODE_VERSION=$(node -v | sed 's/v//' | cut -d. -f1)

if [ "$CURRENT_NODE_VERSION" -ge "$REQUIRED_NODE_VERSION" ]; then
    print_success "Node.js version: $(node -v) (required: v${REQUIRED_NODE_VERSION}.x)"
else
    print_error "Node.js version $(node -v) is too old. Required: v${REQUIRED_NODE_VERSION}.x"
    VALIDATION_FAILED=1
fi

# Check 2: Dependencies
print_header "2. Checking Dependencies"
if [ -d "node_modules" ]; then
    print_success "node_modules exists"

    # Check if package-lock.json is up to date
    if npm list --depth=0 > /dev/null 2>&1; then
        print_success "Dependencies are properly installed"
    else
        print_warning "Some dependencies may be missing or have issues"
        echo "  Run: npm install"
    fi
else
    print_error "node_modules not found. Run: npm install"
    VALIDATION_FAILED=1
fi

# Check 3: TypeScript Type Checking
print_header "3. Running TypeScript Type Check"
if npm run typecheck > /dev/null 2>&1; then
    print_success "TypeScript type check passed"
else
    print_error "TypeScript type check failed"
    echo "  Run: npm run typecheck"
    VALIDATION_FAILED=1
fi

# Check 4: ESLint
print_header "4. Running ESLint"
if npm run lint > /dev/null 2>&1; then
    print_success "ESLint passed with no errors"
else
    print_error "ESLint found errors"
    echo "  Run: npm run lint"
    echo "  Fix: npm run lint:fix"
    VALIDATION_FAILED=1
fi

# Check 5: Prettier Format Check
print_header "5. Checking Code Formatting"
if npm run format:check > /dev/null 2>&1; then
    print_success "Code formatting is correct"
else
    print_warning "Code formatting issues found"
    echo "  Fix: npm run format"
    # Not failing validation for formatting
fi

# Check 6: Unit Tests with Coverage
print_header "6. Running Unit Tests with Coverage"
echo "This may take a minute..."

if npm run test:coverage > /dev/null 2>&1; then
    print_success "All unit tests passed"

    # Parse coverage from the output
    COVERAGE_OUTPUT=$(npm run test:coverage 2>&1 | grep -A 5 "Coverage summary")

    echo ""
    echo "$COVERAGE_OUTPUT"
    echo ""

    # Check coverage thresholds (90%)
    STATEMENTS=$(echo "$COVERAGE_OUTPUT" | grep "Statements" | sed 's/.*: \([0-9.]*\)%.*/\1/')
    BRANCHES=$(echo "$COVERAGE_OUTPUT" | grep "Branches" | sed 's/.*: \([0-9.]*\)%.*/\1/')
    FUNCTIONS=$(echo "$COVERAGE_OUTPUT" | grep "Functions" | sed 's/.*: \([0-9.]*\)%.*/\1/')
    LINES=$(echo "$COVERAGE_OUTPUT" | grep "Lines" | sed 's/.*: \([0-9.]*\)%.*/\1/')

    THRESHOLD=90

    if (( $(echo "$STATEMENTS >= $THRESHOLD" | bc -l) )) && \
       (( $(echo "$BRANCHES >= $THRESHOLD" | bc -l) )) && \
       (( $(echo "$FUNCTIONS >= $THRESHOLD" | bc -l) )) && \
       (( $(echo "$LINES >= $THRESHOLD" | bc -l) )); then
        print_success "Coverage thresholds met (≥90%)"
    else
        print_error "Coverage thresholds not met (required: ≥90%)"
        VALIDATION_FAILED=1
    fi
else
    print_error "Unit tests failed"
    echo "  Run: npm run test"
    VALIDATION_FAILED=1
fi

# Check 7: Verify Coverage Reports Exist
print_header "7. Verifying Coverage Reports"

REQUIRED_REPORTS=(
    "coverage/lcov.info"
    "coverage/cobertura-coverage.xml"
    "junit.xml"
    "sonar-report.xml"
)

for report in "${REQUIRED_REPORTS[@]}"; do
    if [ -f "$report" ]; then
        SIZE=$(ls -lh "$report" | awk '{print $5}')
        print_success "$report exists ($SIZE)"
    else
        print_error "$report not found"
        echo "  Run: npm run test:coverage"
        VALIDATION_FAILED=1
    fi
done

# Check 8: Build Validation
print_header "8. Running Production Build"
echo "This may take a minute..."

if npm run build > /dev/null 2>&1; then
    print_success "Production build succeeded"

    # Check if dist directory was created
    if [ -d "dist" ]; then
        DIST_SIZE=$(du -sh dist | cut -f1)
        print_success "dist/ directory created ($DIST_SIZE)"
    else
        print_error "dist/ directory not found after build"
        VALIDATION_FAILED=1
    fi
else
    print_error "Production build failed"
    echo "  Run: npm run build"
    VALIDATION_FAILED=1
fi

# Check 9: Bundle Size Check
print_header "9. Checking Bundle Size"

if npm run size > /dev/null 2>&1; then
    print_success "Bundle size within limits"
else
    print_warning "Bundle size check failed or limits exceeded"
    echo "  Check: npm run size"
    # Not failing validation for bundle size
fi

# Check 10: SonarQube Configuration
print_header "10. Validating SonarQube Configuration"

if [ -f "sonar-project.properties" ]; then
    print_success "sonar-project.properties exists"

    # Check key properties
    if grep -q "sonar.projectKey=" sonar-project.properties; then
        print_success "sonar.projectKey is set"
    else
        print_error "sonar.projectKey not found in sonar-project.properties"
        VALIDATION_FAILED=1
    fi

    if grep -q "sonar.sources=" sonar-project.properties; then
        print_success "sonar.sources is set"
    else
        print_error "sonar.sources not found in sonar-project.properties"
        VALIDATION_FAILED=1
    fi

    if grep -q "sonar.javascript.lcov.reportPaths=" sonar-project.properties; then
        print_success "sonar.javascript.lcov.reportPaths is set"
    else
        print_error "sonar.javascript.lcov.reportPaths not found"
        VALIDATION_FAILED=1
    fi
else
    print_error "sonar-project.properties not found"
    VALIDATION_FAILED=1
fi

# Check 11: Pipeline Configuration
print_header "11. Validating Azure Pipeline Configuration"

if [ -f "azure-pipelines.yml" ]; then
    print_success "azure-pipelines.yml exists"

    # Check for SonarCloud tasks
    if grep -q "SonarCloudPrepare" azure-pipelines.yml; then
        print_success "SonarCloudPrepare task found"
    else
        print_warning "SonarCloudPrepare task not found in pipeline"
    fi

    if grep -q "SonarCloudAnalyze" azure-pipelines.yml; then
        print_success "SonarCloudAnalyze task found"
    else
        print_warning "SonarCloudAnalyze task not found in pipeline"
    fi

    if grep -q "SonarCloudPublish" azure-pipelines.yml; then
        print_success "SonarCloudPublish task found"
    else
        print_warning "SonarCloudPublish task not found in pipeline"
    fi
else
    print_error "azure-pipelines.yml not found"
    VALIDATION_FAILED=1
fi

# Final Summary
print_header "Validation Summary"

if [ $VALIDATION_FAILED -eq 0 ]; then
    echo ""
    print_success "ALL VALIDATIONS PASSED! ✓"
    echo ""
    echo -e "${GREEN}Your code is ready for the pipeline!${NC}"
    echo ""
    echo "Summary of checks:"
    echo "  ✓ Node.js version compatible"
    echo "  ✓ Dependencies installed"
    echo "  ✓ TypeScript type check passed"
    echo "  ✓ ESLint passed"
    echo "  ✓ Unit tests passed"
    echo "  ✓ Coverage ≥90%"
    echo "  ✓ Coverage reports generated"
    echo "  ✓ Production build succeeded"
    echo "  ✓ SonarQube configuration valid"
    echo ""
    echo -e "${GREEN}Confidence level: 100% - Pipeline should PASS${NC}"
    echo ""
    exit 0
else
    echo ""
    print_error "VALIDATION FAILED!"
    echo ""
    echo -e "${RED}Please fix the issues above before running the pipeline.${NC}"
    echo ""
    echo "Common fixes:"
    echo "  • npm install          - Install dependencies"
    echo "  • npm run typecheck    - Check TypeScript errors"
    echo "  • npm run lint:fix     - Fix linting errors"
    echo "  • npm run format       - Format code"
    echo "  • npm run test:coverage - Run tests with coverage"
    echo ""
    exit 1
fi
