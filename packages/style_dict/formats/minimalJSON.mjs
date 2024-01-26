import _ from "lodash";

// TODO: Rewrite _.setWith to plain JS and drop lodash dependency
export default {
    name: 'minimalJSON',
    formatter: ({dictionary}) => {
        const out = {}
        dictionary.allTokens.map(t => _.setWith(out, t.path, t.value, Object))
        return JSON.stringify(out, null, 4);
    }
}
