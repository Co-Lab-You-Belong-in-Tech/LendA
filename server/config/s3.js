import S3 from 'aws-sdk/clients/s3';
import {
  AWS_BUCKET_REGION,
  AWS_BUCKET_NAME,
  AWS_ACCESS_KEY,
  AWS_SECRET_KEY,
} from './config';

const s3 = new S3({
  AWS_BUCKET_REGION,
  AWS_ACCESS_KEY,
  AWS_SECRET_KEY,
});
