export const singleton = (S, id, title) => S.listItem()
    .id(id)
    .title(title ||
    id
        .split(/(?=[A-Z])/)
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' '))
    .child(S.editor().id(id).schemaType(id).documentId(id));
export const group = (S, title, items) => S.listItem().title(title).child(S.list().title(title).items(items));
/**
 * Return the text of a block type as a single string. Use in schema previews.
 */
export function getBlockText(block, lineBreakChar = '↵ ') {
    return ((block === null || block === void 0 ? void 0 : block.reduce((a, c, i) => {
        var _a;
        const text = ((_a = c.children) === null || _a === void 0 ? void 0 : _a.flatMap((c) => c.text).join('')) || '';
        return a + text + (i !== block.length - 1 ? lineBreakChar : '');
    }, '')) || '');
}
export function count(arr, singular = 'item', plural) {
    return `${(arr === null || arr === void 0 ? void 0 : arr.length) || 0} ${(arr === null || arr === void 0 ? void 0 : arr.length) === 1 ? singular : plural || singular + 's'}`;
}
