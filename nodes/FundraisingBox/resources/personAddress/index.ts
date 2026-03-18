import type { INodeProperties } from 'n8n-workflow';
import { personAddressCreateDescription } from './create';
import { personAddressGetDescription } from './get';
import { personAddressUpdateDescription } from './update';

export const personAddressDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['personAddress'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a person address',
				description: 'Add an address to a person',
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a person address',
				description: 'Get an address by ID',
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a person address',
				description: 'Update an existing address',
			},
		],
		default: 'create',
	},
	...personAddressCreateDescription,
	...personAddressGetDescription,
	...personAddressUpdateDescription,
];
