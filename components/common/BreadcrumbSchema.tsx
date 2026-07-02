import React from 'react';

import JsonLd from '@/components/common/JsonLd';
import { buildBreadcrumbListNode, withContext, type BreadcrumbItem } from '@/lib/seo-schema';

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

const BreadcrumbSchema = ({ items }: BreadcrumbSchemaProps) => {
  return <JsonLd data={withContext(buildBreadcrumbListNode(items))} />;
};

export default BreadcrumbSchema;
