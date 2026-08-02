# 이미지 저장 규칙

블로그 이미지는 외부 스토리지를 쓰지 않고 이 저장소에 함께 커밋한다.
(예전에 S3에 올렸다가 계정을 지우면서 이미지가 전부 사라진 적이 있음)

## 위치

포스트 이미지는 슬러그별 디렉터리에 넣는다. 슬러그는 `contents/posts/<슬러그>.mdx`의 파일명과 같다.

```
public/images/posts/<슬러그>/<이름>.<확장자>
```

예: `contents/posts/xl3-history.mdx` → `public/images/posts/xl3-history/exform-flow.png`

포스트에 종속되지 않는 이미지(프로필, 회사 로고, 배너 등)는 지금처럼 `public/images/` 바로 아래나 `public/images/company/`에 둔다.

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
