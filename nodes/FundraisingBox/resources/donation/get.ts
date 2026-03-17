import type { INodeProperties } from 'n8n-workflow';

export const donationGetDescription: INodeProperties[] = [
	{
		displayName: 'Donation ID',
		name: 'donationId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				operation: ['get'],
				resource: ['donation'],
			},
		},
		default: 0,
		description: 'The ID of the donation to retrieve',
	},
];
