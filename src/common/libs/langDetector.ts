function isJSON (str: string) {
   try {
      if (!['{', '['].includes(str.trim()[0]))
         return false;

      JSON.parse(str);
      return true;
   }
   catch (_) {
      return false;
   }
}

function isHTML (str: string) {
   const tags = [
      'a',
      'abbr',
      'address',
      'area',
      'article',
      'aside',
      'audio',
      'b',
      'base',
      'bdi',
      'bdo',
      'blockquote',
      'body',
      'br',
      'button',
      'canvas',
      'caption',
      'cite',
      'code',
      'col',
      'colgroup',
      'data',
      'datalist',
      'dd',
      'del',
      'details',
      'dfn',
      'dialog',
      'div',
      'dl',
      'dt',
      'em',
      'embed',
      'fieldset',
      'figcaption',
      'figure',
      'footer',
      'form',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'head',
      'header',
      'hgroup',
      'hr',
      'html',
      'i',
      'iframe',
      'img',
      'input',
      'ins',
      'kbd',
      'label',
      'legend',
      'li',
      'link',
      'main',
      'map',
      'mark',
      'math',
      'menu',
      'menuitem',
      'meta',
      'meter',
      'nav',
      'noscript',
      'object',
      'ol',
      'optgroup',
      'option',
      'output',
      'p',
      'param',
      'picture',
      'pre',
      'progress',
      'q',
      'rb',
      'rp',
      'rt',
      'rtc',
      'ruby',
      's',
      'samp',
      'script',
      'section',
      'select',
      'slot',
      'small',
      'source',
      'span',
      'strong',
      'style',
      'sub',
      'summary',
      'sup',
      'svg',
      'table',
      'tbody',
      'td',
      'template',
      'textarea',
      'tfoot',
      'th',
      'thead',
      'time',
      'title',
      'tr',
      'track',
      'u',
      'ul',
      'var',
      'video',
      'wbr'
   ];
   const doc = new DOMParser().parseFromString(str, 'text/html');
   if (Array.from(doc.body.childNodes).some(node => node.nodeType === 1))
      return tags.some((tag) => str.includes(`<${tag}>`));

   return false;
}

function isXML (str: string) {
   const doc = new DOMParser().parseFromString(str, 'text/xml');
   const errorNode = doc.querySelector('parsererror');
   return !errorNode;
}

function isMarkdown (str: string) {
   const mdChecks = [
      '# ',
      '`',
      '- ',
      '+ ',
      '* ',
      '1. ',
      '**',
      '__',
      '~~',
      '>> ',
      '](http',
      '![',
      '[ ]',
      '[x]'
   ];

   return mdChecks.some((tag) => str.includes(tag));
}

export function langDetector (str: string) {
   if (!str.trim().length)
      return 'text';

   if (isJSON(str))
      return 'json';
   if (isHTML(str))
      return 'html';
   if (isXML(str))
      return 'xml';
   if (isMarkdown(str))
      return 'markdown';

   return 'text';
}
