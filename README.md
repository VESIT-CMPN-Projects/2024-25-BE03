# 🧠 CareerLens: Unsloth-PEFT-Based Multilingual Summarization and Dashboard Integration for Career Counseling Meets

CareerLens is an AI-powered platform designed to simplify and enhance the process of career counseling. By analyzing meeting transcripts (live or uploaded), CareerLens provides:

- ✅ Well-structured summaries
- 📌 Action items
- 💡 Insights
- 👥 Speaker recognition

It includes a powerful Attendee Bot that can automatically join meetings and a sleek frontend to manage, view, and interact with meeting summaries.

---

## 👥 Team
| Name                   | LinkedIn / GitHub Profile                     |
|------------------------|-----------------------------------------------|
| Dr. (Mrs.) Nupur Giri  | [LinkedIn](https://www.linkedin.com/in/dr-nupur-giri-6635a542/) |
| Piyush K. Chugeja      | [LinkedIn](https://linkedin.com/in/piyushchugeja) / [GitHub](https://github.com/piyushchugeja) |
| Manraj Singh Virdi     | [LinkedIn](https://www.linkedin.com/in/manrajsinghvirdi/) / [GitHub](https://github.com/Manraj29) |
| Sakshi Kirmathe        | [LinkedIn](https://www.linkedin.com/in/sakshikirmathe/) / [GitHub](https://github.com/sakshikirmathe) |
| Deven Bhagtani         | [LinkedIn](https://www.linkedin.com/in/deven-bhagtani/) / [GitHub](https://github.com/devensinghbhagtani) |

---

## Project Video 
<div align="center">
  <a href="https://www.youtube.com/watch?v=FS94BzPyTb0">
    <img src="https://img.youtube.com/vi/FS94BzPyTb0/0.jpg" alt="Watch the video" />
  </a>
</div>

## 🗂️ Project Structure

| Module         | Description                                                                 |
|----------------|-----------------------------------------------------------------------------|
| `frontend`     | React-based interface built using Vite for user interaction                 |
| `backend`      | FastAPI server to handle API requests and model inference                   |
| `attendee-bot` | Dockerized bot that joins meetings, records audio, and sends for processing |

---

## 🔧 Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or later)
- [Python](https://www.python.org/) (v3.9 or later)
- pip (Python package manager)
- Virtualenv (recommended)
- Docker (required for Attendee Bot)
- HuggingFace account (for HF token)

---

## 🚀 Getting Started

### 📥 Clone the Repository

```bash
git clone https://github.com/VESIT-CMPN-Projects/2024-25-BE03.git
cd 2024-25-BE03
```

---

### 🔌 Backend Setup (FastAPI)

```bash
cd Semester\ 8/backend
python -m venv venv
source venv/bin/activate  # For Windows: venv\Scripts\activate
```
Install all requirements.

Create a `.env` file and add:

```env
ATTENDEE_API_URL=http://localhost:8000/api/v1/bots
ATTENDEE_API_TOKEN=<Your attendee API token>
AWS_REGION=<Your S3 bucket region>
AWS_ACCESS_KEY_ID=<Your AWS Access Key ID>
AWS_SECRET_ACCESS_KEY=<Your AWS Secret Access key>
HF_TOKEN=<Your HuggingFace token>
```

Start the server:

```bash
python main.py
```

> The backend is live at `http://localhost:5000`

---

### 🤖 Attendee Bot Setup (Docker)

Clone the Attendee Bot from [Attendee](https://github.com/noah-duncan/attendee)

> Attendee bot runs at `http://localhost:8000`

---

### 💻 Frontend Setup (React + Vite)

```bash
cd Semester\ 8/frontend
npm install
```

Create a `.env` file:

```env
VITE_TOGETHER_AI_API_KEY=<Your Together API Key>
VITE_API_URL=http://127.0.0.1:5000/api
```

Run the frontend:

```bash
npm run dev
```

> Frontend is live at `http://localhost:5173`

---

## ✅ How to Run

Ensure all 3 modules are running:

| Component     | URL                       |
|---------------|---------------------------|
| Backend       | `http://localhost:5000`   |
| Attendee Bot  | `http://localhost:8000`   |
| Frontend      | `http://localhost:5173`   |

Then open your browser at `http://localhost:5173`.

---

## ✨ Key Features

- 🧑‍💼 **Meeting Management**: Schedule, join, and manage meetings.
- 📄 **Transcript Analysis**: Upload meeting transcripts or audio for automatic summarization.
- 📊 **Insights Dashboard**: Get summaries, action items, and key takeaways with speaker roles.
- 🌐 **Multilingual Support**: Works with English, Hindi, and Marathi (with potential for more).
- 📁 **Downloadable Reports** (coming soon): PDF summaries and insights.

---

## 🛠️ Troubleshooting

- Check `.env` files for missing tokens or API URLs.
- Docker must be running for the Attendee Bot.
- If a port is already in use, update the port number in `.env` or in the terminal command.
- Use `venv` to isolate Python packages.

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

Pull requests are welcome. For major changes, open an issue first to discuss your proposal.

---

## 📣 Acknowledgments

- 🤖 [Unsloth](https://github.com/unslothai/unsloth) for efficient model training
- 🤝 [Hugging Face](https://huggingface.co/) for models
- 🚀 Kaggle & Google Colab for compute support

---

Made with ❤️ for smarter, accessible, and inclusive career counseling.
