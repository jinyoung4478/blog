This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Initialize the private content submodule first (requires access to
[`jinyoung4478/content`](https://github.com/jinyoung4478/content)):

```bash
git submodule update --init --recursive
pnpm install --frozen-lockfile
```

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Edit articles in `contents/posts/` and resume content in `contents/resume/data.ts`.
The page auto-updates as you edit the file.

## Private content

`contents/` is a single private Git submodule containing articles, the resume,
and their assets. Application routes, shared UI, and the resume's layout,
components, styles, and types remain in this repo. The resume page imports
`@contents/resume/data`; its `/resume` path and `resume.qextory.com` domain are
unchanged. Resume copy, including bold text and links, is stored as data without
page components in the private repository.

Unpublished articles belong in `contents/drafts/posts/`, outside the Contentlayer
input. Only `contents/posts/` is compiled. `pnpm dev` and `pnpm build` prepare
article images from `contents/assets/posts/<slug>/` into the ignored, generated
`public/images/posts/` directory. Only slugs in `contents/posts/` are copied.
After editing images during development, run `pnpm prepare:content` again.

Commit and push content changes first, then commit the updated `contents`
submodule reference in this repository. Pushing content alone does not deploy.
GitHub Actions checks out the pinned commit with the `CONTENT_REPO_SSH_KEY`
secret (a read-only deploy key for the content repository), then builds and
deploys to Vercel using the existing Vercel secrets.

The original `resume` repository is retained. Moving existing articles into a
private repository does not remove their earlier public commit history.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
