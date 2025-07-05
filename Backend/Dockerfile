# backend/Dockerfile
FROM python:3.11-slim

# Install OS-level dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    libmariadb-dev \
    pkg-config \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY ./ /app
COPY requirement.txt .

RUN pip install --no-cache-dir -r requirement.txt

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
