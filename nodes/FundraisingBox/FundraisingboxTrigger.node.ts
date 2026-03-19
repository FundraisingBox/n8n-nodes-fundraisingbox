import {
	NodeConnectionTypes,
	type IDataObject,
	type INodeExecutionData,
	type INodeType,
	type INodeTypeDescription,
	type IPollFunctions,
} from 'n8n-workflow';

const BASE_URL = 'https://api.fundraisingbox.com/v1';
const CREDENTIAL = 'fundraisingBoxApi';

const ENDPOINTS: Record<string, string> = {
	donation: '/donations.json',
};

// eslint-disable-next-line @n8n/community-nodes/node-usable-as-tool
export class FundraisingboxTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'FundraisingBox Trigger',
		name: 'fundraisingboxTrigger',
		icon: { light: 'file:fundraisingbox.svg', dark: 'file:fundraisingbox.dark.svg' },
		group: ['trigger'],
		version: 1,
		description: 'Triggers the workflow when a new event occurs in FundraisingBox',
		defaults: { name: 'FundraisingBox Trigger' },
		credentials: [{ name: CREDENTIAL, required: true }],
		polling: true,
		triggerPanel: {
			header: 'Listening for new FundraisingBox events',
			executionsHelp: {
				inactive: 'Activate the workflow to start polling FundraisingBox for new events.',
				active:
					'The workflow is active. It polls FundraisingBox for new events at the configured interval.',
			},
		},
		inputs: [],
		outputs: [NodeConnectionTypes.Main],
		properties: [
			{
				displayName: 'Event',
				name: 'event',
				type: 'options',
				options: [{ name: 'New Donation', value: 'donation' }],
				default: 'donation',
				description: 'The event to listen for',
			},
		],
	};

	async poll(this: IPollFunctions): Promise<INodeExecutionData[][] | null> {
		const event = this.getNodeParameter('event') as string;
		const endpoint = ENDPOINTS[event];
		const staticDataKey = `last_${event}_id`;

		const staticData = this.getWorkflowStaticData('node');
		const lastId = staticData[staticDataKey] as number | undefined;
		const isManual = this.getMode() === 'manual';

		const fetchPage = async (page: number, perPage = 100) => {
			return (await this.helpers.httpRequestWithAuthentication.call(this, CREDENTIAL, {
				method: 'GET',
				url: `${BASE_URL}${endpoint}`,
				headers: { Accept: 'application/json' },
				qs: { page, perPage },
			})) as { hasMore: boolean; data: IDataObject[] };
		};

		// Manual / test mode: return a few items so the user can inspect the data structure
		if (isManual) {
			const response = await fetchPage(1, 5);
			const data = Array.isArray(response.data) ? response.data : [];
			if (data.length === 0) return null;
			return [this.helpers.returnJsonArray(data)];
		}

		// First activation: store the newest item ID as checkpoint, emit nothing
		if (lastId === undefined) {
			const response = await fetchPage(1);
			const data = Array.isArray(response.data) ? response.data : [];
			if (data.length > 0) {
				// Page 1 is sorted newest first (created_at DESC), so data[0] has the highest ID
				staticData[staticDataKey] = data[0].id as number;
			}
			return null;
		}

		// Normal poll: collect items newer than the checkpoint.
		// API returns created_at DESC so we can stop as soon as we hit id <= lastId.
		const newItems: IDataObject[] = [];
		let page = 1;
		let done = false;

		while (!done) {
			const response = await fetchPage(page);
			const data = Array.isArray(response.data) ? response.data : [];

			for (const item of data) {
				if ((item.id as number) > lastId) {
					newItems.push(item);
				} else {
					done = true;
					break;
				}
			}

			if (!response.hasMore || done) break;
			page++;
		}

		if (newItems.length > 0) {
			// data[0] is the newest (DESC sort), so it has the highest ID
			staticData[staticDataKey] = newItems[0].id as number;
			return [this.helpers.returnJsonArray(newItems)];
		}

		return null;
	}
}
