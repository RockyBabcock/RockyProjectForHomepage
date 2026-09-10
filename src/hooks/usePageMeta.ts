import { useEffect } from 'react';

interface MetaProps {
  title: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
}

export function usePageMeta({ title, description, ogTitle, ogDescription }: MetaProps) {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta description
    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', description);
    }

    // Update Open Graph tags
    const targetOgTitle = ogTitle || title;
    let ogTitleEl = document.querySelector('meta[property="og:title"]');
    if (ogTitleEl) {
      ogTitleEl.setAttribute('content', targetOgTitle);
    }

    const targetOgDesc = ogDescription || description;
    if (targetOgDesc) {
      let ogDescEl = document.querySelector('meta[property="og:description"]');
      if (ogDescEl) {
        ogDescEl.setAttribute('content', targetOgDesc);
      }
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [title, description, ogTitle, ogDescription]);
}
