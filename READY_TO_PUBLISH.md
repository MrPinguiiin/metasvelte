# 🚀 MetaSvelte - Ready to Publish!

Library Anda sudah siap untuk di-publish ke npm! Berikut langkah-langkah singkatnya:

## 📝 Langkah Cepat (5 Menit)

### 1. Update Informasi Anda

Edit `package.json` dan ganti:

```json
{
	"name": "metasvelte", // Ganti jika nama sudah dipakai
	"author": "Your Name <your.email@example.com>", // ← Ganti ini
	"repository": {
		"url": "git+https://github.com/yourusername/metasvelte.git" // ← Ganti ini
	},
	"homepage": "https://github.com/yourusername/metasvelte#readme", // ← Ganti ini
	"bugs": {
		"url": "https://github.com/yourusername/metasvelte/issues" // ← Ganti ini
	}
}
```

### 2. Check Nama Package

```bash
npm search metasvelte
```

Jika nama sudah dipakai, gunakan:

- `@yourusername/metasvelte` (scoped package - recommended)
- `metasvelte-seo`
- `sveltekit-meta`
- atau nama lain yang unik

### 3. Run Pre-Publish Check

```bash
npm run pre-publish
```

Script ini akan check:

- ✅ package.json sudah di-update
- ✅ TypeScript check
- ✅ Linting
- ✅ Build package
- ✅ Dry run publish

### 4. Login ke npm

```bash
npm login
```

Jika belum punya account, daftar di: https://www.npmjs.com/signup

### 5. Publish!

```bash
npm publish
```

Atau untuk scoped package:

```bash
npm publish --access public
```

### 6. Verify

```bash
npm view metasvelte
```

## 🎉 Done!

Package Anda sekarang live di npm!

Users bisa install dengan:

```bash
npm install metasvelte
```

## 📚 Dokumentasi Lengkap

- [PUBLISHING.md](./PUBLISHING.md) - Panduan lengkap publishing
- [PUBLISH_CHECKLIST.md](./PUBLISH_CHECKLIST.md) - Quick checklist
- [scripts/README.md](./scripts/README.md) - Helper scripts

## 🔄 Update Version

Untuk publish update di masa depan:

```bash
# Update version
npm version patch  # 1.0.0 -> 1.0.1

# Commit & push
git push && git push --tags

# Publish
npm publish
```

## 💡 Tips

1. **Enable 2FA** di npm account untuk security
2. **Create GitHub Release** setelah publish
3. **Share** di social media (Twitter, Reddit, Discord)
4. **Add badges** ke README.md
5. **Write blog post** tentang library Anda

## 🐛 Troubleshooting

**Nama package sudah dipakai?**
→ Gunakan scoped package: `@yourusername/metasvelte`

**Email belum verified?**
→ Check email dan verify di npmjs.com

**Permission denied?**
→ Run `npm logout` lalu `npm login` lagi

## 📞 Need Help?

- [npm Documentation](https://docs.npmjs.com/)
- [SvelteKit Packaging](https://kit.svelte.dev/docs/packaging)
- [npm Support](https://www.npmjs.com/support)

---

**Good luck with your first npm package! 🚀**
