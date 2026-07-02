import React from 'react';

import type { JsonLdData } from '@/lib/seo-schema';

interface JsonLdProps {
  data: JsonLdData;
}

export function serializeJsonLd(data: JsonLdData) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

const JsonLd = ({ data }: JsonLdProps) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
  />
);

export default JsonLd;
