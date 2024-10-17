var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Pages from 'vite-plugin-pages';
import { primitivesPackagesAlias } from '../../scripts/output';
var resolve = function (val) { return new URL(val, import.meta.url).pathname; };
// Функция для рекурсивного поиска всех файлов index.ts в папке src
function findComponentsEntryPoints(dir, baseDir) {
    if (baseDir === void 0) { baseDir = ''; }
    var entries = {};
    var files = fs.readdirSync(dir);
    files.forEach(function (file) {
        var fullPath = path.join(dir, file);
        var relativePath = path.join(baseDir, file);
        var stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            Object.assign(entries, findComponentsEntryPoints(fullPath, relativePath));
        }
        else if (file === 'index.ts') {
            var name_1 = "".concat(path.relative('.', path.dirname(fullPath)).replace('src/', ''), "/index");
            entries[name_1] = fullPath;
        }
    });
    return entries;
}
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        Pages(),
    ],
    server: {
        fs: {
            // Allow serving files from two level up to the project root
            allow: ['..'],
        },
    },
    build: {
        watch: {
            include: ['../components/**'],
        },
    },
    resolve: {
        alias: __spreadArray([], primitivesPackagesAlias('./src', resolve), true),
    },
});
