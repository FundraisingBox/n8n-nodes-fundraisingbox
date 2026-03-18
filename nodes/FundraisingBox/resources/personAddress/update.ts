import type { INodeProperties } from 'n8n-workflow';

export const personAddressUpdateDescription: INodeProperties[] = [
	{
		displayName: 'Address ID',
		name: 'addressId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				operation: ['update'],
				resource: ['personAddress'],
			},
		},
		default: 0,
		description: 'The ID of the address to update',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				operation: ['update'],
				resource: ['personAddress'],
			},
		},
		options: [
			{
				displayName: 'City',
				name: 'city',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Country',
				name: 'country',
				type: 'string',
				default: '',
				description: 'Country code (e.g. DE, AT, CH)',
			},
			{
				displayName: 'Is Main',
				name: 'is_main',
				type: 'boolean',
				default: true,
				description: 'Whether this is the primary address for the person',
			},
			{
				displayName: 'Postal Code',
				name: 'post_code',
				type: 'string',
				default: '',
			},
			{
				displayName: 'State',
				name: 'state',
				type: 'string',
				default: '',
				description: 'State or region',
			},
			{
				displayName: 'Street Address',
				name: 'address',
				type: 'string',
				default: '',
				description: 'Street address including house number',
			},
			{
				displayName: 'Type',
				name: 'type',
				type: 'options',
				options: [
					{ name: 'Home', value: 'home' },
					{ name: 'Other', value: 'other' },
					{ name: 'Work', value: 'work' },
				],
				default: 'home',
				description: 'Classification of the address',
			},
		],
	},
];
