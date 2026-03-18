import type { INodeProperties } from 'n8n-workflow';

const showOnlyForDonationTypeList = {
	operation: ['list'],
	resource: ['donationType'],
};

export const donationTypeListDescription: INodeProperties[] = [
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: { show: showOnlyForDonationTypeList },
		default: false,
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: { minValue: 1 },
		displayOptions: {
			show: {
				...showOnlyForDonationTypeList,
				returnAll: [false],
			},
		},
		default: 50,
		description: 'Max number of results to return',
	},
];
