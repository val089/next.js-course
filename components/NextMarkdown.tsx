import { MarkdownResult } from '../types';
import { MDXRemote } from 'next-mdx-remote';

interface NextMarkdownProps {
  description: MarkdownResult;
}

export const NextMarkdown = ({ description }: NextMarkdownProps) => {
  return <MDXRemote {...description} />;
};
