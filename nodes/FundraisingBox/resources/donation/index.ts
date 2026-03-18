import type { INodeProperties } from 'n8n-workflow';
import { donationGetDescription } from './get';
import { donationListDescription } from './list';

export const donationDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['donation'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				action: 'Get a donation',
				description: 'Retrieve a donation',
			},
			{
				name: 'Get Many',
				value: 'list',
				action: 'Get many donations',
				description: 'Retrieve a list of donations',
			},
		],
		default: 'get',
	},
	...donationGetDescription,
	...donationListDescription,
];
