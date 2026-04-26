import DOMPurify from 'isomorphic-dompurify';

/**
 * Sanitizes an HTML string to prevent XSS attacks.
 * Uses isomorphic-dompurify to work on both server and client.
 */
export const sanitizeHtml = (html: string): string => {
  if (!html) return '';

  // Add hook to enforce security on all links
  DOMPurify.addHook('afterSanitizeAttributes', (node) => {
    // Set target="_blank" links to have rel="noopener noreferrer"
    if ('target' in node && node.getAttribute('target') === '_blank') {
      node.setAttribute('rel', 'noopener noreferrer');
    }
    
    // Force external links to be secure
    const href = node.getAttribute('href');
    if (href && (href.startsWith('http') || href.startsWith('//'))) {
      node.setAttribute('rel', 'noopener noreferrer');
    }
  });
  
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li', 'blockquote', 'code', 'pre', 'span', 'a', 'img',
      'table', 'thead', 'tbody', 'tr', 'th', 'td'
    ],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'target', 'rel', 'class', 'style'],
    ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel):|[^a-z]|[a-z+.-]+(?:[^a-z+.-:]|$))/i, // Blocks javascript:, data:, etc.
    FORBID_TAGS: ['style', 'script', 'iframe', 'object', 'embed', 'form'],
    FORBID_ATTR: ['onerror', 'onclick', 'onload', 'onmouseover'], // Explicitly block common event handlers
  });
};

