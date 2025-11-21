# Panduan Publishing MetaSvelte ke npm

Panduan lengkap untuk publish library MetaSvelte ke npm registry.

## 📋 Prerequisites

1. **npm Account**
   - Buat account di https://www.npmjs.com/signup
   - Verifikasi email Anda

2. **Git Repository**
   - Push code ke GitHub/GitLab
   - Pastikan repository public (atau private jika npm paid account)

3. **Node.js & npm**
   - Pastikan sudah terinstall
   - Check version: `node -v` dan `npm -v`

## 🚀 Langkah-langkah Publishing

### 1. Update Informasi Package

Edit `package.json`:

```json
{
	"name": "metasvelte", // Ganti jika nama sudah dipakai
	"version": "1.0.0",
	"author": "Nama Anda <email@example.com>",
	"repository": {
		"type": "git",
		"url": "git+https://github.com/username/metasvelte.git"
	}
}
```

**Penting:** Check apakah nama package sudah dipakai:

```bash
npm search metasvelte
```

Jika sudah dipakai, gunakan nama lain seperti:

- `@yourusername/metasvelte` (scoped package)
- `metasvelte-seo`
- `sveltekit-meta`

### 2. Test Build

Pastikan library bisa di-build tanpa error:

```bash
npm run package
```

Ini akan:

- Sync SvelteKit
- Build library ke folder `dist/`
- Run `publint` untuk check package quality

Check folder `dist/` untuk memastikan semua file ada:

```
dist/
├── index.js
├── index.d.ts
├── components/
│   └── SeoHead.svelte
├── server/
│   ├── index.js
│   └── index.d.ts
└── ...
```

### 3. Test Locally (Optional)

Test package secara local sebelum publish:

```bash
# Di folder metasvelte
npm pack

# Ini akan create file metasvelte-1.0.0.tgz
# Install di project lain untuk test
cd ../test-project
npm install ../metasvelte/metasvelte-1.0.0.tgz
```

### 4. Login ke npm

```bash
npm login
```

Masukkan:

- Username
- Password
- Email
- OTP (jika 2FA enabled)

Verify login:

```bash
npm whoami
```

### 5. Publish ke npm

**Dry run** (check apa yang akan di-publish):

```bash
npm publish --dry-run
```

**Publish for real:**

```bash
npm publish
```

Untuk **scoped package** (jika menggunakan @username/metasvelte):

```bash
npm publish --access public
```

### 6. Verify Publication

Check di npm:

```bash
npm view metasvelte
```

Atau buka: https://www.npmjs.com/package/metasvelte

## 🔄 Update Version

Untuk publish update:

### 1. Update Version

```bash
# Patch (1.0.0 -> 1.0.1) - bug fixes
npm version patch

# Minor (1.0.0 -> 1.1.0) - new features
npm version minor

# Major (1.0.0 -> 2.0.0) - breaking changes
npm version major
```

### 2. Update CHANGELOG.md

Tambahkan perubahan di `CHANGELOG.md`:

```markdown
## [1.0.1] - 2024-01-20

### Fixed

- Fix hydration markers issue
- Improve type definitions

### Added

- Server-side rendering support
```

### 3. Commit & Push

```bash
git add .
git commit -m "Release v1.0.1"
git push
git push --tags
```

### 4. Publish Update

```bash
npm publish
```

## 📦 Package Checklist

Sebelum publish, pastikan:

- ✅ `package.json` sudah benar (name, version, author, repository)
- ✅ `README.md` lengkap dengan contoh penggunaan
- ✅ `LICENSE` file ada (MIT)
- ✅ `CHANGELOG.md` up to date
- ✅ Build berhasil (`npm run package`)
- ✅ No TypeScript errors (`npm run check`)
- ✅ Linting passed (`npm run lint`)
- ✅ `.npmignore` configured
- ✅ Git repository clean (no uncommitted changes)
- ✅ Git tags created

## 🏷️ Naming Best Practices

### Good Names:

- `metasvelte` ✅
- `sveltekit-seo` ✅
- `@yourusername/metasvelte` ✅
- `svelte-meta-tags` ✅

### Avoid:

- `meta` ❌ (too generic)
- `seo` ❌ (too generic)
- `MetaSvelte` ❌ (use lowercase)
- `meta_svelte` ❌ (use dash, not underscore)

## 🔐 Security

### Enable 2FA (Recommended)

```bash
npm profile enable-2fa auth-and-writes
```

### Use npm Tokens for CI/CD

Jangan commit npm credentials. Gunakan tokens:

```bash
npm token create --read-only
```

## 📊 Post-Publishing

### 1. Add Badges to README

```markdown
[![npm version](https://img.shields.io/npm/v/metasvelte.svg)](https://www.npmjs.com/package/metasvelte)
[![npm downloads](https://img.shields.io/npm/dm/metasvelte.svg)](https://www.npmjs.com/package/metasvelte)
[![license](https://img.shields.io/npm/l/metasvelte.svg)](https://github.com/yourusername/metasvelte/blob/main/LICENSE)
```

### 2. Create GitHub Release

- Go to GitHub repository
- Click "Releases" → "Create a new release"
- Tag: `v1.0.0`
- Title: `v1.0.0 - Initial Release`
- Description: Copy from CHANGELOG.md

### 3. Share!

- Tweet about it
- Post di Reddit (r/sveltejs)
- Share di Discord (Svelte community)
- Write blog post

## 🐛 Troubleshooting

### Error: "Package name already exists"

Gunakan scoped package:

```json
{
	"name": "@yourusername/metasvelte"
}
```

Publish dengan:

```bash
npm publish --access public
```

### Error: "You must verify your email"

Check email dan verify account di npmjs.com

### Error: "You do not have permission to publish"

Login dengan account yang benar:

```bash
npm logout
npm login
```

### Error: "Package.json is invalid"

Run validation:

```bash
npm run package
publint
```

## 📚 Resources

- [npm Documentation](https://docs.npmjs.com/)
- [SvelteKit Packaging](https://kit.svelte.dev/docs/packaging)
- [Semantic Versioning](https://semver.org/)
- [npm Best Practices](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)

## 🎉 Success!

Setelah publish, package Anda bisa diinstall oleh siapa saja:

```bash
npm install metasvelte
```

Selamat! 🚀
