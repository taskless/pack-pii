const genTest = (name: string, dimension: string, value: number | string) => ({
  name,
  test: `$[*].dimensions[?(@.name == '${dimension}' && @.value == ${typeof value === "number" ? value : `'${value}'`})]`,
});

export const fixture = {
  request: {
    url: "https://example.com/api",
    method: "POST",
    headers: [
      ["Content-Type", "application/json"],
      ["x-sample", "test@example.com"],
    ],
    body: JSON.stringify({
      // email value
      sample: "foo@example.com",
      // email field
      email_address: "totally.masked[at]foo[dot]com",
      // address field
      address: "1130 Random Way\nSomewhere, CA 90210",
      phoneNumber: "123-456-7890",
      cc: "4242424242424242",
      ssn: "123-45-6789",
      dob: "1990-01-01",
      origin: "192.168.1.1",
    }),
  },
  response: {
    status: 200,
    statusText: "OK",
    headers: [["Content-Type", "application/json"]],
    body: JSON.stringify({
      // email value
      responseValue: "real@example.com",
      fullName: "John Doe",
    }),
  },
  tests: [
    genTest("Saw that we sent an email", "pii/email.send", 1),
    genTest(
      "Saw that we sent an as a header value",
      "pii/email.send.header.value",
      1
    ),
    genTest(
      "Saw that we sent an email as a value",
      "pii/email.send.body.text",
      1
    ),
    genTest(
      "Saw that we sent an email as a field",
      "pii/email.send.body.field",
      1
    ),
    genTest("Saw that we sent an address", "pii/address.send", 1),
    genTest(
      "Saw that we sent an address as a field",
      "pii/address.send.body.field",
      1
    ),
    genTest("Saw that we sent a phone number", "pii/phone.send", 1),
    genTest(
      "Saw that we sent a phone number as a field",
      "pii/phone.send.body.field",
      1
    ),
    genTest(
      "Saw that we sent a phone number as a value",
      "pii/phone.send.body.text",
      1
    ),
    genTest("Saw that we sent a national ID", "pii/identification.send", 1),
    genTest(
      "Saw that we sent a national ID as a field",
      "pii/identification.send.body.field",
      1
    ),
    genTest(
      "Saw that we sent a national ID as a value",
      "pii/identification.send.body.text",
      1
    ),
    genTest("Saw that we sent a date of birth", "pii/birthdate.send", 1),
    genTest(
      "Saw that we sent a date of birth as a value",
      "pii/birthdate.send.body.text",
      1
    ),
    genTest("Saw that we sent a credit card", "pii/creditcard.send", 1),
    genTest(
      "Saw that we sent a credit card as a value",
      "pii/creditcard.send.body.text",
      1
    ),
    genTest("Saw that we sent an IP address", "pii/ip.send", 1),
    genTest(
      "Saw that we sent an IP address as a field",
      "pii/ip.send.body.field",
      1
    ),
    genTest(
      "Saw that we sent an IP address as a value",
      "pii/ip.send.body.text",
      1
    ),
    genTest("Saw that we received an email", "pii/email.receive", 1),
    genTest(
      "Saw that we received an email as a value",
      "pii/email.receive.body.text",
      1
    ),
    genTest("Saw that we received a name", "pii/name.receive", 1),
    genTest(
      "Saw that we received a name as a field",
      "pii/name.receive.body.field",
      1
    ),
  ],
};
