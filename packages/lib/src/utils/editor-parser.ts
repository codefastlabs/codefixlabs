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

const convertMarkdownToHtmlProcess = unified()
  .use(remarkParse)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeRaw)
  .use(rehypeFormat)
  .use(rehypeSanitize)
  .use(rehypeStringify);

const convertHtmlToMarkdownProcess = unified()
  .use(rehypeParse)
  .use(rehypeRemark)
  .use(remarkStringify);

type UnifiedProcessor =
  | typeof convertMarkdownToHtmlProcess
  | typeof convertHtmlToMarkdownProcess;

const processConversion = (
  processor: UnifiedProcessor,
  content: string,
): string => {
  if (!content) {
    return '';
  }

  const result = processor.processSync(content.toString());

  return result.toString();
};

export function markdownToHTML(markdown: string): string {
  return processConversion(convertMarkdownToHtmlProcess, markdown);
}

export function htmlToMarkdown(html: string): string {
  return processConversion(convertHtmlToMarkdownProcess, html);
}
