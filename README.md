# Taskless Packs: PII (Personally Identifiable Information)

> Taskless Packs are plugins that enable service-specific functionality in Taskless. To use this pack, you need to install it into your Taskless instance using either the [Taskless CLI](https://github.com/taskless/pack) or the [Taskless Cloud](https://www.taskless.io) interface.

# Pack Overview

This pack detects a variety of Personally Identifiable Information (PII) in your requests and responses. It can be used to ensure compliance with data protection regulations and to enhance user privacy.

# Installation

You can install this pack via Taskless Cloud, or via the Taskless CLI using the `pack.tgz` from the releases page.

```bash
# Taskless CLI
pnpm dlx @taskless/pack@latest install "<url/to/pack.tgz>"
```

# Configuration

This pack has a variety of configuration options, with defaults for the most common use cases. It uses a variety of well-known regular expressions to spot potential PII in the request and response bodies, headers, and cookies. You can customize the detection patterns and the sensitivity of the pack to suit your needs.

# FAQs

- **Does this pack itself send any PII?** No, this pack does not send any PII. It only detects PII in the requests and responses that it processes. The data sent to your console or Taskless Cloud is instead in the form of `pii/email.send.body = 1`, indiciating that the pack detected an email sent as part of the request body.
- **Can I customize the detection patterns?** Yes, you can customize the detection patterns by modifying the pack's configuration. You can add or remove patterns as needed, or set any detection to an empty array `[]` to disable it.
- **What types of PII does this pack detect?** This pack detects a wide range of PII, including but not limited to email addresses, phone numbers, credit card numbers, social security numbers, and IP addresses. The detection patterns are based on well-known regular expressions for these types of data.
