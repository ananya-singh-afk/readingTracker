import boto3
from boto3.dynamodb.conditions import Key, Attr
from datetime import datetime
import uuid
import sys
import os

# Add parent directory to path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

from config import settings

class DynamoDBService:
    def __init__(self):
        self.dynamodb = boto3.resource(
            'dynamodb',
            aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
            region_name=settings.AWS_REGION
        )
        self.books_table = self.dynamodb.Table(settings.DYNAMODB_TABLE_BOOKS)
        self.logs_table = self.dynamodb.Table(settings.DYNAMODB_TABLE_READING_LOGS)
        self.goals_table = self.dynamodb.Table(settings.DYNAMODB_TABLE_GOALS)

    # Book operations
    def create_book(self, book_data):
        book_data['id'] = str(uuid.uuid4())
        book_data['created_at'] = datetime.now().isoformat()
        self.books_table.put_item(Item=book_data)
        return book_data

    def get_all_books(self):
        response = self.books_table.scan()
        return response.get('Items', [])

    def get_books_by_status(self, status):
        response = self.books_table.scan(
            FilterExpression=Attr('status').eq(status)
        )
        return response.get('Items', [])

    def update_book(self, book_id, updates):
        update_expression = "SET "
        expression_values = {}
        
        for key, value in updates.items():
            update_expression += f"{key} = :{key}, "
            expression_values[f":{key}"] = value
        
        update_expression = update_expression.rstrip(", ")
        
        self.books_table.update_item(
            Key={'id': book_id},
            UpdateExpression=update_expression,
            ExpressionAttributeValues=expression_values
        )

    def delete_book(self, book_id):
        self.books_table.delete_item(Key={'id': book_id})

    # Reading log operations
    def create_reading_log(self, log_data):
        log_data['id'] = str(uuid.uuid4())
        self.logs_table.put_item(Item=log_data)
        return log_data

    def get_logs_by_book(self, book_id):
        response = self.logs_table.scan(
            FilterExpression=Attr('book_id').eq(book_id)
        )
        return response.get('Items', [])

    def get_logs_by_date_range(self, start_date, end_date):
        response = self.logs_table.scan(
            FilterExpression=Attr('date').between(start_date, end_date)
        )
        return response.get('Items', [])

    # Goal operations
    def create_goal(self, goal_data):
        goal_data['id'] = str(uuid.uuid4())
        goal_data['created_at'] = datetime.now().isoformat()
        self.goals_table.put_item(Item=goal_data)
        return goal_data

    def get_goals_by_type(self, goal_type):
        response = self.goals_table.scan(
            FilterExpression=Attr('goal_type').eq(goal_type)
        )
        return response.get('Items', [])

    def get_all_goals(self):
        response = self.goals_table.scan()
        return response.get('Items', [])

db_service = DynamoDBService()
