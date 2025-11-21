# Scripts

Helper scripts untuk development dan publishing.

## pre-publish.sh

Script untuk validasi sebelum publish ke npm.

### Usage

```bash
./scripts/pre-publish.sh
```

### What it checks

- ✅ package.json sudah di-update (author, repository)
- ✅ Git status clean
- ✅ TypeScript check passed
- ✅ Linting passed
- ✅ Package build successful
- ✅ dist folder complete
- ✅ npm publish dry-run

### After running

Jika semua check passed, Anda bisa publish dengan:

```bash
npm publish
```

Atau untuk scoped package:

```bash
npm publish --access public
```
