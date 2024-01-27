import StyleDictionary from 'style-dictionary';
import minimalJSON from "../formats/minimalJSON.mjs";
import {registerTransforms} from "../transforms/tokenStudio.mjs"

await registerTransforms(StyleDictionary, {})

StyleDictionary.registerFormat(minimalJSON)

// TODO:
// - Drop px from sizes?
// - all colors to rgba(r, g, b, a)

const sd = new StyleDictionary({
    source: ['./tokens/**/*.json'],
    platforms: {
        js: {
            buildPath: './build/json/',
            transformGroup: 'tokens-studio',
            files: [
                {
                    destination: 'tokens.json',
                    format: 'minimalJSON',
                },
            ],
        },
    },
});

await sd.cleanAllPlatforms();
await sd.buildAllPlatforms();
