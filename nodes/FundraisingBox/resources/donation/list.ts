import type { INodeProperties } from 'n8n-workflow';

const showOnlyForDonationList = {
	operation: ['list'],
	resource: ['donation'],
};

export const donationListDescription: INodeProperties[] = [
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: { show: showOnlyForDonationList },
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
				...showOnlyForDonationList,
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
		displayOptions: { show: showOnlyForDonationList },
		options: [
			{
				displayName: 'Amount Max',
				name: 'amount_max',
				type: 'number',
				default: 0,
				description: 'Maximum donation amount (in cents)',
			},
			{
				displayName: 'Amount Min',
				name: 'amount_min',
				type: 'number',
				default: 0,
				description: 'Minimum donation amount (in cents)',
			},
			{
				displayName: 'Date Max',
				name: 'date_max',
				type: 'dateTime',
				default: '',
				description: 'Return only donations created before this date',
			},
			{
				displayName: 'Date Min',
				name: 'date_min',
				type: 'dateTime',
				default: '',
				description: 'Return only donations created after this date',
			},
			{
				displayName: 'External Donation ID',
				name: 'external_donation_id',
				type: 'string',
				default: '',
				description: 'Filter by external donation ID from a third-party system',
			},
			{
				displayName: 'Is Test',
				name: 'is_test',
				type: 'options',
				options: [
					{ name: 'All', value: 'all' },
					{ name: 'Live Only', value: 'no' },
					{ name: 'Test Only', value: 'yes' },
				],
				default: 'all',
				description: 'Filter by whether the donation is a test',
			},
			{
				displayName: 'Person ID',
				name: 'fb_person_id',
				type: 'number',
				default: 0,
				description: 'Return only donations belonging to this person',
			},
			{
				displayName: 'Project ID',
				name: 'fb_project_id',
				type: 'number',
				default: 0,
				description: 'Return only donations for this project',
			},
			{
				displayName: 'Search ID',
				name: 'search_id',
				type: 'number',
				default: 0,
				description: 'Filter by saved search ID',
			},
			{
				displayName: 'Source ID',
				name: 'fb_source_id',
				type: 'number',
				default: 0,
				description: 'Return only donations for this source',
			},
			{
				displayName: 'Transaction ID',
				name: 'transaction_id',
				type: 'string',
				default: '',
				description: 'Filter by payment transaction ID',
			},
			{
				displayName: 'Type ID',
				name: 'fb_type_id',
				type: 'number',
				default: 0,
				description: 'Return only donations of this type',
			},
			{
				displayName: 'Updated Max',
				name: 'updated_max',
				type: 'dateTime',
				default: '',
				description: 'Return only donations updated before this date',
			},
			{
				displayName: 'Updated Min',
				name: 'updated_min',
				type: 'dateTime',
				default: '',
				description: 'Return only donations updated after this date',
			},
		],
	},
];
