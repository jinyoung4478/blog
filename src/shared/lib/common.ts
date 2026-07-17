export function absoluteUrl(path: string) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://www.qextory.com';
  return new URL(path, baseUrl).toString();
}
