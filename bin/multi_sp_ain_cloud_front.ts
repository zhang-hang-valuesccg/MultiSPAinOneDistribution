#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { MultiSPAinCloudFrontStack } from "../lib/multi_sp_ain_cloud_front-stack";

const app = new cdk.App();

new MultiSPAinCloudFrontStack(app, "MultiSpAinCloudFrontStack", {
  env: {
    account: "",
    region: "",
  },
});
