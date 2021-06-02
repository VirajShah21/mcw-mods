class IOError extends Error {
    constructor(message) {
        super(message);
        this.name = 'IOError';
    }
}

/**
 * LocalStorage File System
 * The file system driver for virtualizing filesystems for the local web.
 *
 * @class LSFS
 */
class LSFS {
    constructor(cwd) {
        this.cwd = cwd || '/';
        this.root = LSFS.tree();
    }

    tree() {
        return LSFS.ls(this.cwd);
    }

    static tree() {
        return JSON.parse(localStorage.getItem('lsfs'));
    }

    static setFs(filesystem) {
        localStorage.setItem('lsfs', JSON.stringify(filesystem));
    }

    static ls(fullpath) {
        const tokens = fullpath.split('/').filter((token) => token.trim() != '');
        let cwd = LSFS.tree();
        for (const token of tokens) {
            let found = false;
            for (const dir of cwd) {
                if (typeof dir === 'object' && dir.hasOwnProperty(token)) {
                    found = true;
                    cwd = dir[token];
                    break;
                }
            }
            if (!found) {
                throw new IOError(`Invalid Path: ${fullpath}. No such directory ${token}`);
            }
        }
        return cwd;
    }

    static parent(fullpath) {
        const tokens = fullpath.split('/');
        tokens.splice(tokens.length - 1, 1);
        return '/' + tokens.join('/');
    }

    static mkdir(fullpath) {
        const parentPath = LSFS.parent(fullpath);
        const root = LSFS.tree();
        let cwd = root;
        const tokens = parentPath.split('/');
        for (const token of tokens) {
            let found = false;
            for (const dir of cwd) {
                if (typeof dir === 'object' && dir.hasOwnProperty(token)) {
                    found = true;
                    cwd = dir[token];
                    break;
                }
            }
        }
        const newDirName = fullpath.split('/');
        const data = {};
        data[newDirName[newDirName.length - 1]] = [];
        cwd.push(data);
        LSFS.setFs(root);
    }
}

(() => {
    const data = localStorage.getItem('lsfs');
    try {
        if (data === '' || data === null || data === undefined) throw new Error();
        JSON.parse(data);
    } catch (e) {
        localStorage.setItem('lsfs', '[]');
    }
})();
