import type { INodeProperties } from 'n8n-workflow';

export const donationTypeGetDescription: INodeProperties[] = [
	{
		displayName: 'Donation Type ID',
		name: 'donationTypeId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				operation: ['get'],
				resource: ['donationType'],
			},
		},
		default: 0,
		description: 'The ID of the donation type to retrieve',
	},
];
