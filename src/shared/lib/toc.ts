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

const getToc = () => (tree: any, file: any) => {
  // rehype-slug은 문서마다 새 slugger를 쓴다. 여기서 인스턴스를 재사용하면
  // 같은 제목을 두 번째로 만날 때 `-1`이 붙어서 실제 heading id와 어긋난다.
  const slugger = new GithubSlugger();
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
