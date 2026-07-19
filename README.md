# AI Image Enhancer

An AI-powered image enhancement web application built with **React**, **Django REST Framework**, and **Real-ESRGAN**. The application restores blurry and low-resolution images into high-quality versions using deep learning.

---

# Live Demo

**Frontend (Vercel)**

https://ai-image-enhancer-flame.vercel.app/

> **Note**
>
> The frontend is deployed on Vercel.
> The AI enhancement pipeline is fully functional in the local development environment.
> Cloud deployment for AI inference is currently under optimization due to resource limitations on free hosting platforms.

---

# Preview

## Home Page

![Home](docs/home.png)

## Upload Image

![Upload](docs/upload.png)

## Enhancement Result

![Result](docs/result.png)

---

# Features

- AI-powered image enhancement using Real-ESRGAN
- Drag & Drop image upload
- Image preview before enhancement
- Image metadata (name, size, resolution)
- Side-by-side image comparison
- Download enhanced image
- Responsive modern UI
- RESTful API built with Django REST Framework
- Dockerized backend for reproducible deployment

---

# Tech Stack

## Frontend

- React
- Vite
- Axios
- CSS3
- React Icons

## Backend

- Django
- Django REST Framework
- Gunicorn

## AI / Computer Vision

- Real-ESRGAN
- PyTorch
- OpenCV
- BasicSR

## DevOps

- Docker
- Vercel (Frontend)
- Render (Backend Testing)

---

# Project Structure

```
AI-Image-Enhancer
│
├── backend/
│   ├── ai/
│   ├── ai_models/
│   ├── config/
│   ├── enhancer/
│   ├── media/
│   ├── Dockerfile
│   ├── manage.py
│   ├── requirements.txt
│   └── runtime.txt
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── ...
│
├── docs/
│   ├── home.png
│   ├── upload.png
│   └── result.png
│
├── .gitignore
├── LICENSE
└── README.md
```

---

# Architecture

```
                 User
                   │
                   ▼
          React + Vite Frontend
                   │
             HTTP REST API
                   │
                   ▼
      Django REST Framework Backend
                   │
                   ▼
        Real-ESRGAN Deep Learning Model
                   │
                   ▼
          Enhanced High-Resolution Image
                   │
                   ▼
              Returned to Frontend
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/AbinSanilkumar/AI-Image-Enhancer.git

cd AI-Image-Enhancer
```

---

## Backend Setup

```bash
cd backend

python -m venv venv
```

### Windows

```bash
venv\Scripts\activate
```

### Linux / macOS

```bash
source venv/bin/activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Run migrations

```bash
python manage.py migrate
```

Start the backend

```bash
python manage.py runserver
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

# API Endpoint

## Test API

```
GET /api/test/
```

Response

```json
{
  "message": "Backend working"
}
```

---

## Upload Image

```
POST /api/upload/
```

Form Data

```
image : File
```

Sample Response

```json
{
  "message": "Image enhanced successfully",
  "data": {
    "original_image": "...",
    "enhanced_image": "..."
  }
}
```

---

# Docker

Build the Docker image

```bash
docker build -t ai-image-enhancer .
```

Run the container

```bash
docker run -p 8000:8000 ai-image-enhancer
```

---

# Known Limitations

- AI enhancement requires significant CPU/GPU resources.
- The application is fully functional in the local environment.
- Free cloud platforms may not provide sufficient resources for deep learning inference.
- GPU deployment is recommended for production workloads.

---

# Future Improvements

- GPU-accelerated deployment
- User authentication
- Enhancement history
- Batch image enhancement
- Multiple enhancement models
- Interactive image comparison slider
- Cloud storage integration
- Async task queue using Celery and Redis

---

# License

This project is licensed under the MIT License.

---

# Author

**Abin Sanil Kumar**

GitHub

https://github.com/AbinSanilkumar

LinkedIn

*(Add your LinkedIn profile here)*

---

# Acknowledgements

- Real-ESRGAN
- PyTorch
- BasicSR
- Django
- Django REST Framework
- React
- Vite
- OpenCV

---

## ⭐ If you found this project interesting, consider giving it a star on GitHub!
