import type { INodeProperties } from 'n8n-workflow';
import { communicationCreateDescription } from './create';
import { communicationDeleteDescription } from './delete';
import { communicationGetDescription } from './get';
import { communicationListDescription } from './list';
import { communicationUpdateDescription } from './update';

export const communicationDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['communication'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a communication',
				description: 'Add a communication entry for a person',
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a communication',
				description: 'Delete a communication permanently',
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a communication',
				description: 'Retrieve a communication',
			},
			{
				name: 'Get Many',
				value: 'list',
				action: 'Get many communications',
				description: 'Retrieve a list of communication entries',
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a communication',
				description: 'Update an existing communication entry',
			},
		],
		default: 'create',
	},
	...communicationCreateDescription,
	...communicationDeleteDescription,
	...communicationGetDescription,
	...communicationListDescription,
	...communicationUpdateDescription,
];
