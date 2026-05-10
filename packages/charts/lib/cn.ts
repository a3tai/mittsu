type ClassValue =
  | string
  | number
  | null
  | false
  | undefined
  | ClassValue[]
  | { [key: string]: unknown };

export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];
  for (const input of inputs) collect(input, out);
  return out.join(" ");
}

function collect(input: ClassValue, out: string[]): void {
  if (!input) return;
  if (typeof input === "string" || typeof input === "number") {
    out.push(String(input));
    return;
  }
  if (Array.isArray(input)) {
    for (const v of input) collect(v, out);
    return;
  }
  if (typeof input === "object") {
    for (const key in input) {
      if (input[key]) out.push(key);
    }
  }
}
