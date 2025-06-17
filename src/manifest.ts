import { type Manifest } from "./__generated__/manifest.js";

const asJSONKeyRegex = (value: string) => {
  // JSON keys are double quoted and have a colon after them
  return `"${value}"\\s*:`;
};

const asJSONValueRegex = (value: string) => {
  // JSON values are double quoted and have a colon before them with some amount of whitespace
  return `:\\s*"${value}"`;
};

const asTOMLKeyRegex = (value: string) => {
  // TOML keys are unquotted and have an equals sign after them, like ini files
  return `${value}\\s*=`;
};

const asTOMLValueRegex = (value: string) => {
  // TOML values are unquoted and have an equals sign before them with some amount of whitespace
  return `=\\s*"${value}"`;
};

const asURLKeyRegex = (value: string) => {
  // URL query parameters are unquoted and have an equals sign after them, but intentionally no space
  return `${value}=`;
};

const asURLValueRegex = (value: string) => {
  // URL query parameters are unquoted and have an equals sign before them with no space
  return `=${value}`;
};

const allFieldTypes = [asJSONKeyRegex, asTOMLKeyRegex, asURLKeyRegex];
const allValueTypes = [asJSONValueRegex, asTOMLValueRegex, asURLValueRegex];

const fields: Record<string, NonNullable<Manifest["fields"]>[number]> = {
  emailAddressFields: {
    name: "emailAddressFields",
    type: "string[]",
    description:
      "A collection of regular expressions to extend email address detection in fields and headers",
    default: allFieldTypes.map((prepare) =>
      prepare(/email(?:_?address)?/.source)
    ),
  },
  emailAddressValues: {
    name: "emailAddressValues",
    type: "string[]",
    description:
      "A collection of regular expressions to extend email address detection in values",
    default: allValueTypes.map((prepare) => prepare(/\b\S+@\S+\.\S+\b/.source)),
  },
  addressFields: {
    name: "addressFields",
    type: "string[]",
    description:
      "A collection of regular expressions to extend mailing and physical address detection in fields and headers",
    default: allFieldTypes.map((prepare) =>
      prepare(/(?:(?:mailing_?)|(?:physical_?))?address/.source)
    ),
  },
  addressValues: {
    name: "addressValues",
    type: "string[]",
    description:
      "A collection of regular expressions to extend mailing and physical address detection in values",
    // empty by default, as addresses are often complex and vary widely
    default: [],
  },
  namesFields: {
    name: "namesFields",
    type: "string[]",
    description:
      "A collection of regular expressions to extend name detection in fields and headers",
    default: allFieldTypes.map((prepare) =>
      prepare(/(?:(?:first_?)|(?:last_?)|(?:full_?))?name/.source)
    ),
  },
  namesValues: {
    name: "namesValues",
    type: "string[]",
    description:
      "A collection of regular expressions to extend name detection in values",
    // empty by default, as names are often complex and vary widely
    default: [],
  },
  phoneNumberFields: {
    name: "phoneNumberFields",
    type: "string[]",
    description:
      "A collection of regular expressions to extend phone number detection in fields and headers",
    default: allFieldTypes.map((prepare) =>
      prepare(/phone(?:_?number)?/.source)
    ),
  },
  phoneNumberValues: {
    name: "phoneNumberValues",
    type: "string[]",
    description:
      "A collection of regular expressions to extend phone number detection in values",
    default: allValueTypes.map((prepare) =>
      prepare(
        /(?:\+?\d{1,3})?[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}/.source
      )
    ),
  },
  idFields: {
    name: "idFields",
    type: "string[]",
    description:
      "A collection of regular expressions to extend National ID detection in fields and headers",
    default: [
      ...allFieldTypes.map((prepare) => prepare(/(?:national_?)?id/.source)),
      ...allFieldTypes.map((prepare) =>
        prepare(/ssn|(?:social_?security_?number)/.source)
      ),
    ],
  },
  idValues: {
    name: "idValues",
    type: "string[]",
    description:
      "A collection of regular expressions to extend National ID detection in values",
    default: allValueTypes.map(
      (prepare) => prepare(/\b\d{3}-\d{2}-\d{4}\b/.source) // US SSN format
    ),
  },
  creditCardFields: {
    name: "creditCardFields",
    type: "string[]",
    description:
      "A collection of regular expressions to extend credit card number detection in fields and headers",
    default: allFieldTypes.map((prepare) =>
      prepare(/credit_?card|cc_?number/.source)
    ),
  },
  creditCardValues: {
    name: "creditCardValues",
    type: "string[]",
    description:
      "A collection of regular expressions to extend credit card number detection in values",
    default: [
      ...allValueTypes.map((prepare) =>
        prepare(
          // visa, c, diners, discover, etc 4 x 4, starts with 4
          /[3456]\d{3}(?:[-\s]?\d{4}){3}/.source
        )
      ),
      ...allValueTypes.map((prepare) =>
        prepare(
          // amex, 5, starts with 3
          /3\d{3}[-\s]?\d{6}[-\s]?\d{5}/.source
        )
      ),
      ...allValueTypes.map((prepare) =>
        prepare(
          // diners club 14 digit
          /3\d{3}[-\s]?\d{6}[-\s]?\d{4}/.source
        )
      ),
      ...allValueTypes.map((prepare) =>
        prepare(
          // union pay 19 digit format
          /6\d{3}(?:[-\s]?\d{4}){3}[-\s]?\d{3}/.source
        )
      ),
    ],
  },
  dobFields: {
    name: "birthdateFields",
    type: "string[]",
    description:
      "A collection of regular expressions to extend birthdate detection in fields and headers",
    default: allFieldTypes.map((prepare) =>
      prepare(/(?:birth_?)?(?:date|day)/.source)
    ),
  },
  dobValues: {
    name: "birthdateValues",
    type: "string[]",
    description:
      "A collection of regular expressions to extend birthdate detection in values",
    default: [
      // yyyy-mm-dd
      ...allValueTypes.map((prepare) =>
        prepare(/\d{4}(?:[-/ ]\d{2}){2}/.source)
      ),
      // us dd-mm-yy and mm-dd-yyyy
      ...allValueTypes.map((prepare) =>
        prepare(/(?:\d{2}[- /]){2}\d{4}/.source)
      ),
    ],
  },
  ipAddressFields: {
    name: "ipAddressFields",
    type: "string[]",
    description:
      "A collection of regular expressions to extend IP address detection in fields and headers",
    default: allFieldTypes.map((prepare) => prepare(/(?:ip_?)?address/.source)),
  },
  ipAddressValues: {
    name: "ipAddressValues",
    type: "string[]",
    description:
      "A collection of regular expressions to extend IP address detection in values",
    default: allValueTypes.map(
      (prepare) =>
        prepare(
          // IPv4 v4 format
          /\b(?:\d{1,3}\.){3}\d{1,3}\b/.source
        ),
      ...allValueTypes.map((prepare) =>
        prepare(
          // IPv6 format
          /\b(?:[\da-fA-F]{1,4}:){7}[\da-fA-F]{1,4}\b/.source
        )
      )
    ),
  },
  additionalFields: {
    name: "additionalFields",
    type: "string[]",
    description:
      "A collection of additional regexes to test for PII in the fields / keys not covered by the other categories",
    default: [],
  },
  additionalValues: {
    name: "additionalValues",
    type: "string[]",
    description:
      "A collection of additional regexes to test for PII in values not covered by the other categories",
    default: [],
  },
};

