import GithubSlugger from 'github-slugger';
import { toString } from 'mdast-util-to-string';
import { remark } from 'remark';
import { visit } from 'unist-util-visit';

export type TocItem = {
  value: string;
  url: string;
  depth: number;
};

export type Toc = TocItem[];

const slugger = new GithubSlugger();

const getToc = () => (tree: any, file: any) => {
  const toc: Toc = [];
  visit(tree, 'heading', (node: any) => {
    const textContent = toString(node);
    toc.push({
      value: textContent,
      url: '#' + slugger.slug(textContent),
      depth: node.depth,
    });
    file.data.toc = toc;
  });
};

export async function getTableOfContents(content: string): Promise<Toc> {
  const vfile = await remark().use(getToc).process(content);
  // @ts-ignore
  return vfile.data.toc;
}
