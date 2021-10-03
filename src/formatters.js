export const formatters = {
  'C++ (GyverMAX7219)': {
    fromCode: (code) => {
      const { groups } =
        /.*?(?<name>[\w]+)\s*\[\][^=]*=\s*\{(?<arrayStr>[^}]+)?\}?.*$/.exec(
          code
        ) || {}
      return groups
    },
    toCode: ({ name, arrayStr }) => {
      return `const uint8_t ${name}[] PROGMEM = {${arrayStr}};`
    },
  },
  JavaScript: {
    fromCode: (code) => {
      const { groups } =
        /.*?(?<name>[\w]+)\s*=\s*\[(?<arrayStr>[^\]]+)?\]?.*$/.exec(code) || {}
      return groups
    },
    toCode: ({ name, arrayStr }) => {
      return `const ${name} = [${arrayStr}]`
    },
  },
}
