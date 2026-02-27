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

export class FundraisingboxTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'FundraisingBox Trigger',
		name: 'fundraisingboxTrigger',
		icon: { light: 'file:fundraisingbox.svg', dark: 'file:fundraisingbox.dark.svg' },
		group: ['trigger'],
		version: 1,
		usableAsTool: true,
		description: 'Triggers the workflow when a new donation is confirmed in FundraisingBox',
		defaults: { name: 'FundraisingBox Trigger' },
		credentials: [{ name: CREDENTIAL, required: true }],
		polling: true,
		triggerPanel: {
			header: 'Listening for new donations',
			executionsHelp: {
				inactive:
					'Activate the workflow to start polling FundraisingBox for new confirmed donations.',
				active:
					'The workflow is active. It polls FundraisingBox for new confirmed donations at the configured interval.',
			},
		},
		inputs: [],
		outputs: [NodeConnectionTypes.Main],
		properties: [],
	};

	async poll(this: IPollFunctions): Promise<INodeExecutionData[][] | null> {
		const staticData = this.getWorkflowStaticData('node');
		const lastId = staticData.lastId as number | undefined;
		const isManual = this.getMode() === 'manual';

		const fetchPage = async (page: number, perPage = 100) => {
			return (await this.helpers.httpRequestWithAuthentication.call(this, CREDENTIAL, {
				method: 'GET',
				url: `${BASE_URL}/donations.json`,
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

		// First activation: store the newest donation ID as checkpoint, emit nothing
		if (lastId === undefined) {
			const response = await fetchPage(1);
			const data = Array.isArray(response.data) ? response.data : [];
			if (data.length > 0) {
				// Page 1 is sorted newest first (created_at DESC), so data[0] has the highest ID
				staticData.lastId = data[0].id as number;
			}
			return null;
		}

		// Normal poll: collect donations newer than the checkpoint.
		// API returns created_at DESC so we can stop as soon as we hit id <= lastId.
		const newDonations: IDataObject[] = [];
		let page = 1;
		let done = false;

		while (!done) {
			const response = await fetchPage(page);
			const data = Array.isArray(response.data) ? response.data : [];

			for (const donation of data) {
				if ((donation.id as number) > lastId) {
					newDonations.push(donation);
				} else {
					done = true;
					break;
				}
			}

			if (!response.hasMore || done) break;
			page++;
		}

		if (newDonations.length > 0) {
			// data[0] is the newest (DESC sort), so it has the highest ID
			staticData.lastId = newDonations[0].id as number;
			return [this.helpers.returnJsonArray(newDonations)];
		}

		return null;
	}
}
