import type { INodeProperties } from 'n8n-workflow';

export const personEmailAddressGetDescription: INodeProperties[] = [
	{
		displayName: 'Email Address ID',
		name: 'emailAddressId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				operation: ['get'],
				resource: ['personEmailAddress'],
			},
		},
		default: 0,
		description: 'The ID of the email address to retrieve',
	},
];
