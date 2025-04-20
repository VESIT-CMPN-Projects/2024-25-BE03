from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
import requests
from datetime import datetime
from dynamo_operations import *
from utils import *

load_dotenv()

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

ATTENDEE_API_URL = os.getenv('ATTENDEE_API_URL')

@app.route('/api/create_bot', methods=['POST'])
def create_bot():
    """
    Creates a meeting via Attendee API and stores details in DynamoDB.
    """
    try:
        data = request.json
        bot_name = data['bot_name']
        meeting_url = data['meeting_url']
        user_id = data['user_id']
        
        headers = {'Content-Type': 'application/json', 'Authorization': 'TOKEN ' + os.getenv('ATTENDEE_API_TOKEN')}
        response = requests.post(ATTENDEE_API_URL, json={'bot_name': bot_name, 'meeting_url': meeting_url}, headers=headers)
        
        if response.status_code == 201:
            bot_data = response.json()
            bot_id = bot_data['id']
            
            meeting_response, meeting_id = store_meeting(user_id, meeting_url, bot_id)
            
            if meeting_response['ResponseMetadata']['HTTPStatusCode'] != 200:
                return jsonify({'error': 'Failed to store meeting details.'}), 400
            
            store_bot(bot_id, bot_name, meeting_id)
            
            return jsonify({'bot_id': bot_id, 'meeting_id': meeting_id, 'message': 'Bot created successfully.'}), 201
        
        return jsonify({'error': 'Failed to create bot.'}), 400
            
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/leave_meeting', methods=['POST'])
def leave_meeting():
    """
    Makes the bot leave the meeting, updates its status, fetches the final transcript, formats it, and stores it in DynamoDB.
    """
    try:
        bot_id = request.json.get('bot_id')
        meeting_id = request.json.get('meeting_id')

        if not bot_id or not meeting_id:
            return jsonify({'error': 'bot_id and meeting_id are required'}), 400

        headers = {'Authorization': 'TOKEN ' + os.getenv('ATTENDEE_API_TOKEN')}
        attendee_leave_url = f"{ATTENDEE_API_URL}/{bot_id}/leave"

        leave_response = requests.post(attendee_leave_url, headers=headers)
        if leave_response.status_code != 200:
            return jsonify({'error': 'Failed to make bot leave'}), leave_response.status_code

        update_bot_status(bot_id, "left")

        transcript = fetch_and_format_transcript(bot_id)
        if transcript is None:
            return jsonify({'error': 'Failed to fetch transcript'}), 500

        end_time = datetime.utcnow().isoformat()
        store_transcript_in_meeting(meeting_id, transcript)
        update_meeting_end_time(meeting_id, end_time)
        update_meeting_status(meeting_id, "ended")

        return jsonify({'message': 'Bot has left the meeting, transcript and end time saved successfully'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/get_all_meetings', methods=['GET'])
def get_all_meetings():
    """
    Fetches all the meetings from DynamoDB.
    """
    try:
        meetings = get_all_meetings_from_db()
        return jsonify({'meetings': meetings}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/api/get_meeting', methods=['GET'])
def get_meeting():
    """
    Fetches the meeting details from DynamoDB.
    """
    try:
        meeting_id = request.args.get('meeting_id')
        if not meeting_id:
            return jsonify({'error': 'meeting_id is required'}), 400

        meeting = get_meeting_by_id(meeting_id)
        return jsonify({'meeting': meeting}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/get_formatted_transcript', methods=['GET'])
def get_formatted_transcript():
    try:
        meeting_id = request.args.get('meeting_id')
        if not meeting_id:
            return jsonify({'error': 'meeting_id is required'}), 400
        transcript = get_transcript_by_id(meeting_id)
    
        formatted_transcript = []
        for dialogue in transcript:
            formatted = f"{dialogue['speaker_name']}: {dialogue['text']}"
            formatted_transcript.append(formatted)
        
        return jsonify({'transcript': "\n".join(formatted_transcript)}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/api/get_transcript', methods=['GET'])
def get_transcript():
    """
    Fetches the transcript from Attendee API, formats it, and returns the structured response.
    """
    try:
        bot_id = request.args.get('bot_id')
        if not bot_id:
            return jsonify({'error': 'bot_id is required'}), 400

        headers = {'Authorization': 'TOKEN ' + os.getenv('ATTENDEE_API_TOKEN')}
        attendee_transcript_url = f"{ATTENDEE_API_URL}/{bot_id}/transcript"

        transcript = fetch_and_format_transcript(bot_id)
        if transcript is None:
            return jsonify({'error': 'Failed to fetch transcript'}), 500

        return jsonify({'transcript': transcript}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)