export const checks: Array<{
  prefix: string;
  field: NonNullable<Manifest["fields"]>[number];
  value: NonNullable<Manifest["fields"]>[number];
}> = [
  {
    prefix: "email",
    field: fields.emailAddressFields,
    value: fields.emailAddressValues,
  },
  {
    prefix: "address",
    field: fields.addressFields,
    value: fields.addressValues,
  },
  {
    prefix: "name",
    field: fields.namesFields,
    value: fields.namesValues,
  },
  {
    prefix: "phone",
    field: fields.phoneNumberFields,
    value: fields.phoneNumberValues,
  },
  {
    prefix: "identification",
    field: fields.idFields,
    value: fields.idValues,
  },
  {
    prefix: "creditcard",
    field: fields.creditCardFields,
    value: fields.creditCardValues,
  },
  {
    prefix: "birthdate",
    field: fields.dobFields,
    value: fields.dobValues,
  },
  {
    prefix: "ip",
    field: fields.ipAddressFields,
    value: fields.ipAddressValues,
  },
  {
    prefix: "additional",
    field: fields.additionalFields,
    value: fields.additionalValues,
  },
];

export const manifest = {
  schema: "pre2",
  name: "pii",
  version: "0.0.3",
  description: "A plugin to detect PII in your requests and responses",
  permissions: {
    body: true, // wants access to the body of the request and response
  },
  fields: [
    {
      name: "domains",
      type: "string[]",
      description:
        "A collection of domains to apply the PII checks to. If empty, all domains are checked.",
      default: [],
    },
    ...checks.flatMap((pair) => {
      return [pair.field, pair.value];
    }),
  ],
  charts: [],
} satisfies Manifest;
