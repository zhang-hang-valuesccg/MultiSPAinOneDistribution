import * as cdk from "aws-cdk-lib";
import {
  CachePolicy,
  Distribution,
  Function,
  FunctionCode,
  FunctionEventType,
  FunctionRuntime,
} from "aws-cdk-lib/aws-cloudfront";
import { S3BucketOrigin } from "aws-cdk-lib/aws-cloudfront-origins";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import { Construct } from "constructs";

export class MultiSPAinCloudFrontStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucketA = new Bucket(this, "bucket-pagea", {
      autoDeleteObjects: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const bucketB = new Bucket(this, "bucket-pageb", {
      autoDeleteObjects: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const cloudfrontfn = new Function(this, "cloudfront-fn", {
      code: FunctionCode.fromFile({ filePath: "./cloudfrontfn/index.js" }),
      runtime: FunctionRuntime.JS_2_0,
    });

    const distribution = new Distribution(this, "distribution-multi-spa", {
      enableLogging: true,
      defaultRootObject: "index.html",
      defaultBehavior: {
        origin: S3BucketOrigin.withOriginAccessControl(bucketA),
        cachePolicy: CachePolicy.CACHING_DISABLED, // turn off cache for verification
        functionAssociations: [
          {
            eventType: FunctionEventType.VIEWER_REQUEST,
            function: cloudfrontfn,
          },
        ],
      },
      additionalBehaviors: {
        "/pageb*": {
          origin: S3BucketOrigin.withOriginAccessControl(bucketB),
          cachePolicy: CachePolicy.CACHING_DISABLED, // turn off cache for verification
        },
      },
    });

    new BucketDeployment(this, "deploy-pagea", {
      sources: [Source.asset("./pageA/dist")],
      destinationBucket: bucketA,
      distribution: distribution,
      distributionPaths: ["/*"],
    });

    new BucketDeployment(this, "deploy-pageb", {
      sources: [Source.asset("./pageB/dist")],
      destinationKeyPrefix: "pageb/",
      destinationBucket: bucketB,
      distribution: distribution,
      distributionPaths: ["/*"],
    });
  }
}
