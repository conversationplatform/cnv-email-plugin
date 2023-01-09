const packageJson = require("./package.json");

const fs = require('fs');

const nodes = {};

const mapFolder = (folder) => {
    const entries = fs.readdirSync(folder);
    entries.forEach(entry => {
        const path = `${folder}/${entry}`;
        if (fs.lstatSync(path).isDirectory()) {
            mapFolder(path);
        } else {
            const node = folder.slice(folder.lastIndexOf('/') + 1);
            const file = path.slice(path.lastIndexOf('/') + 1);
            if (path.endsWith('.js') && entries.includes(file.replace('.js', '.html'))) {
                console.log(`${node} => ${path}`)
                nodes[node] = path;
            }
        }
    })
}

mapFolder('nodes');



packageJson["node-red"] = { nodes };

fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
