# 이미지 저장 규칙

블로그 글 이미지는 외부 스토리지를 쓰지 않고 비공개 `content` 저장소에 함께 커밋한다.
(예전에 S3에 올렸다가 계정을 지우면서 이미지가 전부 사라진 적이 있음)

## 위치

포스트 이미지는 슬러그별 디렉터리에 넣는다. 슬러그는 `contents/posts/<슬러그>.mdx`의 파일명과 같다.

```
contents/assets/posts/<슬러그>/<이름>.<확장자>
```

예: `contents/posts/xl3-history.mdx` → `contents/assets/posts/xl3-history/exform-flow.png`

`pnpm dev`와 `pnpm build` 실행 시 공개할 글의 이미지만 `public/images/posts/`에 복사한다.
이 경로는 자동 생성되므로 직접 편집하거나 커밋하지 않는다. 개발 중 이미지를 수정하면
`pnpm prepare:content`를 다시 실행한다. 초안 이미지는 `contents/drafts/`에 보관한다.

이력서 프로필과 회사 로고는 `contents/resume/assets/`에 둔다.
사이트 공통 배너 등은 기존 `public/images/` 경로를 유지한다.

## 참조

`public/`이 웹 루트이므로 경로에서 `public`을 뺀다.

```md
![변환 흐름](/images/posts/xl3-history/exform-flow.png)
```

크기를 지정하거나 next/image 최적화를 쓰려면 MDX에서 `Image`를 바로 쓸 수 있다.

```mdx
<Image
  src='/images/posts/xl3-history/exform-flow.png'
  alt='변환 흐름'
  width={1200}
  height={630}
/>
```

## 파일 규칙

- 파일명은 소문자 케밥케이스 (`template-sheet.png`)
- 스크린샷/UI는 PNG, 사진은 JPEG, 도식은 가능하면 SVG
- 가로 1600px 이하로 리사이즈하고 커밋 전에 압축한다 (저장소에 바이너리가 쌓이므로)
- 한글 파일명과 공백은 쓰지 않는다
