export function getHashesArray(hashes: any) {
  if (!hashes) return;

  let hashesArray = [];

  hashes.forEach((entry: any) => hashesArray.push(entry.hash));

  return hashesArray;
}
