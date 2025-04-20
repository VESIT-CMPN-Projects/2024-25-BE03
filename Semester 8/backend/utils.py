import requests
import os

def fetch_and_format_transcript(bot_id):
    """
    Fetches the transcript from Attendee API and formats it.
    """
    try:
        headers = {'Authorization': 'TOKEN ' + os.getenv('ATTENDEE_API_TOKEN')}
        attendee_transcript_url = f"{os.getenv('ATTENDEE_API_URL')}/{bot_id}/transcript"

        response = requests.get(attendee_transcript_url, headers=headers)
        if response.status_code != 200:
            return None

        unformatted = response.json()

        formatted = []
        previous_speaker = None
        current_entry = None

        for entry in unformatted:
            speaker_name = entry['speaker_name']
            text = entry['transcription']['transcript']
            duration = entry['duration_ms']

            if speaker_name == previous_speaker:
                current_entry['text'] += ' ' + text
                current_entry['duration'] += duration
            else:
                if current_entry:
                    formatted.append(current_entry)
                current_entry = {
                    'speaker_name': speaker_name,
                    'text': text,
                    'duration': duration
                }
                previous_speaker = speaker_name

        if current_entry:
            formatted.append(current_entry)

        return formatted

    except Exception:
        return None