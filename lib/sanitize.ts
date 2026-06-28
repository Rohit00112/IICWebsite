import sanitizeHtmlLib from 'sanitize-html';

export const sanitizeHtml = (html: string): string => {
  if (!html) return '';

  return sanitizeHtmlLib(html, {
    allowedTags: [
      'p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li', 'blockquote', 'code', 'pre', 'span', 'a', 'img',
      'table', 'thead', 'tbody', 'tr', 'th', 'td',
    ],
    allowedAttributes: {
      a: ['href', 'title', 'target', 'rel', 'class', 'style'],
      img: ['src', 'alt', 'title', 'class', 'style'],
      '*': ['class', 'style'],
    },
    allowedSchemes: ['http', 'https', 'mailto', 'tel'],
    disallowedTagsMode: 'discard',
    // Block layout-breaking inline styles that escape the article column
    // (pasted content often carries white-space:nowrap / fixed widths / positioning).
    allowedStyles: {
      '*': {
        color: [/^.*$/],
        'background-color': [/^.*$/],
        'text-align': [/^(left|right|center|justify)$/],
        'font-weight': [/^.*$/],
        'font-style': [/^.*$/],
        'text-decoration': [/^.*$/],
      },
    },
    transformTags: {
      a: (tagName, attribs) => {
        const out = { ...attribs };
        const href = out.href || '';
        if (out.target === '_blank' || /^(https?:)?\/\//i.test(href)) {
          out.rel = 'noopener noreferrer';
        }
        return { tagName, attribs: out };
      },
    },
  });
};
