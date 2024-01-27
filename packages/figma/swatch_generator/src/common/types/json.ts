/** A parsed JSON value. */
type JSON =
    | string
    | number
    | boolean
    | null
    | JSON[]
    | { [key: string]: JSON };

/** A JSON stringify-able value. */
type JSONable =
    | string
    | number
    | boolean
    | null
    | undefined
    | JSONable[]
    | { [key: string]: JSONable }
    | { toJSON(): JSONable };

interface JSONArray extends Array<JSON> {}
interface JSONObject {
    [key: string]: JSON;
}
export {
    JSON,
    JSONable,
    JSONArray,
    JSONObject
}

