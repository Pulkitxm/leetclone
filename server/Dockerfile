FROM --platform=linux/amd64 python:3.10

ENV PATH=/virtualenvs/venv/bin:$PATH

RUN python3 -m venv /virtualenvs/venv/

COPY backend/requirements.txt /tmp/

RUN python3 -m pip install --no-cache-dir -r /tmp/requirements.txt

COPY . /app

WORKDIR /app