/** Apply opacity to an Open Color hex value. */
export function alpha(color: string, opacity: number) {
  const rgb = Number.parseInt(color.slice(1), 16);
  return `rgba(${rgb >> 16}, ${(rgb >> 8) & 255}, ${rgb & 255}, ${opacity})`;
}
