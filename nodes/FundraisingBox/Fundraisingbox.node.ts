import {
	NodeConnectionTypes,
	type IDataObject,
	type IExecuteFunctions,
	type INodeExecutionData,
	type INodeType,
	type INodeTypeDescription,
} from 'n8n-workflow';
import { communicationDescription } from './resources/communication';
import { donationDescription } from './resources/donation';
import { donationTypeDescription } from './resources/donationType';
import { personDescription } from './resources/person';
import { personAddressDescription } from './resources/personAddress';
import { personEmailAddressDescription } from './resources/personEmailAddress';
import { projectDescription } from './resources/project';
import { sourceDescription } from './resources/source';

const BASE_URL = 'https://api.fundraisingbox.com/v1';
const CREDENTIAL = 'fundraisingBoxApi';

export class Fundraisingbox implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'FundraisingBox',
		name: 'fundraisingbox',
		icon: { light: 'file:fundraisingbox.svg', dark: 'file:fundraisingbox.dark.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with the FundraisingBox API',
		defaults: {
			name: 'FundraisingBox',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [{ name: 'fundraisingBoxApi', required: true }],
		requestDefaults: {
			baseURL: BASE_URL,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Communication',
						value: 'communication',
					},
					{
						name: 'Donation',
						value: 'donation',
					},
					{
						name: 'Donation Type',
						value: 'donationType',
					},
					{
						name: 'Person',
						value: 'person',
						description:
							'FundraisingBox uses the term Person for what many tools call a Contact',
					},
					{
						name: 'Person Address',
						value: 'personAddress',
					},
					{
						name: 'Person Email Address',
						value: 'personEmailAddress',
					},
					{
						name: 'Project',
						value: 'project',
					},
					{
						name: 'Source',
						value: 'source',
					},
				],
				default: 'person',
			},
			...communicationDescription,
			...donationDescription,
			...donationTypeDescription,
			...personDescription,
			...personAddressDescription,
			...personEmailAddressDescription,
			...projectDescription,
			...sourceDescription,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			const resource = this.getNodeParameter('resource', i) as string;
			const operation = this.getNodeParameter('operation', i) as string;

			if (resource === 'personAddress') {
				if (operation === 'get') {
					const addressId = this.getNodeParameter('addressId', i) as number;
					const response = await this.helpers.httpRequestWithAuthentication.call(
						this,
						CREDENTIAL,
						{
							method: 'GET',
							url: `${BASE_URL}/personAddresses/${addressId}.json`,
							headers: { Accept: 'application/json' },
						},
					);
					returnData.push({ json: response as IDataObject, pairedItem: { item: i } });
				} else if (operation === 'create') {
					const personId = this.getNodeParameter('fb_person_id', i) as number;
					const address = this.getNodeParameter('address', i) as string;
					const postCode = this.getNodeParameter('post_code', i) as string;
					const city = this.getNodeParameter('city', i) as string;
					const country = this.getNodeParameter('country', i) as string;
					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
					const body: IDataObject = {
						fb_person_id: personId,
						address,
						post_code: postCode,
						city,
						country,
						...additionalFields,
					};
					const response = await this.helpers.httpRequestWithAuthentication.call(
						this,
						CREDENTIAL,
						{
							method: 'POST',
							url: `${BASE_URL}/personAddresses.json`,
							headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
							body,
						},
					);
					returnData.push({ json: response as IDataObject, pairedItem: { item: i } });
				} else if (operation === 'update') {
					const addressId = this.getNodeParameter('addressId', i) as number;
					const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
					const response = await this.helpers.httpRequestWithAuthentication.call(
						this,
						CREDENTIAL,
						{
							method: 'PUT',
							url: `${BASE_URL}/personAddresses/${addressId}.json`,
							headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
							body: updateFields,
						},
					);
					returnData.push({ json: response as IDataObject, pairedItem: { item: i } });
				}
			} else if (resource === 'personEmailAddress') {
				if (operation === 'get') {
					const emailAddressId = this.getNodeParameter('emailAddressId', i) as number;
					const response = await this.helpers.httpRequestWithAuthentication.call(
						this,
						CREDENTIAL,
						{
							method: 'GET',
							url: `${BASE_URL}/personEmailAddresses/${emailAddressId}.json`,
							headers: { Accept: 'application/json' },
						},
					);
					returnData.push({ json: response as IDataObject, pairedItem: { item: i } });
				} else if (operation === 'create') {
					const personId = this.getNodeParameter('fb_person_id', i) as number;
					const email = this.getNodeParameter('email', i) as string;
					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
					const body: IDataObject = { fb_person_id: personId, email, ...additionalFields };
					const response = await this.helpers.httpRequestWithAuthentication.call(
						this,
						CREDENTIAL,
						{
							method: 'POST',
							url: `${BASE_URL}/personEmailAddresses.json`,
							headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
							body,
						},
					);
					returnData.push({ json: response as IDataObject, pairedItem: { item: i } });
				} else if (operation === 'update') {
					const emailAddressId = this.getNodeParameter('emailAddressId', i) as number;
					const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
					const response = await this.helpers.httpRequestWithAuthentication.call(
						this,
						CREDENTIAL,
						{
							method: 'PUT',
							url: `${BASE_URL}/personEmailAddresses/${emailAddressId}.json`,
							headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
							body: updateFields,
						},
					);
					returnData.push({ json: response as IDataObject, pairedItem: { item: i } });
				}
			} else if (resource === 'project') {
				if (operation === 'get') {
					const projectId = this.getNodeParameter('projectId', i) as number;
					const response = await this.helpers.httpRequestWithAuthentication.call(
						this,
						CREDENTIAL,
						{
							method: 'GET',
							url: `${BASE_URL}/projects/${projectId}.json`,
							headers: { Accept: 'application/json' },
						},
					);
					returnData.push({ json: response as IDataObject, pairedItem: { item: i } });
				} else if (operation === 'list') {
					const returnAll = this.getNodeParameter('returnAll', i) as boolean;
					const limit = returnAll ? Infinity : (this.getNodeParameter('limit', i) as number);
					const perPage = Math.min(returnAll ? 100 : limit, 100);
					const collected: IDataObject[] = [];
					let page = 1;
					let hasMore = true;
					while (hasMore) {
						const response = (await this.helpers.httpRequestWithAuthentication.call(
							this,
							CREDENTIAL,
							{
								method: 'GET',
								url: `${BASE_URL}/projects.json`,
								headers: { Accept: 'application/json' },
								qs: { page, perPage },
							},
						)) as { hasMore: boolean; data: IDataObject[] };
						const batch = Array.isArray(response.data) ? response.data : [];
						collected.push(...batch);
						hasMore = Boolean(response.hasMore);
						if (!returnAll && collected.length >= limit) break;
						if (!hasMore) break;
						page++;
					}
					const output = returnAll ? collected : collected.slice(0, limit);
					for (const item of output) {
						returnData.push({ json: item, pairedItem: { item: i } });
					}
				}
			} else if (resource === 'source') {
				if (operation === 'get') {
					const sourceId = this.getNodeParameter('sourceId', i) as number;
					const response = await this.helpers.httpRequestWithAuthentication.call(
						this,
						CREDENTIAL,
						{
							method: 'GET',
							url: `${BASE_URL}/sources/${sourceId}.json`,
							headers: { Accept: 'application/json' },
						},
					);
					returnData.push({ json: response as IDataObject, pairedItem: { item: i } });
				} else if (operation === 'list') {
					const returnAll = this.getNodeParameter('returnAll', i) as boolean;
					const limit = returnAll ? Infinity : (this.getNodeParameter('limit', i) as number);
					const perPage = Math.min(returnAll ? 100 : limit, 100);
					const collected: IDataObject[] = [];
					let page = 1;
					let hasMore = true;
					while (hasMore) {
						const response = (await this.helpers.httpRequestWithAuthentication.call(
							this,
							CREDENTIAL,
							{
								method: 'GET',
								url: `${BASE_URL}/sources.json`,
								headers: { Accept: 'application/json' },
								qs: { page, perPage },
							},
						)) as { hasMore: boolean; data: IDataObject[] };
						const batch = Array.isArray(response.data) ? response.data : [];
						collected.push(...batch);
						hasMore = Boolean(response.hasMore);
						if (!returnAll && collected.length >= limit) break;
						if (!hasMore) break;
						page++;
					}
					const output = returnAll ? collected : collected.slice(0, limit);
					for (const item of output) {
						returnData.push({ json: item, pairedItem: { item: i } });
					}
				}
			} else if (resource === 'donationType') {
				if (operation === 'get') {
					const donationTypeId = this.getNodeParameter('donationTypeId', i) as number;
					const response = await this.helpers.httpRequestWithAuthentication.call(
						this,
						CREDENTIAL,
						{
							method: 'GET',
							url: `${BASE_URL}/types/${donationTypeId}.json`,
							headers: { Accept: 'application/json' },
						},
					);
					returnData.push({ json: response as IDataObject, pairedItem: { item: i } });
				} else if (operation === 'list') {
					const returnAll = this.getNodeParameter('returnAll', i) as boolean;
					const limit = returnAll ? Infinity : (this.getNodeParameter('limit', i) as number);
					const perPage = Math.min(returnAll ? 100 : limit, 100);
					const collected: IDataObject[] = [];
					let page = 1;
					let hasMore = true;
					while (hasMore) {
						const response = (await this.helpers.httpRequestWithAuthentication.call(
							this,
							CREDENTIAL,
							{
								method: 'GET',
								url: `${BASE_URL}/types.json`,
								headers: { Accept: 'application/json' },
								qs: { page, perPage },
							},
						)) as { hasMore: boolean; data: IDataObject[] };
						const batch = Array.isArray(response.data) ? response.data : [];
						collected.push(...batch);
						hasMore = Boolean(response.hasMore);
						if (!returnAll && collected.length >= limit) break;
						if (!hasMore) break;
						page++;
					}
					const output = returnAll ? collected : collected.slice(0, limit);
					for (const item of output) {
						returnData.push({ json: item, pairedItem: { item: i } });
					}
				}
			} else if (resource === 'communication') {
				if (operation === 'create') {
					const personId = this.getNodeParameter('fb_person_id', i) as number;
					const htmlMessage = this.getNodeParameter('html_message', i) as string;
					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
					const body: IDataObject = {
						fb_person_id: personId,
						html_message: htmlMessage,
						...additionalFields,
					};
					const response = await this.helpers.httpRequestWithAuthentication.call(
						this,
						CREDENTIAL,
						{
							method: 'POST',
							url: `${BASE_URL}/communications.json`,
							headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
							body,
						},
					);
					returnData.push({ json: response as IDataObject, pairedItem: { item: i } });
				} else if (operation === 'get') {
					const communicationId = this.getNodeParameter('communicationId', i) as number;
					const response = await this.helpers.httpRequestWithAuthentication.call(
						this,
						CREDENTIAL,
						{
							method: 'GET',
							url: `${BASE_URL}/communications/${communicationId}.json`,
							headers: { Accept: 'application/json' },
						},
					);
					returnData.push({ json: response as IDataObject, pairedItem: { item: i } });
				} else if (operation === 'delete') {
					const communicationId = this.getNodeParameter('communicationId', i) as number;
					await this.helpers.httpRequestWithAuthentication.call(this, CREDENTIAL, {
						method: 'DELETE',
						url: `${BASE_URL}/communications/${communicationId}.json`,
						headers: { Accept: 'application/json' },
					});
					returnData.push({ json: { deleted: true }, pairedItem: { item: i } });
				} else if (operation === 'update') {
					const communicationId = this.getNodeParameter('communicationId', i) as number;
					const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
					const response = await this.helpers.httpRequestWithAuthentication.call(
						this,
						CREDENTIAL,
						{
							method: 'PUT',
							url: `${BASE_URL}/communications/${communicationId}.json`,
							headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
							body: updateFields,
						},
					);
					returnData.push({ json: response as IDataObject, pairedItem: { item: i } });
				} else if (operation === 'list') {
					const returnAll = this.getNodeParameter('returnAll', i) as boolean;
					const limit = returnAll ? Infinity : (this.getNodeParameter('limit', i) as number);
					const perPage = Math.min(returnAll ? 100 : limit, 100);
					const filters = this.getNodeParameter('filters', i, {}) as IDataObject;

					const qs: IDataObject = {};
					for (const [key, value] of Object.entries(filters)) {
						if (value === '' || value === null || value === undefined) continue;
						if (key === 'fb_person_id' && value === 0) continue;
						qs[key] = value;
					}

					const collected: IDataObject[] = [];
					let page = 1;
					let hasMore = true;
					while (hasMore) {
						const response = (await this.helpers.httpRequestWithAuthentication.call(
							this,
							CREDENTIAL,
							{
								method: 'GET',
								url: `${BASE_URL}/communications.json`,
								headers: { Accept: 'application/json' },
								qs: { ...qs, page, perPage },
							},
						)) as { hasMore: boolean; data: IDataObject[] };
						const batch = Array.isArray(response.data) ? response.data : [];
						collected.push(...batch);
						hasMore = Boolean(response.hasMore);
						if (!returnAll && collected.length >= limit) break;
						if (!hasMore) break;
						page++;
					}
					const output = returnAll ? collected : collected.slice(0, limit);
					for (const item of output) {
						returnData.push({ json: item, pairedItem: { item: i } });
					}
				}
			} else if (resource === 'donation') {
				if (operation === 'get') {
					const donationId = this.getNodeParameter('donationId', i) as number;
					const response = await this.helpers.httpRequestWithAuthentication.call(
						this,
						CREDENTIAL,
						{
							method: 'GET',
							url: `${BASE_URL}/donations/${donationId}.json`,
							headers: { Accept: 'application/json' },
						},
					);
					returnData.push({ json: response as IDataObject, pairedItem: { item: i } });
				} else if (operation === 'list') {
					const returnAll = this.getNodeParameter('returnAll', i) as boolean;
					const limit = returnAll ? Infinity : (this.getNodeParameter('limit', i) as number);
					const perPage = Math.min(returnAll ? 100 : limit, 100);
					const filters = this.getNodeParameter('filters', i, {}) as IDataObject;

					// ID-type fields where 0 means "not set"
					const idFields = new Set([
						'fb_project_id',
						'fb_type_id',
						'fb_source_id',
						'fb_person_id',
						'search_id',
					]);

					// Build query string: exclude empty strings, zero-value ID fields, and no-op option values
					const qs: IDataObject = {};
					for (const [key, value] of Object.entries(filters)) {
						if (value === '' || value === null || value === undefined) continue;
						if (idFields.has(key) && value === 0) continue;
						if (key === 'is_test' && value === 'all') continue;
						qs[key] = value;
					}

					const collected: IDataObject[] = [];
					let page = 1;
					let hasMore = true;

					while (hasMore) {
						const response = (await this.helpers.httpRequestWithAuthentication.call(
							this,
							CREDENTIAL,
							{
								method: 'GET',
								url: `${BASE_URL}/donations.json`,
								headers: { Accept: 'application/json' },
								qs: { ...qs, page, perPage },
							},
						)) as { hasMore: boolean; data: IDataObject[] };

						const batch = Array.isArray(response.data) ? response.data : [];
						collected.push(...batch);
						hasMore = Boolean(response.hasMore);

						if (!returnAll && collected.length >= limit) break;
						if (!hasMore) break;
						page++;
					}

					const output = returnAll ? collected : collected.slice(0, limit);
					for (const item of output) {
						returnData.push({ json: item, pairedItem: { item: i } });
					}
				}
			} else if (resource === 'person') {
				if (operation === 'create') {
					const firstName = this.getNodeParameter('first_name', i) as string;
					const lastName = this.getNodeParameter('last_name', i) as string;
					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
					const body: IDataObject = { first_name: firstName, last_name: lastName, ...additionalFields };
					const response = await this.helpers.httpRequestWithAuthentication.call(
						this,
						CREDENTIAL,
						{
							method: 'POST',
							url: `${BASE_URL}/persons.json`,
							headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
							body,
						},
					);
					returnData.push({ json: response as IDataObject, pairedItem: { item: i } });
				} else if (operation === 'get') {
					const personId = this.getNodeParameter('personId', i) as number;
					const response = await this.helpers.httpRequestWithAuthentication.call(
						this,
						CREDENTIAL,
						{
							method: 'GET',
							url: `${BASE_URL}/persons/${personId}.json`,
							headers: { Accept: 'application/json' },
						},
					);
					returnData.push({ json: response as IDataObject, pairedItem: { item: i } });
				} else if (operation === 'update') {
					const personId = this.getNodeParameter('personId', i) as number;
					const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
					const body: IDataObject = { ...updateFields };
					const response = await this.helpers.httpRequestWithAuthentication.call(
						this,
						CREDENTIAL,
						{
							method: 'PUT',
							url: `${BASE_URL}/persons/${personId}.json`,
							headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
							body,
						},
					);
					returnData.push({ json: response as IDataObject, pairedItem: { item: i } });
				} else if (operation === 'list') {
					const returnAll = this.getNodeParameter('returnAll', i) as boolean;
					const limit = returnAll
						? Infinity
						: (this.getNodeParameter('limit', i) as number);
					// Use full page size when returnAll, otherwise cap at limit to avoid over-fetching
					const perPage = Math.min(returnAll ? 100 : limit, 100);

					const collected: IDataObject[] = [];
					let page = 1;
					let hasMore = true;

					while (hasMore) {
						const response = (await this.helpers.httpRequestWithAuthentication.call(
							this,
							CREDENTIAL,
							{
								method: 'GET',
								url: `${BASE_URL}/persons.json`,
								headers: { Accept: 'application/json' },
								qs: { page, perPage },
							},
						)) as { hasMore: boolean; data: IDataObject[] };

						const batch = Array.isArray(response.data) ? response.data : [];
						collected.push(...batch);
						hasMore = Boolean(response.hasMore);

						if (!returnAll && collected.length >= limit) break;
						if (!hasMore) break;
						page++;
					}

					const output = returnAll ? collected : collected.slice(0, limit);
					for (const item of output) {
						returnData.push({ json: item, pairedItem: { item: i } });
					}
				}
			}
		}

		return [returnData];
	}
}
