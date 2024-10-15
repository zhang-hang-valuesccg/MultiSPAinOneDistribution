# Welcome to the example CDK TypeScript project

This is an example project showing how to contain multiple SPAs in one distribution.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

- `npm run npmi-s` npm install in all folders
- `npm run buildp` build SPAs
- `npm run build` build CDK project
- `npx cdk deploy` deploy all stacks to your default AWS account/region
- `npx cdk destroy` destroy all the stacks

## steps

- set up your AWS account and region in bin/multi_sp_ain_cloud_front.ts
- building the project using above command
- check the cloudfront domain in management console
- access to the default domain and /pageb/index.html
