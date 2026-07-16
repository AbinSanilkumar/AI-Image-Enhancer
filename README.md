# AI Image Enhancer

An AI-powered image enhancement platform built using **React**, **Django**, and **Real-ESRGAN**. The application restores blurry and low-resolution images into high-quality versions using deep learning.

---

## Features

- AI-powered image upscaling using Real-ESRGAN
- Drag & Drop image upload
- Instant image enhancement
- Side-by-side image comparison
- Download enhanced HD image
- Responsive modern UI
- Django REST API backend
- React frontend

---

## Tech Stack

### Frontend
- React.js
- Axios
- CSS3
- React Icons

### Backend
- Django
- Django REST Framework
- Python

### AI Model
- Real-ESRGAN
- PyTorch
- OpenCV

---

## Project Structure

```
AI-Image-Enhancer/
│
├── backend/
│   ├── ai/
│   ├── enhancer/
│   ├── config/
│   ├── media/
│   └── manage.py
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── ai_models/
│   └── Real-ESRGAN/
│
├── docs/
│
├── sample_images/
│
└── README.md
```

---

## Screenshots

### Home Page

> Add screenshot here

```
docs/home.png
```

---

### Upload & Enhancement

> Add screenshot here

```
docs/result.png
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/AbinSanilkumar/AI-Image-Enhancer.git

cd AI-Image-Enhancer
```

---

### Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt
```

Run migrations

```bash
python manage.py migrate
```

Start Django

```bash
python manage.py runserver
```

---

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

## API Endpoint

### Upload Image

```
POST /api/upload/
```

Form Data

```
image : File
```

Example Response

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

## Workflow

```
User Uploads Image
          │
          ▼
React Frontend
          │
          ▼
Django REST API
          │
          ▼
Real-ESRGAN Model
          │
          ▼
Enhanced Image Generated
          │
          ▼
Returned to Frontend
```

---

## Future Improvements

- User Authentication
- Enhancement History
- Image Gallery
- Batch Image Processing
- Multiple AI Models
- Before/After Slider
- GPU Acceleration
- Docker Deployment

---

## License

This project is licensed under the MIT License.

---

## Author

**Abin Sanil Kumar**

GitHub

https://github.com/AbinSanilkumar

LinkedIn

(Add your LinkedIn URL)

---

## Acknowledgements

- Real-ESRGAN
- Django
- React
- PyTorch
- OpenCV
