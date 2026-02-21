import boto3
from config import settings

dynamodb = boto3.resource(
    'dynamodb',
    aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
    aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
    region_name=settings.AWS_REGION
)

# Create Books table
try:
    books_table = dynamodb.create_table(
        TableName=settings.DYNAMODB_TABLE_BOOKS,
        KeySchema=[
            {'AttributeName': 'id', 'KeyType': 'HASH'}
        ],
        AttributeDefinitions=[
            {'AttributeName': 'id', 'AttributeType': 'S'}
        ],
        BillingMode='PAY_PER_REQUEST'
    )
    print(f"Creating {settings.DYNAMODB_TABLE_BOOKS} table...")
    books_table.wait_until_exists()
    print("Books table created!")
except Exception as e:
    print(f"Books table error: {e}")

# Create Reading Logs table
try:
    logs_table = dynamodb.create_table(
        TableName=settings.DYNAMODB_TABLE_READING_LOGS,
        KeySchema=[
            {'AttributeName': 'id', 'KeyType': 'HASH'}
        ],
        AttributeDefinitions=[
            {'AttributeName': 'id', 'AttributeType': 'S'}
        ],
        BillingMode='PAY_PER_REQUEST'
    )
    print(f"Creating {settings.DYNAMODB_TABLE_READING_LOGS} table...")
    logs_table.wait_until_exists()
    print("Reading logs table created!")
except Exception as e:
    print(f"Reading logs table error: {e}")

# Create Goals table
try:
    goals_table = dynamodb.create_table(
        TableName=settings.DYNAMODB_TABLE_GOALS,
        KeySchema=[
            {'AttributeName': 'id', 'KeyType': 'HASH'}
        ],
        AttributeDefinitions=[
            {'AttributeName': 'id', 'AttributeType': 'S'}
        ],
        BillingMode='PAY_PER_REQUEST'
    )
    print(f"Creating {settings.DYNAMODB_TABLE_GOALS} table...")
    goals_table.wait_until_exists()
    print("Goals table created!")
except Exception as e:
    print(f"Goals table error: {e}")

print("\nAll tables created successfully!")
