# Training Evaluation App

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Python](https://img.shields.io/badge/Python-3.x-green.svg)](https://www.python.org/)

## Description

The Training Evaluation App is a simple app designed to showcase the use of digital signatures in the document flow, specifically in the context of employee training evaluations.

## Features

- Staff can log in and view a list of training sessions conducted by the company.
- Staff can select a training session, fill out the evaluation form, and submit it to the system with a digital signature.
- Evaluations are sent to the respective HR for approval.
- HR can log in to view a list of evaluations submitted by staff and approve them with digital signature.
- Both staff and HR can view and download the evaluation document.

## Installation

### Prerequisites

- React 18.2.0 for front-end
- Material UI 5.14.20 for React UI library
- Python 3.x for back-end
- Docker for running MySQL server
- DataGrip or any preferred DBMS for MySQL

### Steps

1. Clone the repository: `git clone ihtifazhuddin/training-evaluation-app`
2. Set up the MySQL server using Docker: `docker-compose up`
3. Connect to the MySQL database using DataGrip or your preferred DBMS.
4. Open the backend code in your IDE (e.g., PyCharm) and run `server.py`.
5. Open the frontend code in your IDE, open the terminal, and run `npm install` followed by `npm start`.

## Usage

1. Log in as a staff member to view and evaluate training sessions.
2. Submit the evaluation with a digital signature.
3. Log in as an HR member to view and approve evaluations with a digital signature.

## Use Case

SigningCloud Sdn. Bhd. organizes several internal training sessions. After each training, employees are required to fill in evaluation forms to provide feedback to the organizer and trainer. To streamline the evaluation process and avoid burdensome email communications, the Training Evaluation App allows for effective process of the evaluation flow. The use of digital signatures ensures that documents are legally signed by both staff and HR which also demonstrate the versatility of digital signatures in various scenarios.

## Contributing

This app is maintained and developed by the creator and is not open for external contributions.
