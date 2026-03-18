import type { INodeProperties } from 'n8n-workflow';
import { personEmailAddressCreateDescription } from './create';
import { personEmailAddressGetDescription } from './get';
import { personEmailAddressUpdateDescription } from './update';

export const personEmailAddressDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['personEmailAddress'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a person email address',
				description: 'Add an email address to a person',
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a person email address',
				description: 'Retrieve a person email address',
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a person email address',
				description: 'Update an existing email address',
			},
		],
		default: 'create',
	},
	...personEmailAddressCreateDescription,
	...personEmailAddressGetDescription,
	...personEmailAddressUpdateDescription,
];
