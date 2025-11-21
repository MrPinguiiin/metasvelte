#!/bin/bash

# Pre-publish validation script
# Run this before publishing to npm

set -e

echo "🔍 Running pre-publish checks..."
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if package.json has been updated
echo "📦 Checking package.json..."
if grep -q "Your Name" package.json; then
    echo -e "${RED}❌ Please update 'author' in package.json${NC}"
    exit 1
fi

if grep -q "yourusername" package.json; then
    echo -e "${RED}❌ Please update 'repository' URL in package.json${NC}"
    exit 1
fi

echo -e "${GREEN}✅ package.json looks good${NC}"
echo ""

# Check if git is clean
echo "🔍 Checking git status..."
if [[ -n $(git status -s) ]]; then
    echo -e "${YELLOW}⚠️  You have uncommitted changes${NC}"
    git status -s
    echo ""
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
else
    echo -e "${GREEN}✅ Git is clean${NC}"
fi
echo ""

# Run type check
echo "🔍 Running TypeScript check..."
npm run check
echo -e "${GREEN}✅ TypeScript check passed${NC}"
echo ""

# Run linting
echo "🔍 Running linter..."
npm run lint
echo -e "${GREEN}✅ Linting passed${NC}"
echo ""

# Build package
echo "📦 Building package..."
npm run package
echo -e "${GREEN}✅ Package built successfully${NC}"
echo ""

# Check dist folder
echo "🔍 Checking dist folder..."
if [ ! -d "dist" ]; then
    echo -e "${RED}❌ dist folder not found${NC}"
    exit 1
fi

if [ ! -f "dist/index.js" ]; then
    echo -e "${RED}❌ dist/index.js not found${NC}"
    exit 1
fi

if [ ! -f "dist/index.d.ts" ]; then
    echo -e "${RED}❌ dist/index.d.ts not found${NC}"
    exit 1
fi

echo -e "${GREEN}✅ dist folder looks good${NC}"
echo ""

# Dry run
echo "🔍 Running npm publish --dry-run..."
npm publish --dry-run
echo ""

echo -e "${GREEN}✅ All checks passed!${NC}"
echo ""
echo "Ready to publish! Run:"
echo "  npm publish"
echo ""
echo "Or for scoped package:"
echo "  npm publish --access public"
