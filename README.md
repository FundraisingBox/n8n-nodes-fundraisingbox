# @fundraisingbox/n8n-nodes-fundraisingbox

This is an n8n community node. It lets you use FundraisingBox in your n8n workflows.

FundraisingBox is a donation and fundraising management platform that helps non-profit organizations collect and manage donations online.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

[Installation](#installation)
[Operations](#operations)
[Credentials](#credentials)
[Compatibility](#compatibility)
[Usage](#usage)
[Resources](#resources)
[Version history](#version-history)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

### FundraisingBox (action node)

#### Person

FundraisingBox uses the term "Person" for what many tools call a Contact.

- **Create** – Create a new person. Requires Last Name. First Name and additional fields (Company ID, External Person ID, Greeting, Info, Position, Salutation, Title) are optional.
- **Get** – Retrieve a single person by their numeric ID.
- **List** – Return a list of persons. Use *Return All* to fetch every record, or set a *Limit* (default 50).
- **Update** – Update an existing person by ID. All fields are optional.

### FundraisingBox Trigger (polling trigger node)

- **On new donation** – Triggers the workflow whenever a new confirmed donation appears. On first activation the node initialises its checkpoint to the latest donation and will only emit donations created after that point.

## Credentials

FundraisingBox uses HTTP Basic Auth with an API key. To authenticate:

1. Retrieve your API key by following the [FundraisingBox support article on connecting third-party systems via REST API](https://support.fundraisingbox.com/de/support/solutions/articles/79000147562-schnittstellen-zu-drittsystemen-herstellen-rest-api-webhooks-).
2. In n8n, create a new **FundraisingBox API** credential.
3. Paste your API key into the **API Key** field.

The node sends the API key as the HTTP Basic Auth username (the password field is ignored by the API).

## Compatibility

Requires **n8n 1.x**. The node uses `usableAsTool: true`, which requires n8n 1.31 or later.

No known incompatibilities with current n8n versions.

## Usage

_This is an optional section. Use it to help users with any difficult or confusing aspects of the node._

_By the time users are looking for community nodes, they probably already know n8n basics. But if you expect new users, you can link to the [Try it out](https://docs.n8n.io/try-it-out/) documentation to help them get started._

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
* [FundraisingBox API documentation](https://developer.fundraisingbox.com/reference/introduction-json)
