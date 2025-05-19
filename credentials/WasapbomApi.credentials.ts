import {
ICredentialType,
INodeProperties,
} from 'n8n-workflow';

export class WasapbomApi implements ICredentialType {
name = 'wasapbomApi';
displayName = 'WasapBom API';
documentationUrl = 'https://panel.wasapbom.com/dashboard';
properties: INodeProperties[] = [
{
displayName: 'API Key',
name: 'apiKey',
type: 'string',
typeOptions: {
password: true,
},
default: '',
description: 'API key found in the device details page',
required: true,
},
];
}
