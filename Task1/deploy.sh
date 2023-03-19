# Set AWS region
export AWS_DEFAULT_REGION=us-east-1

# Set application name and environment
APP_NAME="discord-plugin"
ENVIRONMENT="production"

# Set AWS Elastic Beanstalk environment name
EB_ENV_NAME="${APP_NAME}-${ENVIRONMENT}"

# Create Elastic Beanstalk environment
aws elasticbeanstalk create-environment \
  --application-name "${APP_NAME}" \
  --environment-name "${EB_ENV_NAME}" \
  --solution-stack-name "64bit Amazon Linux 2018.03 v2.9.7 running Python 3.6" \
  --option-settings Namespace="aws:elasticbeanstalk:environment:process:default",OptionName="DjStaticFiles",Value="false" \
  --option-settings Namespace="aws:autoscaling:launchconfiguration",OptionName="EC2KeyName",Value="my-keypair" \
  --option-settings Namespace="aws:autoscaling:launchconfiguration",OptionName="InstanceType",Value="t2.micro"

# Upload application code to S3
aws s3 cp my-app.zip s3://my-bucket/my-app.zip

# Deploy application to Elastic Beanstalk environment
aws elasticbeanstalk update-environment \
  --environment-name "${EB_ENV_NAME}" \
  --version-label "v1" \
  --option-settings Namespace="aws:elasticbeanstalk:application:environment",OptionName="APP_ENVIRONMENT",Value="${ENVIRONMENT}" \
  --option-settings Namespace="aws:elasticbeanstalk:container:python",OptionName="WSGIPath",Value="myapp.wsgi:application" \
  --option-settings Namespace="aws:elasticbeanstalk:application:environment",OptionName="DJANGO_SETTINGS_MODULE",Value="myapp.settings" \
  --option-settings Namespace="aws:elasticbeanstalk:application:environment",OptionName="SECRET_KEY",Value="my-secret-key" \
  --option-settings Namespace="aws:elasticbeanstalk:application:environment",OptionName="DATABASE_URL",Value="postgres://user:password@my-db-host:5432/my-db-name" \
  --option-settings Namespace="aws:elasticbeanstalk:application:environment",OptionName="AWS_ACCESS_KEY_ID",Value="my-access-key" \
  --option-settings Namespace="aws:elasticbeanstalk:application:environment",OptionName="AWS_SECRET_ACCESS_KEY",Value="my-secret-key" \
  --option-settings Namespace="aws:elasticbeanstalk:application:environment",OptionName="S3_BUCKET_NAME",Value="my-bucket" \
  --option-settings Namespace="aws:elasticbeanstalk:application:environment",OptionName="S3_OBJECT_KEY",Value="my-app.zip"
