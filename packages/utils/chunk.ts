export default function chunk<T>(array: Array<T>, size: number): Array<Array<T>> {
  const chunked: Array<Array<T>> = [];
  let index = 0;

  while (index < array.length) {
    chunked.push(array.slice(index, index + size));
    index += size;
  }

  return chunked;
}
