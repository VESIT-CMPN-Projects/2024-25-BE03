from unsloth import FastLanguageModel
from peft import PeftModel
import torch
from fastapi import FastAPI
from pydantic import BaseModel
import torch
import json
import re
import os
from dotenv import load_dotenv

load_dotenv()

hf_token = os.getenv("HF_TOKEN")

# Load base model
base_model, tokenizer = FastLanguageModel.from_pretrained(
    model_name="unsloth/Meta-Llama-3.1-8B-Instruct-unsloth-bnb-4bit",
    dtype=torch.float16,
    load_in_4bit=True,
    device_map="cuda:0",
    token=hf_token
)

# Load PEFT weights
base_model = PeftModel.from_pretrained(base_model, "llama-finetuned-weights")
base_model = base_model.merge_and_unload()

app = FastAPI()

class TranscriptRequest(BaseModel):
    transcript: str

def extract_json(text):
    """
    Extracts the last JSON structure from the given text.
    """
    json_pattern = r"\{[\s\S]*?\}"
    matches = re.findall(json_pattern, text)
    
    if matches:
        last_json_str = matches[-1] 
        try:
            return json.loads(last_json_str)
        except json.JSONDecodeError:
            return None
    return None

def get_prompt(transcript):
    return f"""You are CareerLens, a career counseling meet summarizer. You are an expert at analyzing career counseling session transcripts and assisting users with post-session insights.
                You will be given a meeting transcript to analyze and summarize.
                Provide a JSON response with:
                - A well-structured summary
                - At least three key action items
                - At least three insights
                - A list of speakers (only names or roles, with minimal dialogue details).
                Do not hallucinate or add extra information.
                
                ### Meeting transcript:
                {transcript}
                
                ### JSON Output Format:
                {{
                    "summary": "<summary>",
                    "action_items": ["<item1>", "<item2>", "<item3>", ...],
                    "insights": ["<insight1>", "<insight2>", "<insight3>", ...],
                    "speakers": ["<name or role 1>", "<name or role 2>", ...]
                }}"""


@app.post("/summarize/")
async def summarize(request: TranscriptRequest):
    input_text = get_prompt(request.transcript)
    
    inputs = tokenizer(input_text, return_tensors="pt").to("cuda")
    with torch.no_grad():
        output = base_model.generate(**inputs, max_length=1024)
    
    response_text = tokenizer.decode(output[0], skip_special_tokens=True)
    json_output = extract_json(response_text)

    return json_output