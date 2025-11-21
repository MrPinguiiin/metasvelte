# 📋 Quick Publish Checklist

Checklist cepat sebelum publish ke npm.

## Pre-Publishing

```bash
# 1. Update package.json
# - Ganti "Your Name" dengan nama Anda
# - Ganti "yourusername" dengan username GitHub Anda
# - Ganti email dengan email Anda
# - Check apakah nama package sudah dipakai: npm search metasvelte

# 2. Test build
npm run package

# 3. Check TypeScript
npm run check

# 4. Check linting
npm run lint

# 5. Test locally (optional)
npm pack
# Install di project lain untuk test

# 6. Commit semua changes
git add .
git commit -m "Prepare for v1.0.0 release"
git push

# 7. Create git tag
git tag v1.0.0
git push --tags
```

## Publishing

```bash
# 1. Login ke npm (jika belum)
npm login

# 2. Verify login
npm whoami

# 3. Dry run (check apa yang akan di-publish)
npm publish --dry-run

# 4. Publish!
npm publish

# Jika scoped package (@username/metasvelte):
npm publish --access public
```

## Post-Publishing

```bash
# 1. Verify
npm view metasvelte

# 2. Test install
cd /tmp
mkdir test-metasvelte
cd test-metasvelte
npm init -y
npm install metasvelte

# 3. Create GitHub Release
# - Go to GitHub → Releases → New Release
# - Tag: v1.0.0
# - Title: v1.0.0 - Initial Release
# - Copy description from CHANGELOG.md

# 4. Share!
# - Twitter
# - Reddit r/sveltejs
# - Discord Svelte community
```

## Quick Commands

```bash
# Update version
npm version patch  # 1.0.0 -> 1.0.1
npm version minor  # 1.0.0 -> 1.1.0
npm version major  # 1.0.0 -> 2.0.0

# Publish update
git push && git push --tags
npm publish

# Unpublish (dalam 72 jam)
npm unpublish metasvelte@1.0.0

# Deprecate version
npm deprecate metasvelte@1.0.0 "Use version 1.0.1 instead"
```

## Common Issues

**Package name taken?**

```bash
# Use scoped package
# Change "name" in package.json to "@yourusername/metasvelte"
npm publish --access public
```

**Email not verified?**

```bash
# Check email and verify at npmjs.com
```

**Permission denied?**

```bash
npm logout
npm login
```

## Done! 🎉

Your package is now live at:

- npm: https://www.npmjs.com/package/metasvelte
- GitHub: https://github.com/yourusername/metasvelte

Users can install with:

```bash
npm install metasvelte
```
