export default function removePrefix(string: string, prefix: string): string {
  return string.startsWith(prefix) ? string.slice(prefix.length) : string;
}
