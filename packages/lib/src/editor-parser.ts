import rehypeFormat from 'rehype-format';
import rehypeParse from 'rehype-parse';
import rehypeRaw from 'rehype-raw';
import rehypeRemark from 'rehype-remark';
import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import remarkStringify from 'remark-stringify';
import { unified } from 'unified';

const markdownToHTMLProcessor = unified()
  .use(remarkParse)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeRaw)
  .use(rehypeFormat)
  .use(rehypeSanitize)
  .use(rehypeStringify);

const htmlToMarkdownProcessor = unified()
  .use(rehypeParse)
  .use(rehypeRemark)
  .use(remarkStringify);

export function markdownToHTML(
  markdown: string | number | null | undefined,
): string {
  if (!markdown) {
    return '';
  }

  const result = markdownToHTMLProcessor.processSync(markdown.toString());

  return result.toString();
}

export function htmlToMarkdown(
  html: string | number | null | undefined,
): string {
  if (!html) {
    return '';
  }

  const result = htmlToMarkdownProcessor.processSync(html.toString());

  return result.toString();
}
