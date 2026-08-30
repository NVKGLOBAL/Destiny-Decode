const fs = require('fs');

function replaceInFile(filePath, replacements) {
    let content = fs.readFileSync(filePath, 'utf8');
    for (const [search, replace] of replacements) {
        content = content.replace(search, replace);
    }
    fs.writeFileSync(filePath, content);
}

replaceInFile('src/App.tsx', [
    [/Vibrational Matrix/gi, "Cosmic Vibrational Field"]
]);

replaceInFile('src/components/MemberSanctuary.tsx', [
    [/The Mandala Matrix/g, "The Cosmic Mandala"],
    [/UNLOCKS MATRIX/g, "UNLOCKS COSMOS"]
]);

replaceInFile('src/components/PortalOverlay.tsx', [
    [/RECODE MATRIX/g, "COSMIC FIELD"]
]);

replaceInFile('src/utils/celestialEngine.ts', [
    [/Galactic Expansion Matrix/g, "Galactic Cosmic Expansion"]
]);

console.log("Matrix replacements complete.");
