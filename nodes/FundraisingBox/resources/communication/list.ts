import type { INodeProperties } from 'n8n-workflow';

const showOnlyForCommunicationList = {
	operation: ['list'],
	resource: ['communication'],
};

export const communicationListDescription: INodeProperties[] = [
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: { show: showOnlyForCommunicationList },
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
				...showOnlyForCommunicationList,
				returnAll: [false],
			},
		},
		default: 50,
		description: 'Max number of results to return',
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: { show: showOnlyForCommunicationList },
		options: [
			{
				displayName: 'Date Max',
				name: 'date_max',
				type: 'dateTime',
				default: '',
				description: 'Return only communications created before this date',
			},
			{
				displayName: 'Date Min',
				name: 'date_min',
				type: 'dateTime',
				default: '',
				description: 'Return only communications created after this date',
			},
			{
				displayName: 'Direction',
				name: 'direction',
				type: 'options',
				options: [
					{ name: 'Inbound', value: 'in' },
					{ name: 'Outbound', value: 'out' },
				],
				default: 'out',
				description: 'Filter by direction of the communication',
			},
			{
				displayName: 'Person ID',
				name: 'fb_person_id',
				type: 'number',
				default: 0,
				description: 'Return only communications for this person',
			},
			{
				displayName: 'Type',
				name: 'type',
				type: 'options',
				options: [
					{ name: 'Email', value: 'email' },
					{ name: 'Letter', value: 'letter' },
					{ name: 'Note', value: 'note' },
					{ name: 'Phone', value: 'phone' },
					{ name: 'Talk', value: 'talk' },
				],
				default: 'note',
				description: 'Filter by communication type',
			},
		],
	},
];
