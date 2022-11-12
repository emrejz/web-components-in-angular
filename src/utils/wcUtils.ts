const STYLE_ATTR_PREFIX_LENGTH = 2;

export function convertAttr(str: string) {
  let newStr = '';
  if (str) {
    str = convertStyleAttrName(str);
    const wordArr = str.split(/[-_]/g);
    for (let i = 0; i < wordArr?.length; i++) {
      if (i > 0) {
        newStr +=
          wordArr[i]?.charAt(0).toUpperCase() + wordArr[i]?.substring(1);
      } else {
        newStr += wordArr[i];
      }
    }
  } else {
    return newStr;
  }
  return newStr;
}

export function isStyleAttr(str: string) {
  return str?.indexOf('s-') === 0;
}

function convertStyleAttrName(str: string) {
  return str.substring(STYLE_ATTR_PREFIX_LENGTH);
}
