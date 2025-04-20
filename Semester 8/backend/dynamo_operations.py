import boto3
from dotenv import load_dotenv
import os
import uuid
from datetime import datetime

load_dotenv()

AWS_REGION = os.getenv('AWS_REGION')
AWS_ACCESS_KEY_ID = os.getenv('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = os.getenv('AWS_SECRET_ACCESS_KEY')

dynamodb = boto3.resource('dynamodb',
                          region_name=AWS_REGION,
                          aws_access_key_id=AWS_ACCESS_KEY_ID,
                          aws_secret_access_key=AWS_SECRET_ACCESS_KEY)

users_table = dynamodb.Table('users_careerlens')
meetings_table = dynamodb.Table('meetings_careerlens')
bots_table = dynamodb.Table('bots_careerlens')

def store_meeting(user_id, meeting_url, bot_id):
    """
    Store meeting details in the DynamoDB `meetings_careerlens` table.
    
    :param user_id (str): ID of the user who initiated the meeting.
    :param meeting_url (str): URL of the meeting.
    :param bot_id (str): ID of the bot that joined the meeting.
    
    Returns:
    - dict: Response from DynamoDB.
    """
    meeting_id = str(uuid.uuid4())
    start_time = datetime.utcnow().isoformat()
    
    item = {
        'meeting_id': meeting_id,
        'user_id': user_id,
        'meeting_url': meeting_url,
        'bot_id': bot_id,
        'start_time': start_time,
        'end_time': None,
        'status': 'active',
        'transcript': None
    }
    
    response = meetings_table.put_item(Item=item)
    return response, meeting_id

def store_bot(bot_id, bot_name, meeting_id):
    """
    Store bot details in the DynamoDB `bots_careerlens` table.
    
    :param bot_id (str): ID of the bot.
    :param bot_name (str): Name of the bot.
    :param meeting_id (str): ID of the meeting the bot is associated with.
    
    Returns:
    - dict: Response from DynamoDB.
    """
    created_at = datetime.utcnow().isoformat()
    
    item = {
        'bot_id': bot_id,
        'bot_name': bot_name,
        'meeting_id': meeting_id,
        'created_at': created_at,
        'status': 'active'
    }
    
    response = bots_table.put_item(Item=item)
    return response

def update_bot_status(bot_id, status):
    """
    Updates the bot's status in DynamoDB.
    """
    bots_table.update_item(
        Key={'bot_id': bot_id},
        UpdateExpression="SET #st = :s",
        ExpressionAttributeNames={'#st': 'status'}, 
        ExpressionAttributeValues={':s': status}
    )

def update_meeting_status(meeting_id, status):
    """
    Updates the meeting's status in DynamoDB.
    """
    meetings_table.update_item(
        Key={'meeting_id': meeting_id},
        UpdateExpression="SET #st = :s",
        ExpressionAttributeNames={'#st': 'status'}, 
        ExpressionAttributeValues={':s': status}
    )

def update_meeting_end_time(meeting_id, end_time):
    """
    Updates the meeting's end time in DynamoDB.
    """
    meetings_table.update_item(
        Key={'meeting_id': meeting_id},
        UpdateExpression="SET #et = :e",
        ExpressionAttributeNames={'#et': 'end_time'}, 
        ExpressionAttributeValues={':e': end_time}
    )

def store_transcript_in_meeting(meeting_id, transcript):
    """
    Stores the final transcript in DynamoDB under the meeting entry.
    """
    meetings_table.update_item(
        Key={'meeting_id': meeting_id},
        UpdateExpression="SET #t = :t",
        ExpressionAttributeNames={'#t': 'transcript'},
        ExpressionAttributeValues={':t': transcript}
    )
    
def get_all_meetings_from_db():
    """
    Retrieves all meetings from the `meetings_careerlens` table.
    """
    response = meetings_table.scan()
    if 'Items' in response:
        return response['Items']
    return None
    
def get_meetings_by_user(user_id):
    """
    Retrieves all meetings associated with a user.
    """
    response = meetings_table.scan(
        FilterExpression=boto3.dynamodb.conditions.Attr('user_id').eq(user_id)
    )
    if 'Items' in response:
        return response
    return None

def get_meeting_by_id(meeting_id):
    """
    Retrieves a meeting by its ID.
    """
    response = meetings_table.get_item(
        Key={'meeting_id': meeting_id}
    )
    if 'Item' in response:
        return response['Item']
    return None

def get_transcript_by_id(meeting_id):
    """
    Retrieves a meeting's transcript by its ID.
    """
    response = meetings_table.get_item(
        Key={'meeting_id': meeting_id}
    )
    if 'Item' in response:
        return response['Item']['transcript']
    return None

def get_bot_by_id(bot_id):
    """
    Retrieves a bot by its ID.
    """
    response = bots_table.get_item(
        Key={'bot_id': bot_id}
    )
    if 'Item' in response:
        return response['Item']
    return None

def get_active_bots_by_meeting(meeting_id):
    """
    Retrieves all active bots associated with a meeting.
    """
    response = bots_table.scan(
        FilterExpression=boto3.dynamodb.conditions.Attr('meeting_id').eq(meeting_id) & 
                         boto3.dynamodb.conditions.Attr('status').eq('active')
    )
    if 'Items' in response:
        return response['Items']
    return None