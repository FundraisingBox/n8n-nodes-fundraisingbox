import {
	NodeConnectionTypes,
	type IDataObject,
	type IExecuteFunctions,
	type INodeExecutionData,
	type INodeType,
	type INodeTypeDescription,
} from 'n8n-workflow';
import { personDescription } from './resources/person';

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
						name: 'Contact (Person)',
						value: 'person',
						description:
							'FundraisingBox uses the term Person for what many tools call a Contact',
					},
				],
				default: 'person',
			},
			...personDescription,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			const resource = this.getNodeParameter('resource', i) as string;
			const operation = this.getNodeParameter('operation', i) as string;

			if (resource === 'person') {
				if (operation === 'get') {
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
