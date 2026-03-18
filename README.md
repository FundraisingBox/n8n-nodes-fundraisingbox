# @fundraisingbox/n8n-nodes-fundraisingbox

This is an n8n community node. It lets you use FundraisingBox in your n8n workflows.

FundraisingBox is a donation and fundraising management platform that helps non-profit organizations collect and manage donations online.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

[Installation](#installation)
[Operations](#operations)
[Credentials](#credentials)
[Compatibility](#compatibility)
[Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

### FundraisingBox (action node)

#### Communication

- **Create** – Create a new communication entry linked to a person. Requires Person ID and HTML message. Optional fields: type (note/email/phone/talk/letter), subject, direction (in/out), date, sticky.
- **Delete** – Delete a communication entry permanently.
- **Get** – Retrieve a single communication entry by ID.
- **Get Many** – Retrieve a list of communications. Filter by Person ID, type, direction, and date range. Supports pagination.
- **Update** – Update an existing communication entry by ID.

#### Donation

- **Get** – Retrieve a single donation by ID.
- **Get Many** – Retrieve a list of donations. Filter by amount range, date range, updated range, project, type, source, person, test status, and various IDs. Supports pagination.

#### Donation Type

- **Get** – Retrieve a single donation type by ID.
- **Get Many** – Retrieve a list of donation types. Supports pagination.

#### Person

FundraisingBox uses the term "Person" for what many tools call a Contact.

- **Create** – Create a new person. Requires Last Name. First Name and additional fields (Company ID, External Person ID, Greeting, Info, Position, Salutation, Title) are optional.
- **Get** – Retrieve a single person by their numeric ID.
- **Get Many** – Retrieve a list of persons. Use *Return All* to fetch every record, or set a *Limit* (default 50).
- **Update** – Update an existing person by ID. All fields are optional.

#### Person Address

- **Create** – Create a new address for a person. Requires Person ID, street address, post code, city, and country. Optional fields: state, type (work/home/other), is main address.
- **Get** – Retrieve a single address by ID.
- **Update** – Update an existing address by ID. Updatable fields: street address, post code, city, state, country, type, is main address.

#### Person Email Address

- **Create** – Create a new email address for a person. Requires Person ID and email. Optional fields: type (work/home/other), is main email address.
- **Get** – Retrieve a single email address by ID.
- **Update** – Update an existing email address by ID. Updatable fields: email, type, is main email address.

#### Project

- **Get** – Retrieve a single project by ID.
- **Get Many** – Retrieve a list of projects. Supports pagination.

#### Source

- **Get** – Retrieve a single source by ID.
- **Get Many** – Retrieve a list of sources. Supports pagination.

### FundraisingBox Donation Trigger (polling trigger node)

- **New Donation** – Triggers the workflow whenever a new confirmed donation appears. On first activation the node initialises its checkpoint to the latest donation and will only emit donations created after that point.

## Credentials

FundraisingBox uses HTTP Basic Auth with an API key. To authenticate:

1. Retrieve your API key by following the [FundraisingBox support article on connecting third-party systems via REST API](https://support.fundraisingbox.com/de/support/solutions/articles/79000147562-schnittstellen-zu-drittsystemen-herstellen-rest-api-webhooks-).
2. In n8n, create a new **FundraisingBox API** credential.
3. Paste your API key into the **API Key** field.

The node sends the API key as the HTTP Basic Auth username (the password field is ignored by the API).

## Compatibility

Requires **n8n 1.x**. The node uses `usableAsTool: true`, which requires n8n 1.31 or later.

No known incompatibilities with current n8n versions.

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
* [FundraisingBox API documentation](https://developer.fundraisingbox.com/reference/introduction-json)
