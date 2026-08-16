type ClassValue = string | number | false | null | undefined | ClassValue[];

export function cn(...inputs: ClassValue[]) {
  const classes: string[] = [];

  const append = (value: ClassValue) => {
    if (Array.isArray(value)) {
      value.forEach(append);
      return;
    }

    if (value) {
      classes.push(String(value));
    }
  };

  inputs.forEach(append);
  return classes.join(" ");
}

export function toSingleValue(value: string | string[] | undefined) {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }

  return value ?? "";
}

export function quoteHref(params: Record<string, string | number | undefined>) {
  const search = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      search.set(key, String(value));
    }
  });

  return `/contact${search.toString() ? `?${search.toString()}` : ""}`;
}
