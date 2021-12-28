
//https://gist.github.com/codeguy/6684588#gistcomment-3974852
export const slugify = function (string ,separator = "-") {
    const s_copy = string
    return s_copy
        .toString()
        .normalize('NFD')                   // split an accented letter in the base letter and the acent
        .replace(/[\u0300-\u036f]/g, '')   // remove all previously split accents
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')   // remove all chars not letters, numbers and spaces (to be replaced)
        .trim()
        .replace(/\s+/g, separator);
};